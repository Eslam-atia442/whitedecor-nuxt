<template>
  <section v-if="products.length" class="glass-card rounded-3xl p-4 sm:p-6">
    <UiSectionHeader :title="title" :subtitle="subtitle" :to="to" />
    <div class="mt-4 flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none touch-pan-x">
      <div
        v-for="product in products"
        :key="product.id"
        class="w-40 shrink-0 snap-start sm:w-48"
      >
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
</script>
