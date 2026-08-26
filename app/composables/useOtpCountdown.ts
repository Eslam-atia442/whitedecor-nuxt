export const useOtpCountdown = (initialSeconds = 60) => {
  const remainingSeconds = ref(0);
  let timerId: ReturnType<typeof setInterval> | null = null;
  const storageKey = 'wd_otp_expiry';

  const isCountingDown = computed(() => remainingSeconds.value > 0);

  const formattedTime = computed(() => {
    const mins = Math.floor(remainingSeconds.value / 60);
    const secs = remainingSeconds.value % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  });

  const stopCountdown = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    if (import.meta.client) {
      sessionStorage.removeItem(storageKey);
    }
  };

  const tick = () => {
    if (import.meta.client) {
      const expiry = Number(sessionStorage.getItem(storageKey) || 0);
      const diff = Math.max(0, Math.ceil((expiry - Date.now()) / 1000));
      remainingSeconds.value = diff;
      if (diff <= 0) {
        stopCountdown();
      }
    } else if (remainingSeconds.value <= 1) {
      remainingSeconds.value = 0;
      stopCountdown();
    } else {
      remainingSeconds.value -= 1;
    }
  };

  const startCountdown = (duration = initialSeconds) => {
    stopCountdown();
    const expiryTimestamp = Date.now() + duration * 1000;
    if (import.meta.client) {
      sessionStorage.setItem(storageKey, String(expiryTimestamp));
    }
    remainingSeconds.value = duration;
    if (import.meta.client) {
      timerId = setInterval(tick, 1000);
    }
  };

  onMounted(() => {
    if (import.meta.client) {
      const storedExpiry = Number(sessionStorage.getItem(storageKey) || 0);
      if (storedExpiry > Date.now()) {
        const diff = Math.max(0, Math.ceil((storedExpiry - Date.now()) / 1000));
        remainingSeconds.value = diff;
        timerId = setInterval(tick, 1000);
      }
    }
  });

  onUnmounted(stopCountdown);

  return { remainingSeconds, isCountingDown, formattedTime, startCountdown, stopCountdown };
};
