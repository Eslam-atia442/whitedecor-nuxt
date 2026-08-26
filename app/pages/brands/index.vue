<template>
  <div class="space-y-8">
    <UiBreadcrumbs :items="breadcrumbs" />

    <!-- Brands Directory Header -->
    <div class="border-b border-mist pb-6 space-y-2">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink">
        {{ $t('brands') }}
      </h1>
      <p class="text-xs sm:text-sm text-ink-secondary max-w-xl">
        {{ $t('brand_showcase_desc') }}
      </p>
    </div>

    <!-- Skeleton Loading -->
    <BrandSkeletonGrid v-if="isLoading && !brands.length" />

    <!-- Error View -->
    <UiEmptyState
      v-else-if="isError && !brands.length"
      icon="error"
      :title="errorMessage || $t('errors.general')"
      :action-label="$t('retry')"
      @action="fetchBrands(true)"
    />

    <!-- Empty View -->
    <UiEmptyState
      v-else-if="!brands.length"
      icon="verified"
      :title="$t('no_products_found')"
      :description="$t('no_products_filter_subtitle')"
    />

    <!-- Brands Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
      <BrandCard
        v-for="brand in brands"
        :key="brand.id"
        :brand="brand"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ keepalive: true });

const { t } = useI18n();
const brandsStore = useBrandsStore();

const brands = computed(() => brandsStore.brands);
const isLoading = computed(() => brandsStore.isLoading);
const isError = computed(() => brandsStore.isError);
const errorMessage = computed(() => brandsStore.errorMessage);
const fetchBrands = brandsStore.fetchBrands;

const breadcrumbs = computed(() => [
  { label: t('home', 'Home'), to: '/' },
  { label: t('brands', 'Brands'), to: '/brands', isCurrent: true },
]);

await useAsyncData('brands-directory', () => fetchBrands());

useSeo({
  title: t('brands'),
  description: t('brand_showcase_desc'),
});
</script>
