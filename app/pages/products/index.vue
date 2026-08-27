<template>
  <div class="space-y-6">
    <UiLoadingOverlay :is-open="isPending" />
    <UiBreadcrumbs :items="breadcrumbs" />

    <!-- Top Bar: Title & Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-mist pb-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-ink">{{ $t('all_products') }}</h1>
        <p class="text-xs sm:text-sm text-ink-secondary">{{ $t('items_count', { count: totalProducts }) }}</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Mobile Filter Button Trigger -->
        <button
          type="button"
          :disabled="isFilterDisabled"
          class="flex lg:hidden items-center gap-2 rounded-xl border border-mist bg-card px-3.5 py-2 text-xs font-bold text-ink shadow-subtle hover:border-gold/40 active:scale-95 transition-transform disabled:opacity-50"
          @click="isMobileFilterOpen = true"
        >
          <span class="material-symbols-rounded text-base text-gold">tune</span>
          <span>{{ $t('filters') }}</span>
          <span v-if="activeFiltersCount > 0" class="flex size-4.5 items-center justify-center rounded-full bg-gold text-[10px] text-navy font-extrabold">
            {{ activeFiltersCount }}
          </span>
        </button>

        <ProductSortSelect
          :model-value="filters.order"
          :is-disabled="isFilterDisabled"
          @update:model-value="setSortOption"
        />
      </div>
    </div>

    <ProductSearchBar
      id="products-search-input"
      v-model="searchQuery"
      class="sm:max-w-md"
      @submit="setKeyword"
    />

    <!-- Active Filter Chips -->
    <ProductFilterChips
      :filters="filters"
      :active-filters-count="activeFiltersCount"
      @remove-category="setCategoryFilter(undefined)"
      @remove-brand="setBrandFilter(undefined)"
      @remove-keyword="setKeyword('')"
      @toggle-in-stock="toggleInStock"
      @toggle-offers="toggleOnlyOffers"
      @remove-price="setPriceRange(undefined, undefined)"
      @clear-all="clearAllFilters"
    />

    <!-- Main Layout: Sidebar + Product Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <!-- Desktop Sidebar -->
      <div class="hidden lg:block lg:col-span-1 sticky top-24">
        <ProductFilterSidebar
          :filters="filters"
          :categories="categories"
          :brands="brands"
          :active-filters-count="activeFiltersCount"
          :is-disabled="isFilterDisabled"
          @select-category="setCategoryFilter"
          @select-brand="setBrandFilter"
          @set-price="setPriceRange"
          @toggle-in-stock="toggleInStock"
          @toggle-offers="toggleOnlyOffers"
          @clear-all="clearAllFilters"
        />
      </div>

      <!-- Catalog Grid Column -->
      <div class="lg:col-span-3 space-y-6">
        <ProductSkeletonGrid v-if="isPending" />
        <UiEmptyState
          v-else-if="isError"
          icon="search_off"
          :title="$t('no_products_found')"
          :description="$t('no_products_filter_subtitle')"
          :action-label="$t('retry')"
          @action="retry"
        />
        <UiEmptyState
          v-else-if="!products.length"
          icon="search_off"
          :title="$t('no_products_found')"
          :description="$t('no_products_filter_subtitle')"
          :action-label="$t('clear_filters')"
          @action="clearAllFilters"
        />
        <ProductGrid
          v-else
          :products="products"
          :has-more="hasMore"
          :is-loading-more="isLoadingMore"
          @load-more="loadMore"
        />
      </div>
    </div>

    <!-- Mobile Filter Drawer -->
    <ProductFilterDrawer
      :is-open="isMobileFilterOpen"
      :filters="filters"
      :categories="categories"
      :brands="brands"
      :is-disabled="isFilterDisabled"
      @close="isMobileFilterOpen = false"
      @select-category="setCategoryFilter"
      @select-brand="setBrandFilter"
      @set-price="setPriceRange"
      @toggle-in-stock="toggleInStock"
      @toggle-offers="toggleOnlyOffers"
      @clear-all="clearAllFilters"
    />
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { reuseHydrationPayload } from '~/utils/hydration';

const { t, locale } = useI18n();
const route = useRoute();
const {
  products,
  isPending: isStorePending,
  isError,
  isLoadingMore,
  hasMore,
  totalProducts,
  categories,
  brands,
  loadMore,
  initCatalog,
} = useProducts();
const {
  filters,
  activeFiltersCount,
  syncFromRoute,
  setCategoryFilter,
  setBrandFilter,
  setKeyword,
  setSortOption,
  setPriceRange,
  toggleInStock,
  toggleOnlyOffers,
  clearAllFilters,
} = useProductFilter();

const isMobileFilterOpen = ref(false);
const searchQuery = ref(String(route.query.search || route.query.keyword || ''));

const breadcrumbs = computed(() => [
  { label: t('home', 'Home'), to: '/' },
  { label: t('all_products', 'Products'), to: '/products', isCurrent: true },
]);

useSeo({
  title: t('all_products'),
  description: t('all_products_subtitle'),
});

watch(() => route.query.search, (value) => {
  const next = String(value || '');
  if (next !== searchQuery.value) searchQuery.value = next;
});

watchDebounced(searchQuery, (value) => {
  if ((filters.value.keyword || '') === value.trim()) return;
  setKeyword(value);
}, { debounce: 400 });

const query = useAsyncData(
  () => `products-catalog-${locale.value}-${route.fullPath}`,
  async () => {
    syncFromRoute();
    searchQuery.value = String(route.query.search || route.query.keyword || '');
    await initCatalog();
    return true;
  },
  { lazy: true, watch: [locale, () => route.fullPath], getCachedData: reuseHydrationPayload },
);

const isPending = computed(() => query.pending.value || isStorePending.value);
const isFilterDisabled = computed(() => isPending.value);
const retry = () => query.refresh();

if (import.meta.server) {
  await query;
}
</script>
