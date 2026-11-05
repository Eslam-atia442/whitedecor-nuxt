export const useAppSplash = () => {
  const settingsStore = useSettingsStore();
  const route = useRoute();
  const minDurationMs = 1500;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const isFrozen = computed(() => {
    const splash = String(route.query.splash || '');
    return splash === 'freeze' || splash === 'dev' || route.query.freeze === '1';
  });

  const isPreviewMode = computed(() => {
    return isFrozen.value || route.query.splash === '1' || route.query.preview_splash === 'true';
  });

  const dismiss = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    settingsStore.dismissSplash();
  };

  const showSplash = () => {
    settingsStore.isSplashActive = true;
  };

  onMounted(async () => {
    if (isPreviewMode.value) {
      settingsStore.isSplashActive = true;
    }

    if (!settingsStore.isSplashActive) return;

    const started = Date.now();
    if (!settingsStore.appSettings) {
      await settingsStore.fetchSettings();
    }

    if (isFrozen.value) {
      return;
    }

    const wait = Math.max(0, minDurationMs - (Date.now() - started));
    timeoutId = setTimeout(dismiss, isPreviewMode.value ? 4000 : wait);
  });

  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });

  return {
    isActive: computed(() => settingsStore.isSplashActive),
    isFrozen,
    isPreviewMode,
    dismiss,
    showSplash,
  };
};
