import { productPath, isNumericParam } from '~/utils/catalog_paths';
import { buildBreadcrumbNode, buildProductNode, useJsonLd, useSchemaIds, useSiteSchemaNodes } from '~/composables/useJsonLd';

export const useProductPage = async () => {
  const route = useRoute();
  const { t, locale } = useI18n();
  const localePath = useLocalePath();
  const store = useProductDetailStore();
  const slug = computed(() => String(route.params.slug || ''));
  const seoApi = useCatalogSeo();
  const ids = useSchemaIds();
  const siteNodes = useSiteSchemaNodes();
  const revealed = ref(false);
  let revealFrame = 0;

  const productQuery = useAsyncData(
    () => `product-${slug.value}-${locale.value}`,
    async () => {
      try {
        return await store.fetchProductDetail(slug.value);
      } catch {
        return null;
      }
    },
    { lazy: true, watch: [slug, locale] },
  );

  const current = computed(() => {
    const product = productQuery.data.value || store.product;
    if (!product) return null;
    const key = slug.value;
    if (String(product.slug) === key || String(product.id) === key) return product;
    return null;
  });

  const isLoading = computed(() => productQuery.pending.value || store.isLoading || (!current.value && !store.isError));
  const isError = computed(() => !isLoading.value && (store.isError || !current.value));

  const seo = seoApi.forProduct(current);
  const pageUrl = computed(() => ids.absolute(localePath(productPath(current.value || { id: slug.value }))));

  const crumbs = computed(() => {
    const product = current.value;
    const list = [
      { name: t('home'), path: localePath('/') },
      { name: t('all_products'), path: localePath('/products') },
    ];
    if (product?.category?.slug) {
      list.push({ name: product.category.name, path: localePath(`/categories/${product.category.slug}`) });
    }
    list.push({ name: product?.name || t('all_products'), path: localePath(productPath(product || { id: slug.value })) });
    return list;
  });

  usePublicSeo({
    title: seo.title,
    description: seo.description,
    image: seo.image,
    keywords: seo.keywords,
    type: 'product',
    path: computed(() => localePath(productPath(current.value || { id: slug.value }))),
  });

  useJsonLd(computed(() => {
    const product = current.value;
    if (!product) return siteNodes.value;
    return [
      ...siteNodes.value,
      buildBreadcrumbNode(crumbs.value, ids, pageUrl.value),
      buildProductNode(product, ids, {
        url: pageUrl.value,
        price: store.effectivePriceNumeric,
        inStock: store.isInStock,
        images: store.allImages,
      }),
    ];
  }));

  const redirectToSlug = async () => {
    const product = current.value;
    if (!product?.slug || !isNumericParam(slug.value) || product.slug === slug.value) return;
    await navigateTo(localePath(productPath(product)), { redirectCode: 301, replace: true });
  };

  const playReveal = () => {
    if (!import.meta.client) {
      revealed.value = true;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealed.value = true;
      return;
    }
    revealed.value = false;
    cancelAnimationFrame(revealFrame);
    revealFrame = requestAnimationFrame(() => {
      revealed.value = true;
    });
  };

  watch(current, async (product) => {
    if (!product) {
      revealed.value = false;
      return;
    }
    await redirectToSlug();
    await nextTick();
    playReveal();
  });

  onUnmounted(() => cancelAnimationFrame(revealFrame));

  if (import.meta.server) {
    await productQuery;
    if (!current.value) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' });
    }
    await redirectToSlug();
    revealed.value = true;
  }

  const retry = async () => {
    store.clearCache();
    await productQuery.refresh();
  };

  return {
    product: current,
    isLoading,
    isError,
    revealed,
    retry,
  };
};
