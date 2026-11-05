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
      if (entry?.isIntersecting) {
        visible.value = true;
        if (el.value && io) io.unobserve(el.value);
      }
    },
    { threshold: 0.05, rootMargin: '50px 0px 50px 0px' },
  );
  io.observe(el.value);
});

onUnmounted(() => {
  io?.disconnect();
});
</script>
