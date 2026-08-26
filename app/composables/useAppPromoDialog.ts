const PROMO_COOKIE = 'wd_app_promo_seen';
const PROMO_TTL = 60 * 60 * 24 * 60;
const REVEAL_DELAY_MS = 800;

export const useAppPromoDialog = () => {
  const settingsStore = useSettingsStore();
  const isOpen = ref(false);
  const seenCookie = useCookie<string | null>(PROMO_COOKIE, {
    maxAge: PROMO_TTL,
    sameSite: 'lax',
  });
  let revealTimer: ReturnType<typeof setTimeout> | null = null;

  const markSeen = () => {
    seenCookie.value = '1';
  };

  const close = () => {
    isOpen.value = false;
    markSeen();
  };

  const scheduleReveal = () => {
    if (seenCookie.value === '1') return;
    revealTimer = setTimeout(() => {
      if (seenCookie.value !== '1') isOpen.value = true;
    }, REVEAL_DELAY_MS);
  };

  onMounted(() => {
    if (settingsStore.isSplashActive) {
      watch(
        () => settingsStore.isSplashActive,
        (active) => {
          if (!active) scheduleReveal();
        },
        { once: true },
      );
      return;
    }
    scheduleReveal();
  });

  onUnmounted(() => {
    if (revealTimer) clearTimeout(revealTimer);
  });

  return { isOpen, close };
};
