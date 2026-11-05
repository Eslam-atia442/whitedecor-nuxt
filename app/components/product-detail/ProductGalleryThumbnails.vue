<template>
  <div v-if="images && images.length > 1" class="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none pt-1">
    <button
      v-for="(img, idx) in images"
      :key="img"
      type="button"
      class="relative size-16 sm:size-18 shrink-0 overflow-hidden rounded-2xl border-2 bg-surface/60 p-1.5 transition-all duration-300 hover:scale-105 active:scale-95"
      :class="activeIndex === idx ? 'border-gold shadow-card ring-2 ring-gold/20 scale-102 bg-card' : 'border-mist opacity-60 hover:opacity-100 hover:border-gold/40'"
      @click="$emit('select', idx)"
    >
      <UiNetworkImage
        :src="img"
        :alt="`${productName || 'Product'} thumbnail ${idx + 1}`"
        fit="contain"
        loading="lazy"
        fallback-icon="chair"
        class="size-full"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  images: string[];
  activeIndex: number;
  productName?: string | null;
}>();

defineEmits<{ (e: 'select', index: number): void }>();
</script>

