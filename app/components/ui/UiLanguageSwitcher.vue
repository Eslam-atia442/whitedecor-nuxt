<template>
  <button
    type="button"
    class="group relative flex size-10 shrink-0 items-center justify-center rounded-full border border-mist/80 bg-card text-ink shadow-subtle transition-all duration-200 hover:border-gold/50 hover:bg-gold/10 hover:text-gold active:scale-95"
    :aria-label="$t('settings.language')"
    :title="$t('settings.language')"
    @click="toggleLanguage"
  >
    <span class="text-xs font-black tracking-wider transition-transform duration-200 group-hover:scale-105">
      {{ locale === 'ar' ? 'EN' : 'عربي' }}
    </span>
  </button>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const toggleLanguage = async () => {
  const nextLocale = locale.value === 'ar' ? 'en' : 'ar';
  await navigateTo(switchLocalePath(nextLocale));
};
</script>
