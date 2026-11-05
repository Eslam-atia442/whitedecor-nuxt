<template>
  <div>
    <div
      v-if="product.discount_end_at && hasDiscount"
      class="absolute z-30"
      :class="timerSize === 'lg' ? 'start-2 top-2' : 'start-1.5 top-1.5'"
    >
      <ProductCardTimer :end-at="product.discount_end_at" :size="timerSize" />
    </div>

    <NuxtLink
      :to="href"
      class="absolute inset-0 z-10 flex items-center justify-center bg-navy/0 transition-all duration-500 group-hover:bg-navy/40 group-hover:backdrop-blur-[2px]"
    >
      <span
        class="flex items-center gap-2 rounded-xl bg-card/90 px-4 py-2.5 text-xs font-bold text-ink shadow-card backdrop-blur-md translate-y-4 scale-90 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
      >
        <span class="material-symbols-rounded text-base text-gold">visibility</span>
        {{ $t('quick_view', 'Quick View') }}
      </span>
    </NuxtLink>

    <div
      class="absolute start-3 flex flex-col gap-1.5 pointer-events-none z-20"
      :class="hasFlashTimer ? (timerSize === 'lg' ? 'top-[5.75rem]' : 'top-11') : 'top-3'"
    >
      <UiDiscountBadge v-if="hasDiscount" :percent="discountPercent" size="md" />
      <UiBadge v-if="!isInStock" variant="mist" size="sm">
        {{ $t('out_of_stock', 'Out of Stock') }}
      </UiBadge>
    </div>

    <button
      type="button"
      class="absolute end-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-ink shadow-subtle backdrop-blur-md transition-all duration-300 hover:scale-115 hover:shadow-card active:scale-90 z-30"
      :class="[
        isFav ? 'text-coral ring-2 ring-coral/30' : 'hover:text-coral',
        hasFlashTimer ? (timerSize === 'lg' ? 'top-[5.75rem]' : 'top-11') : 'top-3',
      ]"
      aria-label="Toggle favorite"
      @click.stop="$emit('toggle-fav')"
    >
      <span
        class="material-symbols-rounded text-lg transition-transform duration-300"
        :class="[isFav ? 'font-fill scale-110' : 'scale-100']"
      >favorite</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import type { ProductDto } from '~/types/product';

defineProps<{
  product: ProductDto;
  href: RouteLocationRaw;
  isFav: boolean;
  isInStock: boolean;
  hasDiscount: boolean;
  hasFlashTimer: boolean;
  timerSize: 'sm' | 'lg';
  discountPercent: number;
}>();

defineEmits<{ (e: 'toggle-fav'): void }>();
</script>
