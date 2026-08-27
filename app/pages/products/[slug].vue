<template>
  <div>
    <UiLoadingOverlay :is-open="isPending" />

    <UiEmptyState
      v-if="isError"
      icon="inventory_2"
      :title="$t('no_products_found')"
      :description="$t('no_products_filter_subtitle')"
      :action-label="$t('retry')"
      @action="retry"
    />
    <ProductDetailSkeleton v-else-if="isPending || !product" />
    <div
      v-else
      class="home-reveal"
      :class="{ 'is-inview': revealed }"
    >
      <ProductDetailView :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ hideMobileNav: true, mobileBack: true });

const { product, isPending, isError, revealed, retry } = await useProductPage();
</script>
