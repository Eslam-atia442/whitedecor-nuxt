<template>
  <section v-if="relatedProducts && relatedProducts.length > 0" class="space-y-6 border-t border-mist pt-12">
    <UiSectionHeader
      :title="$t('you_may_also_like')"
      :subtitle="$t('all_products_subtitle')"
      to="/products"
      :link-label="$t('all_products')"
    />
    <ProductGrid :products="relatedProducts.slice(0, 4)" />
  </section>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

defineProps<{
  relatedProducts: ProductDto[];
}>();
</script>
