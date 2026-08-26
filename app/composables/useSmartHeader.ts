export const useSmartHeader = () => {
  const isScrolled = ref(false);

  const handleScroll = () => {
    if (!import.meta.client) return;
    isScrolled.value = window.scrollY > 24;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return { isScrolled };
};
