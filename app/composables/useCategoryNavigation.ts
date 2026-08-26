// composables/useCategoryNavigation.ts
// [FLUTTER CONCEPT]: Navigation controller managing route transitions and breadcrumbs

import type { CategoryBreadcrumb, CategoryDto } from '~/types/category';

export const useCategoryNavigation = (currentCategory?: Ref<CategoryDto | null | undefined>) => {
  const { t } = useI18n();
  const { push } = useLocalizedPath();

  const breadcrumbs = computed<CategoryBreadcrumb[]>(() => {
    const list: CategoryBreadcrumb[] = [
      { label: t('home', 'Home'), to: '/' },
      { label: t('categories', 'Categories'), to: '/categories' },
    ];

    const cat = currentCategory?.value;
    if (cat) {
      if (cat.parent) {
        list.push({
          label: cat.parent.name,
          to: `/categories/${cat.parent.slug}`,
        });
      }
      list.push({
        label: cat.name,
        to: `/categories/${cat.slug}`,
        isCurrent: true,
      });
    }

    return list;
  });

  const navigateToCategory = (category: CategoryDto) => {
    push(`/categories/${category.slug}`);
  };

  const navigateToCategoryProducts = (category: CategoryDto) => {
    push({ path: '/products', query: { category: category.slug } });
  };

  return {
    breadcrumbs,
    navigateToCategory,
    navigateToCategoryProducts,
  };
};
