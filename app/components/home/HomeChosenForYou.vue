<template>
  <section v-if="visibleProducts.length" class="space-y-6">
    <UiSectionHeader
      :title="$t('chosen_for_you_today')"
      :subtitle="$t('chosen_for_you_subtitle')"
      to="/products"
    />
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <div v-for="product in visibleProducts" :key="product.id" class="h-full">
        <ProductCard :product="product" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// [FLUTTER CONCEPT]: Equivalent to Flutter's HomeChosenForYouWidget
import type { ProductDto } from '~/types/product';

const props = withDefaults(
  defineProps<{
    products: ProductDto[];
    limit?: number;
    seed?: number;
  }>(),
  {
    limit: 8,
    seed: 0,
  },
);

const visibleProducts = computed(() => {
  if (!props.products.length) return [];
  // Predictable rotation based on seed, matching Flutter's catalog count shuffle
  const list = [...props.products];
  if (props.seed && list.length > 1) {
    const offset = Math.abs(props.seed) % list.length;
    return [...list.slice(offset), ...list.slice(0, offset)].slice(0, props.limit);
  }
  return list.slice(0, props.limit);
});
</script>

