<template>
  <div>
    <UiLoadingOverlay :is-open="isLoading" />

    <UiEmptyState
      v-if="isError && !isLoading"
      icon="inventory_2"
      :title="$t('no_products_found')"
      :description="$t('no_products_filter_subtitle')"
      :action-label="$t('retry')"
      @action="retry"
    />
    <ProductDetailSkeleton v-else-if="isLoading || !product" />
    <div
      v-else
      class="home-reveal"
      :class="{ 'is-inview': revealed }"
    >
      <ProductDetailView />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ hideMobileNav: true, mobileBack: true });

const { product, isLoading, isError, revealed, retry } = await useProductPage();
</script>
