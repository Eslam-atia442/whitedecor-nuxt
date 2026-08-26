// stores/products.ts
// [FLUTTER CONCEPT]: Equivalent to AllProductsCubit + AllProductsState in Flutter

import { defineStore } from 'pinia';
import type { ProductDto, ProductFilterParams, ProductPaginationMeta } from '~/types/product';

export const useProductsStore = defineStore('products', () => {
  // --- STATE ---
  const products = ref<ProductDto[]>([]);
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const isLoadingMore = ref(false);
  const errorMessage = ref<string | null>(null);

  const pagination = ref<ProductPaginationMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    has_more: false,
  });

  const filters = ref<ProductFilterParams>({
    page: 1,
    limit: 15,
    keyword: '',
    category_id: undefined,
    category_slug: undefined,
    brand_id: undefined,
    in_stock: undefined,
    only_offers: false,
    price_min: undefined,
    price_max: undefined,
    order: 'DESC',
  });

  // --- GETTERS ---
  const isLoading = computed(() => status.value === 'loading');
  const isSuccess = computed(() => status.value === 'success');
  const isError = computed(() => status.value === 'error');
  const hasMore = computed(() => (pagination.value.current_page || 1) < (pagination.value.last_page || 1));
  const totalProducts = computed(() => pagination.value.total);

  const activeFiltersCount = computed(() => {
    let count = 0;
    if (filters.value.category_slug || filters.value.category_id) count++;
    if (filters.value.brand_id) count++;
    if (filters.value.in_stock === 1) count++;
    if (filters.value.only_offers) count++;
    if (filters.value.price_min || filters.value.price_max) count++;
    if (filters.value.keyword) count++;
    return count;
  });

  // --- ACTIONS ---
  const clearCache = () => {
    products.value = [];
    status.value = 'idle';
    pagination.value = {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
      has_more: false,
    };
  };

  const fetchProducts = async (newFilters?: Partial<ProductFilterParams>, append = false) => {
    if (newFilters) {
      filters.value = { ...filters.value, ...newFilters };
    }

    if (append) {
      isLoadingMore.value = true;
    } else {
      products.value = [];
      status.value = 'loading';
      filters.value.page = 1;
    }
    errorMessage.value = null;

    try {
      const api = useApi();
      const categoriesStore = useCategoriesStore();

      const queryParams: Record<string, any> = {
        page: filters.value.page || 1,
        limit: filters.value.limit || 15,
        embed: 'brand,category,addons',
      };

      if (filters.value.keyword) queryParams.keyword = filters.value.keyword;
      if (filters.value.brand_id) queryParams.brand_id = filters.value.brand_id;
      if (filters.value.in_stock === 1) queryParams.in_stock = 1;
      if (filters.value.price_min) queryParams.price_min = filters.value.price_min;
      if (filters.value.price_max) queryParams.price_max = filters.value.price_max;
      if (filters.value.order) queryParams.order = filters.value.order;

      // Category identifier resolution (Flutter uses category.id)
      let catIdentifier = filters.value.category_id;
      if (!catIdentifier && filters.value.category_slug) {
        const cat = categoriesStore.getCategoryBySlug(filters.value.category_slug);
        catIdentifier = cat?.id || filters.value.category_slug;
      }

      let endpoint = '/api/v1/products';
      if (catIdentifier) {
        endpoint = `/api/v1/categories/${catIdentifier}/products`;
      }

      const response = await api.get<any>(endpoint, { params: queryParams });

      let items: ProductDto[] = [];
      let meta: ProductPaginationMeta = {
        current_page: filters.value.page || 1,
        last_page: 1,
        per_page: filters.value.limit || 15,
        total: 0,
        has_more: false,
      };

      const raw = response as any;
      if (Array.isArray(raw?.data?.products)) {
        // Category Products payload: { data: { category: {...}, products: [...] } }
        items = raw.data.products;
        meta = {
          current_page: filters.value.page || 1,
          last_page: 1,
          per_page: filters.value.limit || 15,
          total: raw.data.products.length,
          has_more: false,
        };
      } else if (Array.isArray(raw?.data?.data)) {
        // Nested paginator: { data: { data: [...], current_page: 1, last_page: 2, total: 20 } }
        items = raw.data.data;
        meta = {
          current_page: raw.data.current_page || 1,
          last_page: raw.data.last_page || 1,
          per_page: raw.data.per_page || 15,
          total: raw.data.total ?? items.length,
          has_more: (raw.data.current_page || 1) < (raw.data.last_page || 1),
        };
      } else if (Array.isArray(raw?.data)) {
        // Standard ResourceCollection: { data: [...], meta: { current_page: 1 } }
        items = raw.data;
        if (raw?.meta) {
          meta = {
            current_page: raw.meta.current_page || 1,
            last_page: raw.meta.last_page || 1,
            per_page: raw.meta.per_page || 15,
            total: raw.meta.total ?? items.length,
            has_more: (raw.meta.current_page || 1) < (raw.meta.last_page || 1),
          };
        } else {
          meta = {
            current_page: filters.value.page || 1,
            last_page: items.length >= (filters.value.limit || 15) ? (filters.value.page || 1) + 1 : (filters.value.page || 1),
            per_page: filters.value.limit || 15,
            total: items.length,
            has_more: items.length >= (filters.value.limit || 15),
          };
        }
      } else if (Array.isArray(raw?.products)) {
        items = raw.products;
        meta.total = items.length;
      } else if (Array.isArray(raw)) {
        items = raw;
        meta.total = items.length;
      }

      // [GUARD]: Filter out inactive products (is_active === false / 0)
      items = items.filter((p) => p.is_active !== false && p.is_active !== 0 && String(p.is_active) !== '0');

      // If only offers toggle is active, filter client-side if needed
      if (filters.value.only_offers) {
        items = items.filter((p) => {
          const isAct = Boolean(p.is_discount_active === true || p.is_discount_active === 1 || String(p.is_discount_active) === '1');
          const pOrig = parseFloat(p.price || '0') || 0;
          const pFinal = parseFloat(p.final_price || '0') || 0;
          return isAct && pFinal > 0 && pFinal < pOrig;
        });
      }

      // If price bounds are specified, ensure items strictly match range
      if (filters.value.price_min != null || filters.value.price_max != null) {
        items = items.filter((p) => {
          const rawPrice = parseFloat(p.final_price || p.price || '0') || 0;
          if (filters.value.price_min != null && rawPrice < filters.value.price_min) {
            return false;
          }
          if (filters.value.price_max != null && rawPrice > filters.value.price_max) {
            return false;
          }
          return true;
        });
      }

      if (append) {
        products.value = [...products.value, ...items];
      } else {
        products.value = items;
      }

      pagination.value = meta;
      status.value = 'success';
      return products.value;
    } catch (err: any) {
      status.value = 'error';
      errorMessage.value = err?.message || 'Failed to fetch products';
      products.value = [];
      throw err;
    } finally {
      isLoadingMore.value = false;
    }
  };

  const loadMore = async () => {
    if (isLoadingMore.value || !hasMore.value || status.value === 'loading') return;
    filters.value.page = (pagination.value.current_page || 1) + 1;
    await fetchProducts(undefined, true);
  };

  const resetFilters = () => {
    filters.value = {
      page: 1,
      limit: 15,
      keyword: '',
      category_id: undefined,
      category_slug: undefined,
      brand_id: undefined,
      in_stock: undefined,
      only_offers: false,
      price_min: undefined,
      price_max: undefined,
      order: 'DESC',
    };
  };

  return {
    products,
    status,
    isLoadingMore,
    errorMessage,
    pagination,
    filters,
    isLoading,
    isSuccess,
    isError,
    hasMore,
    totalProducts,
    activeFiltersCount,
    fetchProducts,
    loadMore,
    resetFilters,
    clearCache,
  };
});
