import type { MaybeRefOrGetter } from 'vue';
import { SOCIAL_LINKS } from '~/constants/social';
import { AREA_SERVED_COUNTRY, PRICE_CURRENCY } from '~/data/seo';
import type { ProductDto } from '~/types/product';

export type SchemaNode = Record<string, unknown>;

export const useSchemaIds = () => {
  const config = useRuntimeConfig();
  const siteUrl = ((config.public.siteUrl as string) || 'https://whitedecor.online').replace(/\/+$/, '');
  return {
    siteUrl,
    organization: `${siteUrl}/#organization`,
    website: `${siteUrl}/#website`,
    absolute: (path: string) => `${siteUrl}${path === '/' ? '' : path}`,
  };
};

export const useSiteSchemaNodes = () => {
  const { t, locale } = useI18n();
  const settingsStore = useSettingsStore();
  const ids = useSchemaIds();

  return computed(() => {
    const sameAs = [
      settingsStore.contactInfo.whatsappCleanNumber
        ? `https://wa.me/${settingsStore.contactInfo.whatsappCleanNumber}`
        : '',
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.facebook,
    ].filter(Boolean);

    return [
      {
        '@type': 'Organization',
        '@id': ids.organization,
        name: settingsStore.appName || 'White Decor',
        url: ids.siteUrl,
        email: settingsStore.contactInfo.email,
        telephone: settingsStore.contactInfo.phone,
        logo: {
          '@type': 'ImageObject',
          url: settingsStore.appLogo || `${ids.siteUrl}/icon-512.png`,
        },
        address: { '@type': 'PostalAddress', addressCountry: AREA_SERVED_COUNTRY },
        areaServed: { '@type': 'Country', name: AREA_SERVED_COUNTRY === 'EG' ? 'Egypt' : AREA_SERVED_COUNTRY },
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': ids.website,
        url: ids.siteUrl,
        name: settingsStore.appName || 'White Decor',
        description: t('home_seo_desc'),
        inLanguage: locale.value === 'ar' ? 'ar-EG' : 'en-EG',
        publisher: { '@id': ids.organization },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${ids.siteUrl}${locale.value === 'en' ? '/en' : ''}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ];
  });
};

export const useJsonLd = (nodes: MaybeRefOrGetter<SchemaNode[]>) => {
  useHead(() => ({
    script: [
      {
        type: 'application/ld+json',
        key: 'wd-jsonld',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': toValue(nodes),
        }),
      },
    ],
  }));
};

export const buildBreadcrumbNode = (
  crumbs: { name: string; path: string }[],
  ids: ReturnType<typeof useSchemaIds>,
  pageUrl: string,
): SchemaNode => ({
  '@type': 'BreadcrumbList',
  '@id': `${pageUrl}#breadcrumb`,
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: ids.absolute(crumb.path),
  })),
});

export const buildProductNode = (
  product: ProductDto,
  ids: ReturnType<typeof useSchemaIds>,
  extras: { url: string; price: number; inStock: boolean; images: string[] },
): SchemaNode => ({
  '@type': 'Product',
  '@id': `${extras.url}#product`,
  name: product.name,
  description: product.meta_description || product.short_description || product.description || '',
  image: extras.images,
  sku: product.sku || `WD-${product.id}`,
  url: extras.url,
  brand: product.brand?.name
    ? { '@type': 'Brand', name: product.brand.name }
    : { '@id': ids.organization },
  offers: {
    '@type': 'Offer',
    url: extras.url,
    price: String(extras.price),
    priceCurrency: PRICE_CURRENCY,
    availability: extras.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@id': ids.organization },
  },
});

export const useSiteJsonLd = () => {
  const siteNodes = useSiteSchemaNodes();
  useJsonLd(siteNodes);
};
