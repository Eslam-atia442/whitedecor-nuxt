// [FLUTTER CONCEPT]: HomeScreen initState fetching categories + products + banners

export const useHomeData = () => {
  const homeStore = useHomeStore();
  const categoriesStore = useCategoriesStore();
  const brandsStore = useBrandsStore();
  const { locale } = useI18n();

  const { pending, error, refresh } = useAsyncData(
    () => `home-feed-${locale.value}`,
    async () => {
      await Promise.allSettled([
        homeStore.fetchHomeData(),
        categoriesStore.fetchCategories({ roots: 1, embed: 'children' }),
        brandsStore.fetchBrands(),
      ]);
      return true;
    },
    { watch: [locale] },
  );

  const isLoading = computed(() => pending.value || homeStore.isLoading);
  const isError = computed(() => Boolean(error.value) || homeStore.isError);
  const isEmpty = computed(() => homeStore.isEmpty && categoriesStore.rootCategories.length === 0);
  const isReady = computed(() => homeStore.isSuccess && !isLoading.value);

  const retry = async () => {
    homeStore.clearCache();
    await refresh();
  };

  const { homeTitle, homeDescription } = useCatalogSeo();
  useSeo({
    title: homeTitle,
    description: homeDescription,
  });

  return {
    sliders: computed(() => homeStore.sliders),
    newest: computed(() => homeStore.newest),
    discounted: computed(() => homeStore.discounted),
    topSold: computed(() => homeStore.topSold),
    categories: computed(() => categoriesStore.rootCategories),
    brands: computed(() => brandsStore.brands),
    isLoading,
    isError,
    isEmpty,
    isReady,
    retry,
  };
};
