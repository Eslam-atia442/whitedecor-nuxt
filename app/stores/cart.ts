// stores/cart.ts
import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import type { CartDto, CartItemDto, CartApiResponse } from '~/types/cart';
import type { CouponDto } from '~/types/checkout';
import type { ProductDto } from '~/types/product';

export const useCartStore = defineStore('cart', () => {
  const api = useApi();
  const cartToken = useCookie<string | null>('wd_cart_token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    path: '/',
  });

  const getT = (key: string, fallback = ''): string => {
    try {
      const nuxtApp = tryUseNuxtApp();
      const t = (nuxtApp?.$i18n as { t?: (k: string) => string })?.t;
      if (t) return t(key);
    } catch {
      // fallback
    }
    return fallback || key;
  };

  const items = ref<CartItemDto[]>([]);
  const appliedCoupon = ref<CouponDto | null>(null);
  const isLoading = ref(false);
  const isApplyingCoupon = ref(false);
  const isDrawerOpen = ref(false);
  const itemLoadingMap = reactive<Record<string | number, boolean>>({});
  const addingToCartMap = reactive<Record<string | number, boolean>>({});

  const debounceTimers = new Map<string | number, ReturnType<typeof setTimeout>>();

  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + (item.quantity || 1), 0);
  });

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => {
      const priceInfo = getProductPriceInfo(item.product, item.unit_price);
      let addonSum = 0;
      if (item.addons && item.addons.length) {
        for (const a of item.addons) {
          if (a.addon && !a.addon.is_free) {
            addonSum += parseFloat(String(a.addon.price || a.unit_price || '0')) || 0;
          }
        }
      }
      return total + (priceInfo.effectivePrice + addonSum) * (item.quantity || 1);
    }, 0);
  });

  const originalSubtotal = computed(() => {
    return items.value.reduce((total, item) => {
      const priceInfo = getProductPriceInfo(item.product, item.unit_price);
      let addonSum = 0;
      if (item.addons && item.addons.length) {
        for (const a of item.addons) {
          if (a.addon && !a.addon.is_free) {
            addonSum += parseFloat(String(a.addon.price || a.unit_price || '0')) || 0;
          }
        }
      }
      return total + (priceInfo.originalPrice + addonSum) * (item.quantity || 1);
    }, 0);
  });

  const offerSavings = computed(() => {
    return Math.max(0, originalSubtotal.value - subtotal.value);
  });

  const discount = computed(() => {
    if (!appliedCoupon.value) return 0;
    const discPercent = parseFloat(appliedCoupon.value.discount || '0') || 0;
    const maxDisc = parseFloat(appliedCoupon.value.max_discount || '0') || 0;
    let computedDisc = (subtotal.value * discPercent) / 100;
    if (maxDisc > 0 && computedDisc > maxDisc) {
      computedDisc = maxDisc;
    }
    return computedDisc;
  });

  const shippingCost = computed(() => 0);
  const vat = computed(() => 0);
  const total = computed(() => Math.max(0, subtotal.value - discount.value + shippingCost.value));
  const isEmpty = computed(() => items.value.length === 0);

  const saveToken = (newToken?: string | null) => {
    if (newToken && newToken !== 'null') {
      cartToken.value = newToken;
    }
  };

  const mapBackendItems = (rawItems: any[]): CartItemDto[] => {
    if (!Array.isArray(rawItems)) return [];
    return rawItems.map((raw) => {
      const prod = raw.product || null;
      const priceInfo = getProductPriceInfo(prod, raw.unit_price);
      const effectiveUnitP = priceInfo.effectivePrice;
      const qty = typeof raw.quantity === 'number' ? raw.quantity : parseInt(String(raw.quantity || 1), 10);
      
      let addonSum = 0;
      const addons = Array.isArray(raw.addons) ? raw.addons : [];
      for (const a of addons) {
        if (a.addon && !a.addon.is_free) {
          addonSum += parseFloat(String(a.addon.price || a.unit_price || '0')) || 0;
        }
      }

      return {
        id: raw.id,
        product_id: raw.product_id || prod?.id,
        product_name: raw.product_name || prod?.name || '',
        unit_price: String(effectiveUnitP),
        addons_total: raw.addons_total ? String(raw.addons_total) : String(addonSum),
        quantity: qty,
        total_price: String((effectiveUnitP + addonSum) * qty),
        cart_token: raw.cart_token,
        product: prod,
        addons,
      };
    });
  };

  const fetchCart = async () => {
    isLoading.value = true;
    try {
      const res = await api.get<{ status?: boolean; data?: CartDto; cart_token?: string }>('/api/v1/cart');
      if (res?.data?.items) {
        items.value = mapBackendItems(res.data.items);
      }
      if (res?.cart_token || (res?.data as any)?.cart_token) {
        saveToken(res.cart_token || (res.data as any)?.cart_token);
      }
    } catch {
      // Keep local state intact for offline / guest fallback
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = async (
    product: ProductDto,
    quantity = 1,
    addons: number[] = [],
    silent = false,
  ): Promise<boolean> => {
    const pId = product.id;
    // 1. Double-click / multi-tap guard
    if (addingToCartMap[pId]) return false;

    // 2. Stock checks
    const isInStock = product.in_stock === 1 || product.in_stock === true || String(product.in_stock) === '1';
    if (!isInStock) {
      toast.error(getT('product_out_of_stock_err', 'المنتج غير متوفر حالياً بالمخزن'));
      return false;
    }

    // 3. Max quantity limit = 5
    const existing = items.value.find((i) => i.product_id === product.id);
    const currentQty = existing ? existing.quantity : 0;
    if (currentQty + quantity > 5) {
      toast.error(getT('max_quantity_limit_reached', 'لا يمكنك طلب أكثر من 5 قطع من نفس المنتج'));
      return false;
    }

    addingToCartMap[pId] = true;
    try {
      const formData = new FormData();
      formData.append('product_id', String(product.id));
      formData.append('quantity', String(quantity));
      addons.forEach((id) => formData.append('addons[]', String(id)));

      const res = await api.post<CartApiResponse>('/api/v1/cart/items', formData);
      if (res?.data?.items) {
        items.value = mapBackendItems(res.data.items);
      } else {
        // Optimistic local push
        const unitP = String(product.final_price || product.price || '0');
        const newItem: CartItemDto = {
          id: `local_${pId}_${Date.now()}`,
          product_id: product.id,
          product_name: product.name || '',
          unit_price: unitP,
          quantity: currentQty + quantity,
          total_price: String((parseFloat(unitP) || 0) * (currentQty + quantity)),
          product,
          addons: addons.map((aid) => ({ id: aid, addon_id: aid })),
        };
        const idx = items.value.findIndex((i) => i.product_id === product.id);
        const existing = idx > -1 ? items.value[idx] : undefined;
        if (existing) existing.quantity += quantity;
        else items.value.push(newItem);
      }

      saveToken(res?.cart_token || res?.data?.cart_token);
      if (!silent) {
        toast.success(getT('added_to_cart', 'تمت الإضافة إلى السلة بنجاح'));
      }
      return true;
    } catch (err: any) {
      toast.error(err?.firstError || err?.message || getT('feature_not_available', 'حدث خطأ'));
      return false;
    } finally {
      addingToCartMap[pId] = false;
    }
  };

  const addItem = (product: ProductDto, quantity = 1, addons: number[] = [], silent = false) => {
    return addToCart(product, quantity, addons, silent);
  };

  const updateQuantity = (itemId: string | number, newQty: number, addons?: number[]) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }

    if (newQty > 5) {
      toast.error(getT('max_quantity_limit_reached', 'لا يمكنك طلب أكثر من 5 قطع من نفس المنتج'));
      return;
    }

    // Optimistic local update
    const target = items.value.find((i) => i.id === itemId);
    if (target) {
      target.quantity = newQty;
      if (addons !== undefined) {
        target.addons = target.addons.filter((a) => addons.includes(a.addon_id || a.id));
      }
    }

    if (debounceTimers.has(itemId)) clearTimeout(debounceTimers.get(itemId)!);

    const timer = setTimeout(async () => {
      itemLoadingMap[itemId] = true;
      try {
        const payload: Record<string, any> = { quantity: String(newQty) };
        if (addons !== undefined) payload.addons = addons;
        const res = await api.put<CartApiResponse>(`/api/v1/cart/items/${itemId}`, payload);
        if (res?.data?.items) {
          items.value = mapBackendItems(res.data.items);
        }
        saveToken(res?.cart_token || res?.data?.cart_token);
      } catch (err: any) {
        toast.error(err?.firstError || err?.message || getT('feature_not_available', 'حدث خطأ'));
      } finally {
        itemLoadingMap[itemId] = false;
      }
    }, 300);

    debounceTimers.set(itemId, timer);
  };

  const removeAddon = async (itemId: string | number, addonIdToRemove: number) => {
    const item = items.value.find((i) => i.id === itemId);
    if (!item) return;

    // Optimistic local removal
    item.addons = (item.addons || []).filter((a) => (a.addon_id || a.id) !== addonIdToRemove);
    const remainingIds = item.addons.map((a) => a.addon_id || a.id);

    itemLoadingMap[itemId] = true;
    try {
      const payload = {
        quantity: String(item.quantity || 1),
        addons: remainingIds,
      };
      const res = await api.put<CartApiResponse>(`/api/v1/cart/items/${itemId}`, payload);
      if (res?.data?.items) {
        items.value = mapBackendItems(res.data.items);
      }
      saveToken(res?.cart_token || res?.data?.cart_token);
      toast.success(getT('addon_removed', 'تمت إزالة الإضافة'));
    } catch {
      toast.success(getT('addon_removed', 'تمت إزالة الإضافة'));
    } finally {
      itemLoadingMap[itemId] = false;
    }
  };

  const removeFromCart = async (itemId: string | number) => {
    itemLoadingMap[itemId] = true;
    items.value = items.value.filter((i) => i.id !== itemId);

    try {
      const res = await api.delete<CartApiResponse>(`/api/v1/cart/items/${itemId}`);
      if (res?.data?.items) {
        items.value = mapBackendItems(res.data.items);
      }
      saveToken(res?.cart_token || res?.data?.cart_token);
      toast.success(getT('item_removed', 'تمت إزالة المنتج من السلة'));
    } catch {
      toast.success(getT('item_removed', 'تمت إزالة المنتج من السلة'));
    } finally {
      itemLoadingMap[itemId] = false;
    }
  };

  const clearCart = async () => {
    isLoading.value = true;
    items.value = [];
    appliedCoupon.value = null;
    try {
      await api.delete('/api/v1/cart');
      cartToken.value = null;
      toast.success(getT('cart_cleared', 'تم إفراغ السلة بنجاح'));
    } catch {
      cartToken.value = null;
      toast.success(getT('cart_cleared', 'تم إفراغ السلة بنجاح'));
    } finally {
      isLoading.value = false;
    }
  };

  const applyCoupon = async (code: string): Promise<boolean> => {
    if (!code.trim()) return false;
    isApplyingCoupon.value = true;
    try {
      const formData = new FormData();
      formData.append('coupon_num', code.trim());
      formData.append('amount', String(subtotal.value));

      const res = await api.post<{ status?: boolean; data?: any; message?: string }>('/api/v1/coupons/check', formData);
      if (res?.data) {
        appliedCoupon.value = {
          id: res.data.id || Date.now(),
          coupon_num: res.data.coupon_num || code.trim(),
          discount: String(res.data.discount || '10'),
          max_discount: res.data.max_discount ? String(res.data.max_discount) : undefined,
          type: res.data.type,
          type_label: res.data.type_label,
          is_active: 1,
        };
        toast.success(getT('coupon_applied', 'تم تطبيق كود الخصم بنجاح'));
        return true;
      }
      toast.error(getT('invalid_coupon', 'كود الخصم غير صالح أو منتهي الصلاحية'));
      return false;
    } catch (err: any) {
      toast.error(err?.firstError || err?.message || getT('invalid_coupon', 'كود الخصم غير صالح'));
      return false;
    } finally {
      isApplyingCoupon.value = false;
    }
  };

  const removeCoupon = () => {
    appliedCoupon.value = null;
    toast.success(getT('coupon_removed', 'تمت إزالة كود الخصم'));
  };

  return {
    items,
    appliedCoupon,
    isLoading,
    isApplyingCoupon,
    isDrawerOpen,
    itemLoadingMap,
    addingToCartMap,
    itemCount,
    subtotal,
    originalSubtotal,
    offerSavings,
    discount,
    shippingCost,
    vat,
    total,
    isEmpty,
    cartToken,
    fetchCart,
    addToCart,
    addItem,
    updateQuantity,
    removeAddon,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  };
});
