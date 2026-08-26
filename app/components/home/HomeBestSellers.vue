<template>
  <section v-if="products.length" class="space-y-6">
    <UiSectionHeader :title="title" :subtitle="subtitle" :to="to" />
    <div class="grid grid-cols-2 items-start gap-3 sm:gap-5 lg:grid-cols-4">
      <div
        v-for="(product, i) in products"
        :key="product.id"
        class="relative"
        :class="staggerClass(i)"
      >
        <UiBadge variant="gold" size="sm" class="absolute start-2 top-2 z-30">
          {{ i + 1 }}
        </UiBadge>
        <ProductCard :product="product" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

defineProps<{
  title: string;
  subtitle?: string;
  to?: string;
  products: ProductDto[];
}>();

const staggerClass = (index: number) => {
  const steps = ['mt-0', 'mt-8 sm:mt-12', 'mt-3 sm:mt-6', 'mt-10 sm:mt-16'];
  return steps[index % 4];
};
</script>
