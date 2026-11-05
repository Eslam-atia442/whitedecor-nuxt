import { defineStore } from 'pinia';
import { API_ENDPOINTS } from '~/constants/api_endpoints';
import type { ApiResponse, SettingsRawItem } from '~/types/api';
import type { AppSettingsDto, ContactInfo, CountryDto, ThemeMode } from '~/types/settings';

const parseRawSettings = (items: SettingsRawItem[]): AppSettingsDto => {
  const map: Record<string, string> = {};
  items.forEach((item) => {
    if (item.key) map[item.key] = item.value || '';
  });
  return {
    appNameAr: map.name_ar || '',
    appNameEn: map.name_en || '',
    appLogoAr: map.logo_ar || '',
    appLogoEn: map.logo_en || '',
    email: map.email || '',
    whatsapp: map.whatsapp || '',
    phone: map.phone || '',
    favIcon: map.fav_icon || '',
    loginBackground: map.login_background || '',
    noDataIcon: map.no_data_icon || '',
    defaultUser: map.default_user || '',
    firebaseKey: map.firebase_key,
    firebaseSenderId: map.firebase_sender_id,
    googlePlaces: map.google_places,
    isKilledScreen: map.is_killed_screen || '0',
    termsConditionsEn: map.terms_conditions_en || '',
    termsConditionsAr: map.terms_conditions_ar || '',
    aboutUsEn: map.about_us_en || '',
    aboutUsAr: map.about_us_ar || '',
    killScreenTextEn: map.kill_screen_text_en || '',
    killScreenTextAr: map.kill_screen_text_ar || '',
    privacyPolicyEn: map.privacy_policy_en || '',
    privacyPolicyAr: map.privacy_policy_ar || '',
    seoMetaTitleAr: map.seo_meta_title_ar || '',
    seoMetaTitleEn: map.seo_meta_title_en || '',
    seoMetaDescriptionAr: map.seo_meta_description_ar || '',
    seoMetaDescriptionEn: map.seo_meta_description_en || '',
    seoMetaKeywordsAr: map.seo_meta_keywords_ar || '',
    seoMetaKeywordsEn: map.seo_meta_keywords_en || '',
  };
};

const mapCountry = (raw: Record<string, unknown>): CountryDto => ({
  id: String(raw.id ?? ''),
  name: String(raw.name ?? ''),
  countryCode: String(raw.country_code ?? raw.code ?? raw.dial_code ?? '+20'),
  flag: String(raw.flag ?? raw.flag_url ?? ''),
});

