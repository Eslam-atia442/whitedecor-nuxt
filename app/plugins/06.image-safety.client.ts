export default defineNuxtPlugin(() => {
  if (!import.meta.client) return;

  // Root-level safety net for any image failing anywhere on the website
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target as HTMLElement | null;
      if (target && target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        img.dataset.hasError = 'true';
        img.classList.add('img-load-error');
      }
    },
    true // Capture phase to intercept image errors before they bubble
  );
});

