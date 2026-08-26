import type { MaybeRefOrGetter } from 'vue';
import { WEAK_SEO_TITLES } from '~/data/seo';
import { splitKeywords } from '~/utils/catalog_paths';
import { stripHtml } from '~/utils/unwrap_list';
import type { ProductDto } from '~/types/product';
import type { CategoryDto } from '~/types/category';

const usable = (value?: string | null) => {
  const text = (value || '').trim();
  return text && !WEAK_SEO_TITLES.has(text) ? text : '';
};

export const useCatalogSeo = () => {
  const { t, locale } = useI18n();
  const settingsStore = useSettingsStore();

  const storeTitle = computed(() =>
    usable(locale.value === 'ar' ? settingsStore.seoTitleAr : settingsStore.seoTitleEn),
  );
  const storeDescription = computed(() =>
    usable(locale.value === 'ar' ? settingsStore.seoDescriptionAr : settingsStore.seoDescriptionEn),
  );

  const homeTitle = computed(() => storeTitle.value || t('home_seo_title'));
  const homeDescription = computed(() => storeDescription.value || t('home_seo_desc'));

  const forProduct = (product: MaybeRefOrGetter<ProductDto | null | undefined>) => {
    const current = computed(() => toValue(product));
    const title = computed(
      () =>
        usable(current.value?.meta_title) ||
        current.value?.name ||
        t('all_products'),
    );
    const description = computed(
      () =>
        usable(current.value?.meta_description) ||
        stripHtml(current.value?.short_description || current.value?.description || '', 160) ||
        homeDescription.value,
    );
    const keywords = computed(() => splitKeywords(current.value?.meta_keywords));
    const image = computed(() => current.value?.image || undefined);
    return { title, description, keywords, image };
  };

  const forCategory = (category: MaybeRefOrGetter<CategoryDto | null | undefined>) => {
    const current = computed(() => toValue(category));
    const title = computed(() => current.value?.name || t('categories'));
    const description = computed(
      () =>
        stripHtml(current.value?.description || '', 160) ||
        t('categories_explorer_subtitle'),
    );
    return { title, description };
  };

  return { homeTitle, homeDescription, forProduct, forCategory };
};
