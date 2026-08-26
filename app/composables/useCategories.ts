// composables/useCategories.ts
// [FLUTTER CONCEPT]: Business logic controller bridging UI components with Pinia Store

import type { CategoryDto } from '~/types/category';

export const useCategories = () => {
  const store = useCategoriesStore();
  const searchKeyword = ref('');
  const activeParentId = ref<number | null>(null);

  const filteredCategories = computed(() => {
    const query = searchKeyword.value.trim().toLowerCase();
    const source = store.categories;
    if (!query) return source;

    return source.filter((cat) => {
      const matchName = cat.name.toLowerCase().includes(query);
      const matchChildren = cat.children?.some((child) => child.name.toLowerCase().includes(query));
      return matchName || matchChildren;
    });
  });

  const clearSearch = () => {
    searchKeyword.value = '';
  };

  const setActiveParent = (id: number | null) => {
    activeParentId.value = id;
  };

  return {
    categories: computed(() => store.categories),
    rootCategories: computed(() => store.rootCategories),
    filteredCategories,
    searchKeyword,
    isLoading: computed(() => store.isLoading),
    isError: computed(() => store.isError),
    errorMessage: computed(() => store.errorMessage),
    fetchCategories: store.fetchCategories,
    getCategoryBySlug: store.getCategoryBySlug,
    getCategoryById: store.getCategoryById,
    clearSearch,
    setActiveParent,
  };
};
