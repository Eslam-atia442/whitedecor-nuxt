<template>
  <section v-if="products.length" class="rounded-3xl bg-card p-4 shadow-card sm:p-6">
    <UiSectionHeader :title="title" :subtitle="subtitle" :to="to" />
    <HomeArrivalsSlider class="mt-4" :products="products.slice(0, 12)" />
    <div class="relative mt-4 hidden sm:block">
      <button
        type="button"
        class="home-rail-btn left-1"
        :aria-label="$t('home_prev_slide')"
        @click="nudge(-1)"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div
        ref="scroller"
        dir="ltr"
        class="grid grid-flow-col grid-rows-1 auto-cols-[13rem] gap-3 overflow-x-auto overscroll-x-contain pb-1 snap-x snap-mandatory scrollbar-none touch-pan-x sm:mx-8"
      >
        <div v-for="product in products" :key="product.id" class="h-full snap-start">
          <ProductCard :product="product" />
        </div>
      </div>
      <button
        type="button"
        class="home-rail-btn right-1"
        :aria-label="$t('home_next_slide')"
        @click="nudge(1)"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import HomeArrivalsSlider from '~/components/home/HomeArrivalsSlider.vue';
import type { ProductDto } from '~/types/product';

defineProps<{
  title: string;
  subtitle?: string;
  to?: string;
  products: ProductDto[];
}>();

const scroller = ref<HTMLElement | null>(null);

const nudge = (dir: number) => {
  scroller.value?.scrollBy({ left: dir * 240, behavior: 'smooth' });
};
</script>
