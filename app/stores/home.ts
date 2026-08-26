// stores/home.ts
// [FLUTTER CONCEPT]: Home Cubit aggregating sliders + curated product lists

import { defineStore } from 'pinia';
import { API_ENDPOINTS } from '~/constants/api_endpoints';
import { MOCK_SLIDERS } from '~/constants/mock_sliders';
import type { HomeStatus, SliderDto } from '~/types/home';
import type { ProductDto } from '~/types/product';
import { isUsableSlider, unwrapList } from '~/utils/unwrap_list';

export const useHomeStore = defineStore('home', () => {
  const sliders = ref<SliderDto[]>([]);
  const newest = ref<ProductDto[]>([]);
  const discounted = ref<ProductDto[]>([]);
  const topSold = ref<ProductDto[]>([]);
  const status = ref<HomeStatus>('idle');
  const errorMessage = ref<string | null>(null);
  const lastFetchedAt = ref<number | null>(null);
  const CACHE_TTL = 5 * 60 * 1000;

  const isLoading = computed(() => status.value === 'loading');
  const isError = computed(() => status.value === 'error');
  const isSuccess = computed(() => status.value === 'success');
  const hasProducts = computed(
    () => newest.value.length + discounted.value.length + topSold.value.length > 0,
  );
  const isEmpty = computed(() => isSuccess.value && !hasProducts.value);

  const resolveSliders = (raw: SliderDto[]): SliderDto[] => {
    const usable = raw.filter(isUsableSlider);
    return usable.length > 0 ? usable : MOCK_SLIDERS;
  };

  const fetchList = async <T>(endpoint: string, params: Record<string, unknown> = {}): Promise<T[]> => {
    const api = useApi();
    const response = await api.get(endpoint, { params });
    return unwrapList<T>(response);
  };

  const clearCache = () => {
    sliders.value = [];
    newest.value = [];
    discounted.value = [];
    topSold.value = [];
    lastFetchedAt.value = null;
    status.value = 'idle';
    errorMessage.value = null;
  };

  const fetchHomeData = async (force = false) => {
    const isCacheValid = lastFetchedAt.value && Date.now() - lastFetchedAt.value < CACHE_TTL;
    if (!force && isCacheValid && status.value === 'success') return;

    status.value = 'loading';
    errorMessage.value = null;

    const results = await Promise.allSettled([
      fetchList<SliderDto>(API_ENDPOINTS.CATALOG.SLIDERS, { active: true }),
      fetchList<ProductDto>(API_ENDPOINTS.CATALOG.PRODUCTS_NEWEST, { limit: 50 }),
      fetchList<ProductDto>(API_ENDPOINTS.CATALOG.PRODUCTS_DISCOUNTED, { limit: 50 }),
      fetchList<ProductDto>(API_ENDPOINTS.CATALOG.PRODUCTS_TOP_SOLD, { limit: 12 }),
    ]);

    const [sliderRes, newestRes, discountedRes, topSoldRes] = results;
    sliders.value = resolveSliders(sliderRes.status === 'fulfilled' ? sliderRes.value : []);
    newest.value = newestRes.status === 'fulfilled' ? newestRes.value : [];
    discounted.value = discountedRes.status === 'fulfilled' ? discountedRes.value : [];
    topSold.value = topSoldRes.status === 'fulfilled' ? topSoldRes.value : [];

    const productsFailed = [newestRes, discountedRes, topSoldRes].every((r) => r.status === 'rejected');
    if (productsFailed && !hasProducts.value) {
      status.value = 'error';
      errorMessage.value = 'home_error_desc';
      return;
    }

    lastFetchedAt.value = Date.now();
    status.value = 'success';
  };

  return {
    sliders,
    newest,
    discounted,
    topSold,
    status,
    errorMessage,
    isLoading,
    isError,
    isSuccess,
    hasProducts,
    isEmpty,
    fetchHomeData,
    clearCache,
  };
});
