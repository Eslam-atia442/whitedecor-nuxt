<template>
  <div
    class="sm:hidden select-none cursor-grab active:cursor-grabbing"
    style="touch-action: pan-y;"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @click.capture="onClickCapture"
  >
    <div class="overflow-x-hidden px-0.5 pb-1">
      <div
        class="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        :style="{ transform: `translate3d(${isRtl ? index * 100 : -index * 100}%, 0, 0)` }"
      >
        <div
          v-for="(page, i) in pages"
          :key="i"
          class="grid w-full shrink-0 grid-cols-2 grid-rows-2 items-stretch gap-3"
          :aria-hidden="i !== index"
        >
          <div v-for="product in page" :key="product.id" class="min-h-0 h-full">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
    <UiSliderDots
      v-if="pages.length > 1"
      class="mt-4"
      :index="index"
      :count="pages.length"
      @go="go"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

const PAGE_SIZE = 4;
const props = defineProps<{ products: ProductDto[] }>();
const { locale } = useI18n();
const isRtl = computed(() => locale.value === 'ar');

const pages = computed(() => {
  const chunks: ProductDto[][] = [];
  for (let i = 0; i < props.products.length; i += PAGE_SIZE) {
    chunks.push(props.products.slice(i, i + PAGE_SIZE));
  }
  return chunks;
});

const {
  index,
  paused,
  go,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClickCapture,
} = useBannerSlider(() => pages.value.length, 4500);
</script>
