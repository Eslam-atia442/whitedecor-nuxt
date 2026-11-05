export const useMarqueeScroll = (speedPx = 0.55) => {
  const el = ref<HTMLElement | null>(null);
  const paused = ref(false);
  const isDragging = ref(false);
  let resumeTimer: ReturnType<typeof setTimeout> | null = null;
  let raf = 0;
  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  let moved = 0;

  const pause = () => {
    if (resumeTimer) clearTimeout(resumeTimer);
    paused.value = true;
  };

  const resume = (delayMs = 0) => {
    if (resumeTimer) clearTimeout(resumeTimer);
    if (delayMs > 0) {
      resumeTimer = setTimeout(() => {
        paused.value = false;
      }, delayMs);
    } else {
      paused.value = false;
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const track = el.value;
    if (!track) return;

    pause();
    isDown = true;
    moved = 0;
    startX = e.clientX;
    startScrollLeft = track.scrollLeft;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDown) return;
    const track = el.value;
    if (!track) return;

    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) {
      isDragging.value = true;
      moved = Math.abs(dx);
      track.scrollLeft = startScrollLeft - dx;
    }
  };

  const onPointerUp = () => {
    if (!isDown) return;
    isDown = false;
    setTimeout(() => {
      isDragging.value = false;
      moved = 0;
    }, 60);
    resume(2500);
  };

  const onClickCapture = (e: MouseEvent) => {
    if (moved > 8) {
      e.preventDefault();
      e.stopPropagation();
      moved = 0;
    }
  };

  const tick = () => {
    const track = el.value;
    if (track && !paused.value && !isDown) {
      if (track.scrollWidth > track.clientWidth) {
        const loopThreshold = track.scrollWidth / 2;
        track.scrollLeft += speedPx;
        if (track.scrollLeft >= loopThreshold) {
          track.scrollLeft -= loopThreshold;
        }
      }
    }
    raf = requestAnimationFrame(tick);
  };

  const run = () => {
    if (!import.meta.client) return;
    if (raf) cancelAnimationFrame(raf);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    raf = requestAnimationFrame(tick);
  };

  const halt = () => {
    if (raf) cancelAnimationFrame(raf);
    if (resumeTimer) clearTimeout(resumeTimer);
    raf = 0;
  };

  onMounted(run);
  onActivated(run);
  onDeactivated(halt);
  onUnmounted(halt);

  return {
    el,
    pause,
    resume,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave: onPointerUp,
    onPointerCancel: onPointerUp,
    onClickCapture,
    onTouchStart: onPointerDown,
    onTouchMove: onPointerMove,
    onTouchEnd: onPointerUp,
    onTouchCancel: onPointerUp,
  };
};
