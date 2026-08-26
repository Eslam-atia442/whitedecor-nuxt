export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    import('iconify-icon');
  }
});
