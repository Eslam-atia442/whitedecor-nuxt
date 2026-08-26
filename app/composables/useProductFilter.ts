// composables/useProductFilter.ts
// [FLUTTER CONCEPT]: Two-way reactive URL query synchronization for catalog filters

import type { ProductFilterParams, ProductSortOption } from '~/types/product';

export const useProductFilter = () => {
  const router = useRouter();
  const route = useRoute();
  const store = useProductsStore();

  const syncFromRoute = () => {
    const q = route.query;
    store.filters = {
      page: q.page ? parseInt(q.page as string, 10) : 1,
      limit: 15,
      keyword: (q.search as string) || (q.keyword as string) || '',
      category_id: undefined,
      category_slug: (q.category as string) || undefined,
      brand_id: q.brand ? parseInt(q.brand as string, 10) : undefined,
      in_stock: q.in_stock === '1' ? 1 : undefined,
      only_offers: q.offers === 'true',
      price_min: q.min_price ? parseFloat(q.min_price as string) : undefined,
      price_max: q.max_price ? parseFloat(q.max_price as string) : undefined,
      order: (q.sort as ProductSortOption) || 'DESC',
    };
  };

  const syncToRoute = () => {
    const f = store.filters;
    const query: Record<string, string | number | undefined> = {};

    if (f.page && f.page > 1) query.page = f.page;
    if (f.keyword) query.search = f.keyword;
    if (f.category_slug) query.category = f.category_slug;
    if (f.brand_id) query.brand = f.brand_id;
    if (f.in_stock === 1) query.in_stock = 1;
    if (f.only_offers) query.offers = 'true';
    if (f.price_min) query.min_price = f.price_min;
    if (f.price_max) query.max_price = f.price_max;
    if (f.order && f.order !== 'DESC') query.sort = f.order;

    router.push({ query });
  };

  const setCategoryFilter = (slug?: string) => {
    store.filters.category_slug = slug || undefined;
    store.filters.category_id = undefined;
    store.filters.page = 1;
    syncToRoute();
    store.fetchProducts();
  };

  const setBrandFilter = (brandId?: number) => {
    store.filters.brand_id = brandId || undefined;
    store.filters.page = 1;
    syncToRoute();
    store.fetchProducts();
  };

  const setKeyword = (keyword?: string) => {
    store.filters.keyword = keyword?.trim() || '';
    store.filters.page = 1;
    syncToRoute();
    store.fetchProducts();
  };

  const setSortOption = (order: ProductSortOption) => {
    store.filters.order = order;
    store.filters.page = 1;
    syncToRoute();
    store.fetchProducts();
  };

  const setPriceRange = (min?: number, max?: number) => {
    store.filters.price_min = min;
    store.filters.price_max = max;
    store.filters.page = 1;
    syncToRoute();
    store.fetchProducts();
  };

  const toggleInStock = () => {
    store.filters.in_stock = store.filters.in_stock === 1 ? undefined : 1;
    store.filters.page = 1;
    syncToRoute();
    store.fetchProducts();
  };

  const toggleOnlyOffers = () => {
    store.filters.only_offers = !store.filters.only_offers;
    store.filters.page = 1;
    syncToRoute();
    store.fetchProducts();
  };

  const clearAllFilters = () => {
    store.resetFilters();
    syncToRoute();
    store.fetchProducts();
  };

  return {
    filters: computed(() => store.filters),
    activeFiltersCount: computed(() => store.activeFiltersCount),
    syncFromRoute,
    syncToRoute,
    setCategoryFilter,
    setBrandFilter,
    setKeyword,
    setSortOption,
    setPriceRange,
    toggleInStock,
    toggleOnlyOffers,
    clearAllFilters,
  };
};
