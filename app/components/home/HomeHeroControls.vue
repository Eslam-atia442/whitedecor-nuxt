<template>
  <div class="pointer-events-none absolute inset-0 z-30" dir="ltr">
    <button
      type="button"
      class="hero-arrow hero-arrow-prev hidden sm:flex"
      :aria-label="$t('home_prev_slide')"
      @click="$emit('prev')"
    >
      <svg class="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button
      type="button"
      class="hero-arrow hero-arrow-next hidden sm:flex"
      :aria-label="$t('home_next_slide')"
      @click="$emit('next')"
    >
      <svg class="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <UiSliderDots
      class="pointer-events-auto absolute inset-x-0 bottom-6"
      :index="index"
      :count="count"
      tone="light"
      @go="$emit('go', $event)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ index: number; count: number }>();
defineEmits<{ go: [index: number]; prev: []; next: [] }>();
</script>
