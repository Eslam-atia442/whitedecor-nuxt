// stores/categories.ts
// [FLUTTER CONCEPT]: Equivalent to CategoriesCubit + CategoriesState in Flutter

import { defineStore } from 'pinia';
import type { CategoryDto, CategoryQueryParams } from '~/types/category';

export const useCategoriesStore = defineStore('categories', () => {
  // --- STATE ---
  const categories = ref<CategoryDto[]>([]);
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const errorMessage = ref<string | null>(null);
  const selectedCategory = ref<CategoryDto | null>(null);
  const lastFetchedAt = ref<number | null>(null);

  // --- GETTERS ---
  const isPending = computed(() => status.value === 'idle' || status.value === 'loading');
  const isLoading = computed(() => status.value === 'loading');
  const isSuccess = computed(() => status.value === 'success');
  const isError = computed(() => status.value === 'error');

  const rootCategories = computed(() => {
    return categories.value.filter((cat) => !cat.parent_id && !cat.parent);
  });

  const categoryMap = computed(() => {
    const map = new Map<string | number, CategoryDto>();
    const register = (cats: CategoryDto[]) => {
      for (const c of cats) {
        map.set(c.id, c);
        if (c.slug) map.set(c.slug, c);
        if (c.children && c.children.length > 0) {
          register(c.children);
        }
      }
    };
    register(categories.value);
    return map;
  });

  // --- ACTIONS ---
  const beginFetch = () => {
    categories.value = [];
    selectedCategory.value = null;
    lastFetchedAt.value = null;
    errorMessage.value = null;
    status.value = 'loading';
  };

  const clearCache = () => {
    beginFetch();
    status.value = 'idle';
  };

  const fetchCategories = async (params: CategoryQueryParams = {}, _force = false): Promise<CategoryDto[]> => {
    beginFetch();

    try {
      const api = useApi();
      const response = await api.get<any>('/api/v1/categories', {
        params: {
          roots: params.roots ?? 1,
          embed: params.embed ?? 'children',
          ...params,
        },
      });

      const raw = response as any;
      const list: CategoryDto[] = Array.isArray(raw?.data?.data)
        ? raw.data.data
        : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw)
            ? raw
            : [];

      categories.value = list;
      lastFetchedAt.value = Date.now();
      status.value = 'success';
      return categories.value;
    } catch (err: any) {
      status.value = 'error';
      errorMessage.value = err?.message || 'Failed to fetch categories';
      throw err;
    }
  };

  const getCategoryBySlug = (slug: string): CategoryDto | null => {
    return categoryMap.value.get(slug) || null;
  };

  const getCategoryById = (id: number): CategoryDto | null => {
    return categoryMap.value.get(id) || null;
  };

  const selectCategory = (category: CategoryDto | null) => {
    selectedCategory.value = category;
  };

  return {
    categories,
    status,
    errorMessage,
    selectedCategory,
    lastFetchedAt,
    isPending,
    isLoading,
    isSuccess,
    isError,
    rootCategories,
    categoryMap,
    fetchCategories,
    getCategoryBySlug,
    getCategoryById,
    selectCategory,
    beginFetch,
    clearCache,
  };
});
