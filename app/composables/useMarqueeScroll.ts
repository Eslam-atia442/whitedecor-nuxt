export const useMarqueeScroll = (speedPx = 0.55) => {
  const el = ref<HTMLElement | null>(null);
  const paused = ref(false);
  let holds = 0;
  let raf = 0;

  const pause = () => {
    holds += 1;
    paused.value = true;
  };

  const resume = () => {
    holds = Math.max(0, holds - 1);
    if (holds === 0) paused.value = false;
  };

  const tick = () => {
    const track = el.value;
    if (track && !paused.value) {
      const half = track.scrollWidth / 2;
      if (half > track.clientWidth) {
        track.scrollLeft += speedPx;
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half;
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
    raf = 0;
  };

  onMounted(run);
  onActivated(run);
  onDeactivated(halt);
  onUnmounted(halt);

  return { el, pause, resume };
};
