// stores/brands.ts
// [FLUTTER CONCEPT]: Equivalent to Brands Repository & State in Flutter

import { defineStore } from 'pinia';
import type { BrandDto } from '~/types/brand';

export const useBrandsStore = defineStore('brands', () => {
  // --- STATE ---
  const brands = ref<BrandDto[]>([]);
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
  const errorMessage = ref<string | null>(null);
  const selectedBrand = ref<BrandDto | null>(null);
  const lastFetchedAt = ref<number | null>(null);

  // Cache TTL: 15 minutes (900,000 ms)
  const CACHE_TTL = 15 * 60 * 1000;

  // --- GETTERS ---
  const isLoading = computed(() => status.value === 'loading');
  const isSuccess = computed(() => status.value === 'success');
  const isError = computed(() => status.value === 'error');

  const brandMap = computed(() => {
    const map = new Map<number | string, BrandDto>();
    for (const b of brands.value) {
      map.set(b.id, b);
      if (b.name) map.set(b.name.toLowerCase(), b);
    }
    return map;
  });

  // --- ACTIONS ---
  const clearCache = () => {
    lastFetchedAt.value = null;
    brands.value = [];
  };

  const fetchBrands = async (force = false): Promise<BrandDto[]> => {
    const isCacheValid = lastFetchedAt.value && Date.now() - lastFetchedAt.value < CACHE_TTL;
    if (brands.value.length > 0 && isCacheValid && !force) {
      return brands.value;
    }

    status.value = 'loading';
    errorMessage.value = null;

    try {
      const api = useApi();
      const response = await api.get<{ data?: BrandDto[] | { data: BrandDto[] }; [key: string]: any }>('/api/v1/brands');

      const raw = response as any;
      const list: BrandDto[] = Array.isArray(raw?.data?.data)
        ? raw.data.data
        : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw)
            ? raw
            : [];

      brands.value = list;
      lastFetchedAt.value = Date.now();
      status.value = 'success';
      return brands.value;
    } catch (err: any) {
      status.value = 'error';
      errorMessage.value = err?.message || 'Failed to fetch brands';
      return [];
    }
  };

  const getBrandById = (id: number): BrandDto | null => {
    return brandMap.value.get(id) || null;
  };

  const selectBrand = (brand: BrandDto | null) => {
    selectedBrand.value = brand;
  };

  return {
    brands,
    status,
    errorMessage,
    selectedBrand,
    lastFetchedAt,
    isLoading,
    isSuccess,
    isError,
    brandMap,
    fetchBrands,
    getBrandById,
    selectBrand,
    clearCache,
  };
});
