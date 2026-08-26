<template>
  <NuxtLayout>
    <div class="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 class="text-fluid-display font-bold text-gold">{{ error.statusCode }}</h1>
      <h2 class="mt-4 text-fluid-h2 font-semibold text-ink">
        {{ error.statusCode === 404 ? $t('error.page_not_found_title') : $t('error.generic_title') }}
      </h2>
      <p class="mt-3 max-w-lg text-ink-secondary">
        {{ error.statusCode === 404 ? $t('error.page_not_found_desc') : (error.message || $t('error.generic_desc')) }}
      </p>
      <UiButton class="mt-8" @click="handleError">{{ $t('error.back_to_home') }}</UiButton>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message?: string } }>();
const { t } = useI18n();
const { localize } = useLocalizedPath();
useSeo({
  title: props.error.statusCode === 404 ? t('error.page_not_found_title') : t('error.generic_title'),
  noIndex: true,
});
const handleError = () => clearError({ redirect: String(localize('/')) });
</script>
