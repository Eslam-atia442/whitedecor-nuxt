<template>
  <div class="space-y-8">
    <UiLoadingOverlay :is-open="isPending" />
    <UiBreadcrumbs :items="breadcrumbs" />

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-mist pb-6">
      <div class="space-y-1.5">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink">
          {{ $t('categories') }}
        </h1>
        <p class="text-xs sm:text-sm text-ink-secondary max-w-xl leading-relaxed">
          {{ $t('categories_explorer_subtitle') }}
        </p>
      </div>
      <CategorySearchBar v-model="searchKeyword" class="w-full md:w-80" />
    </div>

    <CategorySkeletonGrid v-if="isPending" />
    <UiEmptyState
      v-else-if="isError"
      icon="error"
      :title="errorMessage || $t('errors.general', 'An error occurred')"
      :action-label="$t('retry')"
      @action="retry"
    />
    <UiEmptyState
      v-else-if="!filteredCategories.length"
      icon="search_off"
      :title="$t('no_products_found')"
      :description="$t('no_products_filter_subtitle')"
      :action-label="$t('clear_filters')"
      @action="clearSearch"
    />
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <CategoryGridCard
        v-for="cat in filteredCategories"
        :key="cat.id"
        :category="cat"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reuseHydrationPayload } from '~/utils/hydration';

const { t, locale } = useI18n();
const {
  filteredCategories,
  searchKeyword,
  isPending,
  isError,
  errorMessage,
  fetchCategories,
  clearSearch,
} = useCategories();
const { breadcrumbs } = useCategoryNavigation();

useSeo({
  title: t('categories'),
  description: t('categories_explorer_subtitle'),
});

useSchemaOrg([
  {
    '@type': 'CollectionPage',
    name: t('categories'),
  },
]);

const query = useAsyncData(
  () => `categories-catalog-${locale.value}`,
  () => fetchCategories({ roots: 1, embed: 'children' }),
  { lazy: true, watch: [locale], getCachedData: reuseHydrationPayload },
);

const retry = () => query.refresh();

if (import.meta.server) {
  await query;
}
</script>
