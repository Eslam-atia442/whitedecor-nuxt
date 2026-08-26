<template>
  <div class="space-y-8">
    <div class="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-6">
      <div v-for="(product, i) in products" :key="product.id" class="relative h-full">
        <UiBadge
          v-if="ranked"
          variant="gold"
          size="sm"
          class="absolute start-2 top-2 z-30"
        >
          {{ i + 1 }}
        </UiBadge>
        <ProductCard :product="product" />
      </div>
    </div>

    <div v-if="hasMore" class="flex justify-center pt-6 pb-4">
      <UiButton
        variant="outline"
        size="md"
        :disabled="isLoadingMore"
        @click="$emit('load-more')"
      >
        <span v-if="isLoadingMore" class="flex items-center gap-2">
          <span class="inline-block size-4 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <span>{{ $t('loading_more_products') }}</span>
        </span>
        <span v-else class="flex items-center gap-2">
          <span>{{ $t('loading_more_products') }}</span>
          <span class="material-symbols-rounded text-base">expand_more</span>
        </span>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

defineProps<{
  products: ProductDto[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  ranked?: boolean;
}>();

defineEmits<{
  'load-more': [];
}>();
</script>
