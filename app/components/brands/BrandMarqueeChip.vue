<template>
  <NuxtLink
    :to="localize({ path: '/products', query: { brand: brand.id } })"
    draggable="false"
    class="glass-card flex h-14 w-40 shrink-0 select-none items-center gap-3 px-3 transition-transform duration-200 hover:-translate-y-0.5 sm:h-16 sm:w-44 sm:px-4"
  >
    <div class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface sm:size-10">
      <NuxtImg
        v-if="brand.image"
        :src="brand.image"
        :alt="brand.name || 'Brand'"
        draggable="false"
        class="max-h-full max-w-full object-contain pointer-events-none"
      />
      <span v-else class="material-symbols-rounded text-gold">verified</span>
    </div>
    <span class="truncate text-xs font-bold text-ink pointer-events-none">{{ brand.name }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BrandDto } from '~/types/brand';

defineProps<{ brand: BrandDto }>();

const { localize } = useLocalizedPath();
</script>
