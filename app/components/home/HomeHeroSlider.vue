<template>
  <section
    class="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
    style="touch-action: pan-y;"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @click.capture="onClickCapture"
  >
    <div class="relative h-[46vh] min-h-[320px] w-full sm:h-[60vh] lg:h-[72vh]">
      <HomeHeroSlide
        v-for="(slide, i) in slides"
        :key="slide.id"
        :slide="slide"
        :active="i === index"
      />
      <HomeHeroControls
        v-if="slides.length > 1"
        :index="index"
        :count="slides.length"
        @go="go"
        @prev="prev"
        @next="next"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SliderDto } from '~/types/home';

const props = defineProps<{ slides: SliderDto[] }>();
const {
  index,
  paused,
  next,
  prev,
  go,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClickCapture,
} = useBannerSlider(() => props.slides.length, 3200);
</script>
