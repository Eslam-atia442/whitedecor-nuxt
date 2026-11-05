// [FLUTTER CONCEPT]: Drag-to-scroll desktop mouse physics for horizontal list views

export const useDragScroll = (targetRef?: Ref<HTMLElement | null>) => {
  const el = targetRef || ref<HTMLElement | null>(null);
  const isDragging = ref(false);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let moved = 0;

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const container = el.value;
    if (!container) return;

    isDown = true;
    moved = 0;
    startX = e.clientX;
    scrollLeft = container.scrollLeft;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDown) return;
    const container = el.value;
    if (!container) return;

    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) {
      isDragging.value = true;
      moved = Math.abs(dx);
      // Invert dx to drag naturally (drag left moves content left)
      container.scrollLeft = scrollLeft - dx;
    }
  };

  const endDrag = () => {
    if (!isDown) return;
    isDown = false;
    setTimeout(() => {
      isDragging.value = false;
      moved = 0;
    }, 60);
  };

  const onClickCapture = (e: MouseEvent) => {
    if (moved > 8) {
      e.preventDefault();
      e.stopPropagation();
      moved = 0;
    }
  };

  return {
    el,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerLeave: endDrag,
    onPointerCancel: endDrag,
    onClickCapture,
  };
};

