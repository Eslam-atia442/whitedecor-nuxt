<template>
  <NuxtLink
    :to="localize({ path: '/products', query: { brand: brand.id } })"
    class="group flex flex-col items-center justify-center rounded-2xl border border-mist bg-card p-6 text-center shadow-subtle transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card"
  >
    <div class="mb-4 flex size-20 items-center justify-center overflow-hidden rounded-2xl bg-surface p-2 transition-transform duration-300 group-hover:scale-105">
      <UiNetworkImage
        :src="brand.image"
        :alt="brand.name || 'Brand'"
        fit="contain"
        fallback-icon="verified"
        class="size-full"
        img-class="max-h-full max-w-full"
      />
    </div>
    <h3 class="text-sm font-bold text-ink transition-colors group-hover:text-gold">
      {{ brand.name }}
    </h3>
    <span v-if="brand.products_count" class="mt-1 text-xs text-ink-secondary">
      {{ brand.products_count }} {{ $t('items_count', { count: brand.products_count }) }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BrandDto } from '~/types/brand';

defineProps<{
  brand: BrandDto;
}>();

const { localize } = useLocalizedPath();
</script>
