<template>
  <section v-if="visible.length" class="rounded-3xl bg-card p-4 shadow-card sm:p-6">
    <UiSectionHeader :title="title" :subtitle="subtitle" :to="to" />
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div v-for="product in visible" :key="product.id" class="h-full">
        <ProductCard :product="product" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

const props = defineProps<{
  title: string;
  subtitle?: string;
  to?: string;
  products: ProductDto[];
}>();

const visible = computed(() => props.products.slice(0, 4));
</script>
