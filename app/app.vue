<template>
  <div class="min-h-dvh bg-surface text-ink antialiased" :dir="currentDir">
    <NuxtLayout>
      <NuxtPage :keepalive="CATALOG_KEEPALIVE" />
    </NuxtLayout>
    <ClientOnly>
      <Toaster position="top-center" :close-button="true" :rich-colors="true" :dir="currentDir" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import { CATALOG_KEEPALIVE } from '~/constants/keepalive';

const { locale } = useI18n();
const route = useRoute();
const { unprefix } = useLocalizedPath();
const currentDir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'));

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === 'ar' ? 'ar-EG' : 'en-US',
    dir: currentDir.value,
  },
}));

watch(
  locale,
  async (newLocale, oldLocale) => {
    if (import.meta.client) {
      const dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', newLocale);
      document.body.dir = dir;

      if (oldLocale && newLocale !== oldLocale) {
        const categoriesStore = useCategoriesStore();
        const brandsStore = useBrandsStore();
        const productsStore = useProductsStore();
        const productDetailStore = useProductDetailStore();
        const homeStore = useHomeStore();

        // Immediately clear caches and show shimmer skeletons
        categoriesStore.clearCache();
        brandsStore.clearCache();
        productsStore.clearCache();
        productDetailStore.clearCache();
        homeStore.clearCache();

        await Promise.allSettled([
          categoriesStore.fetchCategories({ roots: 1, embed: 'children' }, true),
          brandsStore.fetchBrands(true),
        ]);

        const path = unprefix(route.path);
        if (path.startsWith('/products/') && route.params.slug) {
          productDetailStore.fetchProductDetail(route.params.slug as string);
        } else if (path.startsWith('/categories/') && route.params.slug) {
          const cat = categoriesStore.getCategoryBySlug(route.params.slug as string);
          productsStore.fetchProducts({
            category_slug: route.params.slug as string,
            category_id: cat?.id,
            page: 1,
          });
        } else if (path === '/products') {
          productsStore.fetchProducts(undefined, false);
        } else if (path === '/') {
          homeStore.fetchHomeData(true);
        }
      }
    }
  },
  { immediate: true },
);

useAppSettings();
const settingsStore = useSettingsStore();

await useAsyncData('app-settings', () => settingsStore.initSettings());
</script>
