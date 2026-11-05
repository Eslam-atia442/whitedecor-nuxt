<template>
  <div
    class="overflow-hidden flex items-center justify-center select-none"
    :class="[
      isAbsolute ? 'absolute' : 'relative',
      wrapperClass,
      rounded || 'rounded-inherit',
      aspect,
    ]"
  >
    <!-- 1. LOADING SKELETON & SPINNER -->
    <div
      v-if="isLoading && !hasError"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <slot name="placeholder">
        <div class="img-shimmer" />
        <div class="relative flex flex-col items-center justify-center gap-1.5 text-gold/60">
          <span class="material-symbols-rounded animate-spin text-xl sm:text-2xl opacity-75">
            progress_activity
          </span>
        </div>
      </slot>
    </div>

    <!-- 2. ERROR / FALLBACK WIDGET -->
    <div
      v-else-if="hasError"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface/90 p-2 text-center text-ink-secondary/60 pointer-events-none"
      :class="errorClass"
    >
      <slot name="error">
        <div class="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-gold/10 text-gold shadow-xs">
          <span class="material-symbols-rounded text-2xl opacity-80">{{ fallbackIcon || 'chair' }}</span>
        </div>
        <span v-if="showErrorText" class="mt-1 text-[10px] font-semibold text-ink-secondary/70">
          {{ errorText || $t('image_not_available') }}
        </span>
      </slot>
    </div>

    <!-- 3. NATIVE IMAGE -->
    <img
      v-if="normalizedSrc && !hasError"
      ref="imgRef"
      :src="normalizedSrc"
      :alt="alt || ''"
      :loading="loading"
      :decoding="decoding"
      :draggable="draggable"
      class="size-full transition-opacity duration-500 ease-out"
      :class="[fitClass, imgClass, isLoaded ? 'opacity-100' : 'opacity-0']"
      @load="onLoad"
      @error="onError"
    />

    <slot :is-loading="isLoading" :is-loaded="isLoaded" :has-error="hasError" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string | null;
    alt?: string | null;
    loading?: 'lazy' | 'eager';
    decoding?: 'async' | 'sync' | 'auto';
    fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    wrapperClass?: string;
    imgClass?: string;
    errorClass?: string;
    rounded?: string;
    aspect?: string;
    fallbackIcon?: string;
    showErrorText?: boolean;
    errorText?: string;
    draggable?: boolean;
  }>(),
  {
    src: '',
    alt: '',
    loading: 'lazy',
    decoding: 'async',
    fit: 'cover',
    fallbackIcon: 'chair',
    draggable: false,
    showErrorText: false,
  }
);

const emit = defineEmits<{ (e: 'load', ev: Event): void; (e: 'error', ev: Event | string): void }>();
const attrs = useAttrs();
const isAbsolute = computed(() => String(attrs.class || '').includes('absolute'));

const { imgRef, isLoaded, hasError, isLoading, normalizedSrc, fitClass, onLoad, onError } =
  useNetworkImage({
    src: () => props.src,
    fit: () => props.fit,
    onLoadEmit: (e) => emit('load', e),
    onErrorEmit: (e) => emit('error', e),
  });
</script>
