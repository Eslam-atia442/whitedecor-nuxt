<template>
  <CategoryPageSkeleton v-if="isLoadingCategory && !category" />

  <div v-else-if="category" class="space-y-8">
    <UiBreadcrumbs :items="breadcrumbs" />
    <CategoryHeroBanner :category="category" />
    <CategorySubcategoryPills
      v-if="category.children && category.children.length > 0"
      :subcategories="category.children"
      :selected-slug="selectedSubcategory"
      @select="onSelectSubcategory"
    />

    <div class="space-y-6 pt-2">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-ink">{{ $t('all_products') }}</h2>
        <span class="text-xs text-ink-secondary">
          {{ $t('items_count', { count: totalProducts }) }}
        </span>
      </div>

      <ProductSkeletonGrid v-if="isLoading" />
      <UiEmptyState
        v-else-if="!products.length"
        icon="inventory_2"
        :title="$t('no_products_found')"
        :description="$t('no_products_filter_subtitle')"
      />
      <ProductGrid
        v-else
        :products="products"
        :has-more="hasMore"
        :is-loading-more="isLoadingMore"
        @load-more="loadMore"
      />
      <SeoFaqList />
    </div>
  </div>

  <UiEmptyState
    v-else
    icon="category"
    :title="$t('no_products_found')"
    :action-label="$t('categories')"
    @action="push('/categories')"
  />
</template>

<script setup lang="ts">
definePageMeta({ keepalive: true });

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const { locale } = useI18n();
const { push } = useLocalizedPath();

const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();
const { products, isLoading, isLoadingMore, hasMore, totalProducts, loadMore } = useProducts();

const isLoadingCategory = computed(() => categoriesStore.isLoading);
const category = computed(() => categoriesStore.getCategoryBySlug(slug.value));
const selectedSubcategory = ref<string | undefined>(undefined);
const { breadcrumbs } = useCategoryNavigation(category);

const loadCategoryData = async () => {
  if (!categoriesStore.categories.length) {
    await categoriesStore.fetchCategories({ roots: 1, embed: 'children' });
  }
  const cat = categoriesStore.getCategoryBySlug(slug.value);
  await productsStore.fetchProducts({
    category_slug: slug.value,
    category_id: cat?.id,
    page: 1,
  });
  return true;
};

await useAsyncData(
  () => `category-${slug.value}-${locale.value}`,
  loadCategoryData,
  { watch: [locale, slug] }
);

if (categoriesStore.rootCategories.length > 0 && !category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' });
}

watch(slug, () => {
  selectedSubcategory.value = undefined;
  loadCategoryData();
});

const onSelectSubcategory = (subSlug?: string) => {
  selectedSubcategory.value = subSlug;
  const targetSlug = subSlug || slug.value;
  const targetCat = categoriesStore.getCategoryBySlug(targetSlug);
  productsStore.fetchProducts({
    category_slug: targetSlug,
    category_id: targetCat?.id,
    page: 1,
  });
};

const categorySeo = useCatalogSeo().forCategory(category);
useSeo({
  title: categorySeo.title,
  description: categorySeo.description,
});
</script>
