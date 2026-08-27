// [FLUTTER CONCEPT]: HomeScreen initState fetching categories + products + banners

import { reuseHydrationPayload } from '~/utils/hydration';

export const useHomeData = async () => {
  const homeStore = useHomeStore();
  const categoriesStore = useCategoriesStore();
  const brandsStore = useBrandsStore();
  const { locale } = useI18n();
  const { homeTitle, homeDescription } = useCatalogSeo();

  useSeo({
    title: homeTitle,
    description: homeDescription,
  });

  const query = useAsyncData(
    () => `home-feed-${locale.value}`,
    async () => {
      await Promise.allSettled([
        homeStore.fetchHomeData(),
        categoriesStore.fetchCategories({ roots: 1, embed: 'children' }),
        brandsStore.fetchBrands(),
      ]);
      return true;
    },
    {
      lazy: true,
      watch: [locale],
      getCachedData: reuseHydrationPayload,
    },
  );

  const isPending = computed(() => query.pending.value || homeStore.isPending);
  const isError = computed(() => Boolean(query.error.value) || homeStore.isError);
  const isEmpty = computed(() => homeStore.isEmpty && categoriesStore.rootCategories.length === 0);

  const retry = async () => {
    homeStore.beginFetch();
    await query.refresh();
  };

  if (import.meta.server) {
    await query;
  }

  return {
    sliders: computed(() => homeStore.sliders),
    newest: computed(() => homeStore.newest),
    discounted: computed(() => homeStore.discounted),
    topSold: computed(() => homeStore.topSold),
    categories: computed(() => categoriesStore.rootCategories),
    brands: computed(() => brandsStore.brands),
    isPending,
    isError,
    isEmpty,
    retry,
  };
};
