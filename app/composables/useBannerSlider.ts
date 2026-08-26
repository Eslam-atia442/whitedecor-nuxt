// [FLUTTER CONCEPT]: PageView autoplay + dispose() on unmount

export const useBannerSlider = (count: MaybeRefOrGetter<number>, intervalMs = 5000) => {
  const index = ref(0);
  const paused = ref(false);
  let timer: ReturnType<typeof setInterval> | null = null;
  let startX = 0;

  const total = computed(() => toValue(count));

  const go = (nextIndex: number) => {
    if (total.value < 1) {
      index.value = 0;
      return;
    }
    index.value = (nextIndex + total.value) % total.value;
  };

  const next = () => go(index.value + 1);
  const prev = () => go(index.value - 1);

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const prefersReducedMotion = () => {
    if (!import.meta.client) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const start = () => {
    stop();
    if (total.value < 2 || prefersReducedMotion()) return;
    timer = setInterval(() => {
      if (!paused.value) next();
    }, intervalMs);
  };

  const onTouchStart = (event: TouchEvent) => {
    startX = event.changedTouches[0]?.clientX ?? 0;
    paused.value = true;
  };

  const onTouchEnd = (event: TouchEvent) => {
    const dx = (event.changedTouches[0]?.clientX ?? 0) - startX;
    paused.value = false;
    if (Math.abs(dx) < 40) return;
    dx > 0 ? prev() : next();
    start();
  };

  watch(total, (value) => {
    if (index.value >= value) index.value = 0;
    start();
  });

  onMounted(start);
  onActivated(start);
  onDeactivated(stop);
  onUnmounted(stop);

  return { index, paused, next, prev, go, start, stop, onTouchStart, onTouchEnd };
};
