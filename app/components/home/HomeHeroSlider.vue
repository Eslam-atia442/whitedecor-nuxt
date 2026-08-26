<template>
  <section
    class="relative w-full overflow-hidden"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="relative h-[58vh] min-h-[420px] w-full sm:h-[64vh] lg:h-[78vh]">
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
const { index, paused, next, prev, go, onTouchStart, onTouchEnd } = useBannerSlider(
  () => props.slides.length,
  5000,
);
</script>
