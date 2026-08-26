<template>
  <div class="space-y-6">
    <UiBreadcrumbs :items="breadcrumbs" />
    <ProductSearchBar
      id="search-page-input"
      v-model="query"
      autofocus
      @submit="submitSearch"
    />

    <SearchRecentList
      v-if="!hasQuery"
      :terms="recentTerms"
      @select="selectRecent"
      @clear="clearRecent"
    />

    <template v-else>
      <div class="flex items-center justify-between gap-3 border-b border-mist pb-4">
        <div>
          <h1 class="text-2xl font-extrabold text-ink">{{ $t('search_page_title') }}</h1>
          <p class="text-xs text-ink-secondary">{{ $t('items_count', { count: totalProducts }) }}</p>
        </div>
        <ProductSortSelect :model-value="filters.order" @update:model-value="setSortOption" />
      </div>

      <ProductSkeletonGrid v-if="isLoading" />
      <UiEmptyState
        v-else-if="!products.length"
        icon="search_off"
        :title="$t('no_products_found')"
        :description="$t('no_products_filter_subtitle')"
      />
      <ProductGrid
        v-else
        :products="products"
        :has-more="hasMore"
        :is-loading-more="isLoadingMore"
        @load-more="loadMore"
      />
    </template>

    <UiEmptyState
      v-if="!hasQuery && !recentTerms.length"
      icon="search"
      :title="$t('search_idle_title')"
      :description="$t('search_idle_desc')"
    />
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';

definePageMeta({ keepalive: true });

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const store = useProductsStore();
const { products, isLoading, isLoadingMore, hasMore, totalProducts, loadMore } = useProducts();
const { filters, setSortOption } = useProductFilter();
const { terms: recentTerms, add: addRecent, clear: clearRecent } = useRecentSearches();
const query = ref(String(route.query.search || route.query.keyword || ''));
const hasQuery = computed(() => query.value.trim().length > 0);
let appliedTerm: string | null = null;

const breadcrumbs = computed(() => [
  { label: t('home'), to: localePath('/') },
  { label: t('search_page_title'), to: localePath('/search'), isCurrent: true },
]);

const applySearch = (value: string, persist = false) => {
  const term = value.trim();
  query.value = term;
  if (persist && term) addRecent(term);
  if (appliedTerm === term && store.status !== 'idle') return;
  store.filters.keyword = term;
  store.filters.page = 1;
  store.filters.category_slug = undefined;
  store.filters.category_id = undefined;
  store.filters.brand_id = undefined;
  store.filters.in_stock = undefined;
  store.filters.only_offers = false;
  store.filters.price_min = undefined;
  store.filters.price_max = undefined;
  const current = String(route.query.search || '');
  if (current !== term) {
    router.replace({ path: localePath('/search'), query: term ? { search: term } : {} });
  }
  appliedTerm = term;
  if (!term) {
    store.clearCache();
    return;
  }
  store.fetchProducts();
};

const submitSearch = (value: string) => applySearch(value, true);
const selectRecent = (term: string) => applySearch(term, true);

watchDebounced(query, (value) => applySearch(value), { debounce: 400 });

await useAsyncData(
  () => `search-catalog-${locale.value}-${String(route.query.search || '')}`,
  async () => {
    appliedTerm = null;
    applySearch(String(route.query.search || route.query.keyword || ''));
    return true;
  },
  { watch: [locale] },
);

useSeo({ title: t('search_page_title'), noIndex: true });
</script>