export const useSettingsStore = defineStore('settings', () => {
  const appSettings = ref<AppSettingsDto | null>(null);
  const countries = ref<CountryDto[]>([]);
  const selectedCountry = ref<CountryDto | null>(null);
  const isSplashActive = ref(true);
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const lastCheckedMaintenance = ref(0);

  const colorMode = useColorMode();
  const countryCookie = useCookie<string>('wd_selected_country', { default: () => '66' });
  const splashCookie = useCookie<string | null>('wd_splash_session');

  const currentLocale = computed(() => {
    const nuxtApp = useNuxtApp();
    return (nuxtApp.$i18n?.locale?.value || 'ar') as 'ar' | 'en';
  });

  const isMaintenanceMode = computed(() => appSettings.value?.isKilledScreen === '1');
  const appName = computed(
    () => (currentLocale.value === 'ar' ? appSettings.value?.appNameAr : appSettings.value?.appNameEn) || 'White Decor',
  );
  const appLogo = computed(
    () => (currentLocale.value === 'ar' ? appSettings.value?.appLogoAr : appSettings.value?.appLogoEn) || '/images/logo.png',
  );
  const favIcon = computed(() => {
    const fav = appSettings.value?.favIcon || '';
    if (/^https?:\/\//.test(fav)) return fav;
    return '/favicon-32x32.png';
  });
  const seoTitleAr = computed(() => appSettings.value?.seoMetaTitleAr || '');
  const seoTitleEn = computed(() => appSettings.value?.seoMetaTitleEn || '');
  const seoDescriptionAr = computed(() => appSettings.value?.seoMetaDescriptionAr || '');
  const seoDescriptionEn = computed(() => appSettings.value?.seoMetaDescriptionEn || '');
  const seoKeywordsAr = computed(() => appSettings.value?.seoMetaKeywordsAr || '');
  const seoKeywordsEn = computed(() => appSettings.value?.seoMetaKeywordsEn || '');
  const aboutHtml = computed(() => (currentLocale.value === 'ar' ? appSettings.value?.aboutUsAr : appSettings.value?.aboutUsEn) || '');
  const termsHtml = computed(() => (currentLocale.value === 'ar' ? appSettings.value?.termsConditionsAr : appSettings.value?.termsConditionsEn) || '');
  const privacyHtml = computed(() => (currentLocale.value === 'ar' ? appSettings.value?.privacyPolicyAr : appSettings.value?.privacyPolicyEn) || '');
  const killScreenHtml = computed(() => (currentLocale.value === 'ar' ? appSettings.value?.killScreenTextAr : appSettings.value?.killScreenTextEn) || '');
  const defaultUserAvatar = computed(() => appSettings.value?.defaultUser || '/images/default_avatar.png');
  const selectedCountryCode = computed(() => selectedCountry.value?.countryCode || '+20');

  const contactInfo = computed<ContactInfo>(() => {
    const rawWa = appSettings.value?.whatsapp || '+201000933972';
    const phone = appSettings.value?.phone || '+201000933972';
    return {
      phone,
      whatsapp: rawWa,
      whatsappCleanNumber: rawWa.replace(/[^0-9]/g, ''),
      email: appSettings.value?.email || 'contact@whitedecor.com',
      googlePlaces: appSettings.value?.googlePlaces,
      formattedDisplayPhone: phone,
    };
  });

  const syncSelectedCountry = () => {
    if (!countries.value.length) return;
    const found = countries.value.find((c) => c.id === countryCookie.value) || countries.value[0];
    selectedCountry.value = found || null;
  };

  const fetchSettings = async (force = false) => {
    if (appSettings.value && !force) return;
    status.value = 'loading';
    try {
      const api = useApi();
      const res = await api.get<ApiResponse<SettingsRawItem[]> | SettingsRawItem[]>(API_ENDPOINTS.SYSTEM.SETTINGS);
      const items = Array.isArray(res) ? res : (res as ApiResponse<SettingsRawItem[]>).data;
      appSettings.value = parseRawSettings(items);
      status.value = 'success';
    } catch {
      status.value = 'error';
    }
  };

  const fetchCountries = async () => {
    try {
      const api = useApi();
      const res = await api.get<ApiResponse<Record<string, unknown>[]> | Record<string, unknown>[]>(
        API_ENDPOINTS.CATALOG.COUNTRIES,
      );
      const raw = Array.isArray(res) ? res : (res as ApiResponse<Record<string, unknown>[]>).data;
      countries.value = raw.map(mapCountry);
      syncSelectedCountry();
    } catch {
      countries.value = [
        { id: '66', name: 'مصر', countryCode: '+20', flag: 'https://flagsapi.com/EG/shiny/64.png' },
      ];
      syncSelectedCountry();
    }
  };

  const initSettings = async () => {
    await Promise.allSettled([fetchSettings(), fetchCountries()]);
    try {
      const route = useRoute();
      const splash = String(route.query.splash || '');
      if (splash === '1' || splash === 'freeze' || splash === 'dev' || route.query.freeze === '1') {
        isSplashActive.value = true;
        return;
      }
    } catch {
      // route not ready
    }
    if (splashCookie.value === 'seen') {
      isSplashActive.value = false;
    }
  };

  const resetSplash = () => {
    splashCookie.value = null;
    isSplashActive.value = true;
  };

  const selectCountry = (country: CountryDto) => {
    selectedCountry.value = country;
    countryCookie.value = country.id;
  };

  const setTheme = (theme: ThemeMode) => {
    colorMode.preference = theme === 'system' ? 'system' : theme;
  };

  const dismissSplash = () => {
    isSplashActive.value = false;
    splashCookie.value = 'seen';
  };

  const checkMaintenanceStatus = async () => {
    lastCheckedMaintenance.value = Date.now();
    await fetchSettings(true);
    return !isMaintenanceMode.value;
  };

  return {
    appSettings,
    countries,
    selectedCountry,
    isSplashActive,
    status,
    lastCheckedMaintenance,
    isMaintenanceMode,
    appName,
    appLogo,
    favIcon,
    seoTitleAr,
    seoTitleEn,
    seoDescriptionAr,
    seoDescriptionEn,
    seoKeywordsAr,
    seoKeywordsEn,
    contactInfo,
    aboutHtml,
    termsHtml,
    privacyHtml,
    killScreenHtml,
    defaultUserAvatar,
    selectedCountryCode,
    initSettings,
    fetchSettings,
    fetchCountries,
    selectCountry,
    setTheme,
    dismissSplash,
    resetSplash,
    checkMaintenanceStatus,
  };
});
