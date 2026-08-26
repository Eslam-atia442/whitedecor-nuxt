// composables/useProducts.ts
// [FLUTTER CONCEPT]: Business logic controller for products catalog

export const useProducts = () => {
  const store = useProductsStore();
  const brandsStore = useBrandsStore();
  const categoriesStore = useCategoriesStore();

  const initCatalog = async () => {
    const res = await Promise.allSettled([
      categoriesStore.fetchCategories(),
      brandsStore.fetchBrands(),
      store.fetchProducts(),
    ]);
    return res;
  };

  return {
    products: computed(() => store.products),
    isLoading: computed(() => store.isLoading),
    isLoadingMore: computed(() => store.isLoadingMore),
    isError: computed(() => store.isError),
    errorMessage: computed(() => store.errorMessage),
    hasMore: computed(() => store.hasMore),
    totalProducts: computed(() => store.totalProducts),
    filters: computed(() => store.filters),
    activeFiltersCount: computed(() => store.activeFiltersCount),
    categories: computed(() => categoriesStore.categories),
    brands: computed(() => brandsStore.brands),
    fetchProducts: store.fetchProducts,
    loadMore: store.loadMore,
    resetFilters: store.resetFilters,
    initCatalog,
  };
};
