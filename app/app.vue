<template>
  <div class="min-h-dvh bg-surface text-ink antialiased" :dir="currentDir">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Toaster position="top-center" :close-button="false" :rich-colors="false" :dir="currentDir" :duration="3000" />
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

await useAsyncData('app-settings', async () => {
  if (!settingsStore.appSettings) {
    await settingsStore.initSettings();
  }
  return true;
});
</script>
