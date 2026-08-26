<template>
  <div class="mx-auto max-w-7xl px-4 py-10 lg:px-8">
    <div class="grid gap-8 lg:grid-cols-[280px_1fr]">
      <PolicySidebarNav />
      <article>
        <h1 class="text-fluid-h1 font-bold text-ink">{{ $t('legal.about_us') }}</h1>
        <p class="mt-2 text-sm text-ink-secondary">{{ $t('legal.last_updated', { date: '2026' }) }}</p>
        <div class="mt-8">
          <PolicyContentRenderer :html="html" />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const settingsStore = useSettingsStore();
const html = computed(() => settingsStore.aboutHtml);
const { t } = useI18n();
useSeo({
  title: t('legal.about_us'),
  description: t('about_seo_desc'),
});
useSchemaOrg([defineAboutPage({ name: t('legal.about_us'), description: t('about_seo_desc') })]);
</script>
