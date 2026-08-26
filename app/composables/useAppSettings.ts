export const useAppSettings = () => {
  const settingsStore = useSettingsStore();
  const config = useRuntimeConfig();

  useHead(() => {
    const verification = config.public.googleSiteVerification as string | undefined;
    return {
      link: [
        { rel: 'icon', type: 'image/png', href: settingsStore.favIcon || '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'theme-color', content: '#0A0E29' },
        ...(verification ? [{ name: 'google-site-verification', content: verification }] : []),
      ],
    };
  });

  useSiteJsonLd();

  return {
    appName: computed(() => settingsStore.appName),
    appLogo: computed(() => settingsStore.appLogo),
    contactInfo: computed(() => settingsStore.contactInfo),
  };
};
