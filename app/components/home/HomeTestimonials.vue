<template>
  <section class="space-y-8">
    <UiSectionHeader :title="$t('customer_spotlight')" :subtitle="$t('customer_spotlight_subtitle')" />
    <div
      class="relative"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <HomeTestimonialCard
        v-for="(item, i) in items"
        :key="item.id"
        :item="item"
        :active="i === index"
      />
      <UiSliderDots
        class="mt-6"
        :index="index"
        :count="items.length"
        @go="go"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { HOME_TESTIMONIALS } from '~/constants/home_content';

const items = HOME_TESTIMONIALS;
const { index, paused, go, onTouchStart, onTouchEnd } = useBannerSlider(() => items.length, 6000);
</script>
