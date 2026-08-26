<template>
  <div ref="el" class="home-reveal" :class="{ 'is-inview': visible }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const el = ref<HTMLElement | null>(null);
const visible = ref(false);
let io: IntersectionObserver | null = null;

onMounted(() => {
  if (!import.meta.client || !el.value) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = true;
    return;
  }
  io = new IntersectionObserver(
    ([entry]) => {
      visible.value = Boolean(entry?.isIntersecting);
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
  );
  io.observe(el.value);
});

onUnmounted(() => {
  io?.disconnect();
});
</script>
