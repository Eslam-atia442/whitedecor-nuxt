<template>
  <div class="space-y-8">
    <UiBreadcrumbs :items="breadcrumbs" />

    <!-- Page Header & Live Search Bar -->
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

    <!-- Skeleton Loading State -->
    <CategorySkeletonGrid v-if="isLoading && !filteredCategories.length" />

    <!-- Error State -->
    <UiEmptyState
      v-else-if="isError && !filteredCategories.length"
      icon="error"
      :title="errorMessage || $t('errors.general', 'An error occurred')"
      :action-label="$t('retry')"
      @action="fetchCategories({}, true)"
    />

    <!-- Empty State -->
    <UiEmptyState
      v-else-if="!filteredCategories.length"
      icon="search_off"
      :title="$t('no_products_found')"
      :description="$t('no_products_filter_subtitle')"
      :action-label="$t('clear_filters')"
      @action="clearSearch"
    />

    <!-- Categories Grid -->
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
definePageMeta({ keepalive: true });

const { t } = useI18n();
const {
  filteredCategories,
  searchKeyword,
  isLoading,
  isError,
  errorMessage,
  fetchCategories,
  clearSearch,
} = useCategories();

const { breadcrumbs } = useCategoryNavigation();

await useAsyncData('categories-catalog', () => fetchCategories({ roots: 1, embed: 'children' }));

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
</script>
