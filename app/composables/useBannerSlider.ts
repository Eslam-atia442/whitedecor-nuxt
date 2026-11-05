// [FLUTTER CONCEPT]: PageView autoplay + dispose() with mouse drag & touch swiping

export const useBannerSlider = (count: MaybeRefOrGetter<number>, intervalMs = 5000) => {
  const index = ref(0);
  const paused = ref(false);
  const isDragging = ref(false);
  let timer: ReturnType<typeof setInterval> | null = null;
  let startX = 0;
  let startY = 0;
  let isDown = false;
  let moved = 0;

  const total = computed(() => toValue(count));

  const isRtl = () => {
    if (!import.meta.client) return false;
    return document.documentElement.dir === 'rtl' || document.body.dir === 'rtl';
  };

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

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startX = e.clientX;
    startY = e.clientY;
    isDown = true;
    moved = 0;
    paused.value = true;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDown) return;
    paused.value = true;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 6) {
      isDragging.value = true;
      moved = Math.abs(dx);
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    if (!isDown) return;
    isDown = false;
    paused.value = false;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= 30) {
      if (isRtl()) {
        dx > 0 ? next() : prev();
      } else {
        dx < 0 ? next() : prev();
      }
    }
    setTimeout(() => {
      isDragging.value = false;
      moved = 0;
    }, 60);
    start();
  };

  const onPointerCancel = () => {
    isDown = false;
    isDragging.value = false;
    paused.value = false;
    start();
  };

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0] || e.changedTouches[0];
    if (!touch) return;
    startX = touch.clientX;
    startY = touch.clientY;
    isDown = true;
    moved = 0;
    paused.value = true;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDown) return;
    paused.value = true;
    const touch = e.touches[0] || e.changedTouches[0];
    if (touch) {
      moved = Math.abs(touch.clientX - startX);
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!isDown) return;
    isDown = false;
    paused.value = false;
    const touch = e.changedTouches[0] || e.touches[0];
    if (touch) {
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= 30) {
        if (isRtl()) {
          dx > 0 ? next() : prev();
        } else {
          dx < 0 ? next() : prev();
        }
      }
    }
    setTimeout(() => {
      isDragging.value = false;
      moved = 0;
    }, 60);
    start();
  };

  const onTouchCancel = () => {
    isDown = false;
    isDragging.value = false;
    paused.value = false;
    start();
  };

  const onClickCapture = (e: MouseEvent) => {
    if (moved > 8) {
      e.preventDefault();
      e.stopPropagation();
      moved = 0;
    }
  };

  watch(total, (value) => {
    if (index.value >= value) index.value = 0;
    start();
  });

  onMounted(start);
  onActivated(start);
  onDeactivated(stop);
  onUnmounted(stop);

  return {
    index,
    paused,
    isDragging,
    next,
    prev,
    go,
    start,
    stop,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClickCapture,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
  };
};
