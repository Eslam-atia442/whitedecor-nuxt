import { OG_HEIGHT, OG_WIDTH } from '~/data/seo';
import type { MaybeRefOrGetter } from 'vue';

export interface PublicSeoOptions {
  title?: MaybeRefOrGetter<string | undefined>;
  description?: MaybeRefOrGetter<string | undefined>;
  image?: MaybeRefOrGetter<string | undefined>;
  path?: MaybeRefOrGetter<string | undefined>;
  type?: MaybeRefOrGetter<'website' | 'article' | 'product' | undefined>;
  keywords?: MaybeRefOrGetter<string[] | undefined>;
  noIndex?: MaybeRefOrGetter<boolean | undefined>;
}

const withBrand = (title: string, siteName: string) => {
  const lower = (title || '').toLowerCase();
  const brand = (siteName || '').toLowerCase();
  if (!title) return siteName;
  if (brand && lower.includes(brand)) return title;
  if (lower.includes('white decor') || lower.includes('whitedecor') || lower.includes('وايت ديكور')) return title;
  return `${title} | ${siteName}`;
};

export const usePublicSeo = (options: PublicSeoOptions = {}) => {
  const { t, locale } = useI18n();
  const config = useRuntimeConfig();
  const route = useRoute();
  const settingsStore = useSettingsStore();

  const siteUrl = (config.public.siteUrl as string) || 'https://whitedecor.online';
  const siteName = computed(() => settingsStore.appName || t('app_name'));
  const isArabic = computed(() => locale.value === 'ar');

  const rawTitle = computed(() => toValue(options.title) || '');
  const title = computed(() => withBrand(rawTitle.value, siteName.value));
  const description = computed(() => toValue(options.description) || t('home_seo_desc'));
  const image = computed(() => {
    const custom = toValue(options.image);
    if (custom) return custom;
    return `${siteUrl}${isArabic.value ? '/og-cover-ar.png' : '/og-cover.png'}`;
  });
  const canonical = computed(() => {
    const path = toValue(options.path) || route.path;
    const normalized = path.startsWith('http') ? path : `${siteUrl}${path === '/' ? '' : path}`;
    return normalized;
  });
  const noIndex = computed(() => Boolean(toValue(options.noIndex)));
  const ogType = computed(() => {
    const next = toValue(options.type) || 'website';
    return next === 'product' ? 'website' : next;
  });
  const keywords = computed(() => (toValue(options.keywords) || []).join(', '));

  useSeoMeta({
    title,
    description,
    applicationName: siteName,
    robots: computed(() =>
      noIndex.value
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ),
    ogSiteName: siteName,
    ogTitle: title,
    ogDescription: description,
    ogType,
    ogUrl: canonical,
    ogImage: image,
    ogImageAlt: siteName,
    ogImageWidth: OG_WIDTH,
    ogImageHeight: OG_HEIGHT,
    ogLocale: computed(() => (isArabic.value ? 'ar_EG' : 'en_EG')),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  });

  useHead(() => ({
    htmlAttrs: {
      lang: isArabic.value ? 'ar-EG' : 'en-EG',
      dir: isArabic.value ? 'rtl' : 'ltr',
    },
    meta: [
      ...(keywords.value ? [{ name: 'keywords', content: keywords.value }] : []),
      { property: 'og:locale:alternate', content: isArabic.value ? 'en_EG' : 'ar_EG' },
    ],
    link: [{ rel: 'canonical', href: canonical.value }],
  }));

  return { title, description, canonical, image, siteUrl, siteName };
};
