// stores/productDetail.ts
// [FLUTTER CONCEPT]: Equivalent to ProductDetailCubit + ProductDetailState in Flutter

import { defineStore } from 'pinia';
import type { ProductDto } from '~/types/product';

export const useProductDetailStore = defineStore('productDetail', () => {
  // --- STATE ---
  const product = ref<ProductDto | null>(null);
  const relatedProducts = ref<ProductDto[]>([]);
  const activeImageIndex = ref<number>(0);
  const selectedAddonIds = ref<number[]>([]);
  const quantity = ref<number>(1);
  const remainingSeconds = ref<number | null>(null);
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const errorMessage = ref<string | null>(null);
  let timerId: ReturnType<typeof setInterval> | null = null;

  // --- COMPUTED PROPERTIES ---
  const isLoading = computed(() => status.value === 'loading');
  const isSuccess = computed(() => status.value === 'success');
  const isError = computed(() => status.value === 'error');

  const isInStock = computed(() => {
    if (!product.value) return false;
    return Boolean(product.value.in_stock === 1 || product.value.in_stock === true || String(product.value.in_stock) === '1');
  });

  const priceNumeric = computed(() => {
    return parseFloat(product.value?.price || '0') || 0;
  });

  const discountAmountNumeric = computed(() => {
    return parseFloat(product.value?.discount_amount || '0') || 0;
  });

  const hasActiveDiscount = computed(() => {
    if (!product.value) return false;
    const isAct = Boolean(
      product.value.is_discount_active === true ||
      product.value.is_discount_active === 1 ||
      String(product.value.is_discount_active) === '1'
    );
    return isAct && (discountAmountNumeric.value > 0 || (finalPriceNumeric.value > 0 && finalPriceNumeric.value < priceNumeric.value));
  });

  const finalPriceNumeric = computed(() => {
    if (!product.value) return 0;
    const parsed = parseFloat(product.value.final_price || '');
    if (!isNaN(parsed) && parsed > 0) return parsed;
    if (hasActiveDiscount.value && discountAmountNumeric.value > 0) {
      return Math.max(0, priceNumeric.value - discountAmountNumeric.value);
    }
    return priceNumeric.value;
  });

  const effectivePriceNumeric = computed(() => {
    return hasActiveDiscount.value ? finalPriceNumeric.value : priceNumeric.value;
  });

  const discountPercentage = computed(() => {
    if (priceNumeric.value <= 0 || !hasActiveDiscount.value) return 0;
    const diff = priceNumeric.value - finalPriceNumeric.value;
    if (diff <= 0) return 0;
    return Math.round((diff / priceNumeric.value) * 100);
  });

  const allImages = computed<string[]>(() => {
    const list: string[] = [];
    if (product.value?.image) list.push(product.value.image);
    if (product.value?.gallery && Array.isArray(product.value.gallery)) {
      for (const img of product.value.gallery) {
        if (img && !list.includes(img)) list.push(img);
      }
    }
    return list;
  });

  const currentImage = computed<string>(() => {
    if (!allImages.value.length) return '';
    return allImages.value[activeImageIndex.value] ?? allImages.value[0] ?? '';
  });

  const addonsTotal = computed(() => {
    if (!product.value?.addons) return 0;
    let sum = 0;
    for (const addon of product.value.addons) {
      if (selectedAddonIds.value.includes(addon.id) && !addon.is_free) {
        sum += parseFloat(addon.price || '0') || 0;
      }
    }
    return sum;
  });

  const grandTotal = computed(() => {
    return (effectivePriceNumeric.value + addonsTotal.value) * quantity.value;
  });

  // --- ACTIONS ---
  const clearCache = () => {
    product.value = null;
    relatedProducts.value = [];
    stopDealCountdown();
    status.value = 'idle';
  };

  const startDealCountdown = (endAt?: string | null) => {
    stopDealCountdown();
    if (!endAt) {
      remainingSeconds.value = null;
      return;
    }
    try {
      const end = new Date(endAt).getTime();
      const calculate = () => {
        const diff = Math.floor((end - Date.now()) / 1000);
        if (diff <= 0) {
          remainingSeconds.value = 0;
          stopDealCountdown();
        } else {
          remainingSeconds.value = diff;
        }
      };
      calculate();
      if (import.meta.client && remainingSeconds.value && remainingSeconds.value > 0) {
        timerId = setInterval(calculate, 1000);
      }
    } catch {
      remainingSeconds.value = null;
    }
  };

  const stopDealCountdown = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  const toggleAddon = (addonId: number) => {
    if (selectedAddonIds.value.includes(addonId)) {
      selectedAddonIds.value = selectedAddonIds.value.filter((id) => id !== addonId);
    } else {
      selectedAddonIds.value = [...selectedAddonIds.value, addonId];
    }
  };

  const setQuantity = (val: number) => {
    quantity.value = Math.max(1, val);
  };

  const fetchProductDetail = async (identifier: string | number) => {
    product.value = null;
    status.value = 'loading';
    errorMessage.value = null;
    activeImageIndex.value = 0;
    selectedAddonIds.value = [];
    quantity.value = 1;

    try {
      const api = useApi();
      const response = await api.get<any>(`/api/v1/products/${identifier}`);
      const raw = response as any;
      const data = raw?.data?.data || raw?.data || raw;
      product.value = data as ProductDto;

      if (product.value?.discount_end_at && hasActiveDiscount.value) {
        startDealCountdown(product.value.discount_end_at);
      } else {
        stopDealCountdown();
      }

      status.value = 'success';

      if (import.meta.client && product.value?.category?.id) {
        fetchRelatedProducts(product.value.category.id);
      }

      return product.value;
    } catch (err: unknown) {
      status.value = 'error';
      const normalized = err as { message?: string; statusCode?: number };
      errorMessage.value = normalized.message || 'Failed to fetch product details';
      if (normalized.statusCode === 404) return null;
      throw err;
    }
  };

  const fetchRelatedProducts = async (categoryId?: number) => {
    try {
      const api = useApi();
      const response = await api.get<any>('/api/v1/products', {
        params: {
          category_id: categoryId,
          limit: 8,
          embed: 'brand,category',
        },
      });
      const raw = response as any;
      const list: ProductDto[] = Array.isArray(raw?.data?.data)
        ? raw.data.data
        : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw)
            ? raw
            : [];
      relatedProducts.value = list.filter(
        (p) => p.id !== product.value?.id && p.is_active !== false && p.is_active !== 0 && String(p.is_active) !== '0'
      );
    } catch {
      relatedProducts.value = [];
    }
  };

  return {
    product,
    relatedProducts,
    activeImageIndex,
    selectedAddonIds,
    quantity,
    remainingSeconds,
    status,
    errorMessage,
    isLoading,
    isSuccess,
    isError,
    isInStock,
    priceNumeric,
    discountAmountNumeric,
    finalPriceNumeric,
    effectivePriceNumeric,
    hasActiveDiscount,
    discountPercentage,
    allImages,
    currentImage,
    addonsTotal,
    grandTotal,
    toggleAddon,
    setQuantity,
    fetchProductDetail,
    fetchRelatedProducts,
    startDealCountdown,
    stopDealCountdown,
    clearCache,
  };
});
