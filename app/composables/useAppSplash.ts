export const useAppSplash = () => {
  const settingsStore = useSettingsStore();
  const minDurationMs = 1500;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const dismiss = () => {
    settingsStore.dismissSplash();
  };

  onMounted(async () => {
    if (!settingsStore.isSplashActive) return;
    const started = Date.now();
    if (!settingsStore.appSettings) {
      await settingsStore.fetchSettings();
    }
    const wait = Math.max(0, minDurationMs - (Date.now() - started));
    timeoutId = setTimeout(dismiss, wait);
  });

  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });

  return {
    isActive: computed(() => settingsStore.isSplashActive),
    dismiss,
  };
};
