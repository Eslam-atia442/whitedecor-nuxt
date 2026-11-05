<template>
  <div class="space-y-4 rounded-3xl border border-mist bg-card p-5 sm:p-6 shadow-subtle">
    <!-- Top Tags: Brand, Category, Stock -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex flex-wrap items-center gap-2">
        <NuxtLink
          v-if="product.category"
          :to="localize(`/categories/${product.category.slug}`)"
          class="inline-flex items-center gap-1 rounded-xl bg-surface border border-mist px-3 py-1 text-xs font-semibold text-ink transition-colors hover:border-gold/50"
        >
          <span class="material-symbols-rounded text-sm text-gold">category</span>
          <span>{{ product.category.name }}</span>
        </NuxtLink>

        <NuxtLink
          v-if="product.brand"
          :to="localize(`/products?brand=${product.brand.id}`)"
          class="inline-flex items-center gap-1 rounded-xl bg-gold/10 border border-gold/30 px-3 py-1 text-xs font-bold text-gold transition-colors hover:bg-gold/15"
        >
          <span class="material-symbols-rounded text-sm">verified</span>
          <span>{{ product.brand.name }}</span>
        </NuxtLink>
      </div>

      <!-- Modern Minimalist Stock Status -->
      <div class="inline-flex items-center gap-2 select-none">
        <span
          class="size-2 rounded-full shrink-0"
          :class="isInStock ? 'bg-emerald-500 shadow-xs shadow-emerald-500/50 animate-pulse' : 'bg-neutral-400'"
        />
        <span
          class="text-xs font-bold tracking-wide font-cairo"
          :class="isInStock ? 'text-emerald-700 dark:text-emerald-400' : 'text-neutral-500'"
        >
          {{ isInStock ? $t('in_stock') : $t('out_of_stock') }}
        </span>
      </div>
    </div>

    <!-- Product Title -->
    <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink leading-tight">
      {{ product.name }}
    </h1>

    <!-- Meta & SKU Bar -->
    <div class="flex flex-wrap items-center gap-4 pt-2 border-t border-mist/60 text-xs text-ink-secondary">
      <div v-if="product.reviews_avg" class="flex items-center gap-1.5">
        <UiRatingStars :rating="ratingValue" :reviews-count="reviewsCount" />
      </div>

      <div v-if="product.sku" class="flex items-center gap-1 font-mono">
        <span class="text-ink-secondary/60">{{ $t('sku') }}:</span>
        <span class="font-bold text-ink">{{ product.sku }}</span>
      </div>

      <div v-if="product.barcode" class="flex items-center gap-1 font-mono">
        <span class="text-ink-secondary/60">{{ $t('barcode') }}:</span>
        <span class="font-bold text-ink">{{ product.barcode }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

const { localize } = useLocalizedPath();

const props = defineProps<{
  product: ProductDto;
  isInStock: boolean;
}>();

const ratingValue = computed(() => {
  const r = parseFloat((props.product.reviews_avg as any) || '4.8');
  return isNaN(r) ? 4.8 : r;
});

const reviewsCount = computed(() => {
  return props.product.reviews_count || 0;
});
</script>
