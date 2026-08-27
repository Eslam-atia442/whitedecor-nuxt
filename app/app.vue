<template>
  <div class="min-h-dvh bg-surface text-ink antialiased" :dir="currentDir">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Toaster position="top-center" :close-button="true" :rich-colors="true" :dir="currentDir" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner';

const { locale } = useI18n();
const currentDir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'));

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === 'ar' ? 'ar-EG' : 'en-US',
    dir: currentDir.value,
  },
}));

watch(
  locale,
  (newLocale) => {
    if (!import.meta.client) return;
    const dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', newLocale);
    document.body.dir = dir;
  },
  { immediate: true },
);

useAppSettings();
const settingsStore = useSettingsStore();

await useAsyncData('app-settings', () => settingsStore.initSettings());
</script>
