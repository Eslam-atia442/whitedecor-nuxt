import { computed, onMounted, ref, toValue, watch, type MaybeRefOrGetter } from 'vue';

export interface UseNetworkImageOptions {
  src?: MaybeRefOrGetter<string | null | undefined>;
  fit?: MaybeRefOrGetter<'cover' | 'contain' | 'fill' | 'none' | 'scale-down' | undefined>;
  onLoadEmit?: (e: Event) => void;
  onErrorEmit?: (e: Event | string) => void;
}

export function useNetworkImage(options: UseNetworkImageOptions) {
  const config = useRuntimeConfig();
  const imgRef = ref<HTMLImageElement | null>(null);
  const isLoaded = ref(false);
  const hasError = ref(false);
  const isLoading = ref(true);

  const normalizedSrc = computed(() => {
    const raw = toValue(options.src);
    const url = typeof raw === 'string' ? raw.trim() : '';
    if (!url) return '';
    if (/^(https?:|\/\/|data:|blob:)/i.test(url)) return url;
    const apiBase = config.public.apiBase || 'https://dashboard.whitedecor.online';
    return `${apiBase.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
  });

  const fitClass = computed(() => `object-${toValue(options.fit) || 'cover'}`);

  const onLoad = (e: Event) => {
    isLoaded.value = true;
    isLoading.value = false;
    hasError.value = false;
    options.onLoadEmit?.(e);
  };

  const onError = (e: Event | string) => {
    hasError.value = true;
    isLoading.value = false;
    isLoaded.value = false;
    options.onErrorEmit?.(e);
  };

  watch(
    normalizedSrc,
    (src) => {
      if (!src) {
        hasError.value = true;
        isLoading.value = false;
        isLoaded.value = false;
        return;
      }
      if (import.meta.client && imgRef.value?.complete && imgRef.value.naturalWidth > 0) {
        isLoaded.value = true;
        isLoading.value = false;
        return;
      }
      isLoaded.value = false;
      hasError.value = false;
      isLoading.value = true;
    },
    { immediate: true }
  );

  onMounted(() => {
    if (!normalizedSrc.value) {
      hasError.value = true;
      isLoading.value = false;
    } else if (imgRef.value?.complete) {
      if (imgRef.value.naturalWidth > 0) onLoad(new Event('load'));
      else onError('Image failed to load');
    }
  });

  return {
    imgRef,
    isLoaded,
    hasError,
    isLoading,
    normalizedSrc,
    fitClass,
    onLoad,
    onError,
  };
}
