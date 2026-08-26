export const useMaintenanceMode = () => {
  const settingsStore = useSettingsStore();
  const { t } = useI18n();
  const { push } = useLocalizedPath();
  const retrySeconds = ref(30);
  let timerId: ReturnType<typeof setInterval> | null = null;

  const stopPolling = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  const checkStatus = async () => {
    const recovered = await settingsStore.checkMaintenanceStatus();
    if (recovered) {
      stopPolling();
      await push('/');
    }
    retrySeconds.value = 30;
  };

  const startPolling = () => {
    stopPolling();
    retrySeconds.value = 30;
    timerId = setInterval(async () => {
      retrySeconds.value -= 1;
      if (retrySeconds.value <= 0) {
        await checkStatus();
      }
    }, 1000);
  };

  onMounted(() => {
    if (settingsStore.isMaintenanceMode) startPolling();
  });

  onUnmounted(stopPolling);

  return {
    retrySeconds,
    contactInfo: computed(() => settingsStore.contactInfo),
    killScreenHtml: computed(() => settingsStore.killScreenHtml),
    checkStatus,
  };
};
