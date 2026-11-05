<template>
  <section v-if="products.length" class="space-y-6">
    <UiSectionHeader :title="title" :subtitle="subtitle" :to="to" />
    <HomeArrivalsSlider class="mt-4" :products="products.slice(0, 12)" />
    <div class="relative mt-4 hidden sm:block">
      <button
        type="button"
        class="home-rail-btn start-1"
        :aria-label="$t('home_prev_slide')"
        @click="nudge(-1)"
      >
        <span class="material-symbols-rounded text-lg">{{ isRtl ? 'chevron_right' : 'chevron_left' }}</span>
      </button>
      <div
        ref="scroller"
        class="grid grid-flow-col grid-rows-1 auto-cols-[13rem] gap-3 overflow-x-auto overscroll-x-contain pb-1 snap-x snap-mandatory scrollbar-none sm:mx-8 cursor-grab active:cursor-grabbing select-none"
        style="-webkit-overflow-scrolling: touch; touch-action: pan-x pan-y;"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointerleave="onPointerLeave"
        @pointercancel="onPointerCancel"
        @click.capture="onClickCapture"
      >
        <div v-for="product in products" :key="product.id" class="h-full snap-start">
          <ProductCard :product="product" />
        </div>
      </div>
      <button
        type="button"
        class="home-rail-btn end-1"
        :aria-label="$t('home_next_slide')"
        @click="nudge(1)"
      >
        <span class="material-symbols-rounded text-lg">{{ isRtl ? 'chevron_left' : 'chevron_right' }}</span>
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

const { locale } = useI18n();
const isRtl = computed(() => locale.value === 'ar');
const scroller = ref<HTMLElement | null>(null);

const {
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onClickCapture,
} = useDragScroll(scroller);

const nudge = (dir: number) => {
  const step = isRtl.value ? -dir * 260 : dir * 260;
  scroller.value?.scrollBy({ left: step, behavior: 'smooth' });
};
</script>
