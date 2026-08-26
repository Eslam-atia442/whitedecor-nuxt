<template>
  <section class="space-y-3">
    <h2 class="text-lg font-extrabold text-ink">{{ $t('seo_faq_title') }}</h2>
    <SeoFaqItem v-for="item in items" :key="item.question" :item="item" />
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const items = computed(() => [
  { question: t('seo_faq_shipping_q'), answer: t('seo_faq_shipping_a') },
  { question: t('seo_faq_original_q'), answer: t('seo_faq_original_a') },
  { question: t('seo_faq_returns_q'), answer: t('seo_faq_returns_a') },
]);
</script>
