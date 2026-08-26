<template>
  <div class="rounded-3xl border border-mist bg-card p-6 shadow-card">
    <div class="mb-6 border-b border-mist pb-4">
      <h2 class="text-fluid-h3 font-bold text-ink">{{ $t('tab_preferences') }}</h2>
      <p class="text-xs text-ink-secondary">{{ $t('preferences_title') }}</p>
    </div>

    <div class="space-y-6">
      <!-- Language Preference -->
      <div class="flex flex-col justify-between gap-3 rounded-2xl border border-mist bg-surface/40 p-4 sm:flex-row sm:items-center">
        <div>
          <h3 class="text-sm font-bold text-ink">{{ $t('language_setting') }}</h3>
          <p class="text-xs text-ink-secondary">
            {{ locale === 'ar' ? 'العربية (Arabic)' : 'English (الإنجليزية)' }}
          </p>
        </div>
        <UiLanguageSwitcher />
      </div>

      <!-- Theme Preference -->
      <div class="flex flex-col justify-between gap-3 rounded-2xl border border-mist bg-surface/40 p-4 sm:flex-row sm:items-center">
        <div>
          <h3 class="text-sm font-bold text-ink">{{ $t('theme_setting') }}</h3>
          <p class="text-xs text-ink-secondary">
            {{ $t('settings.theme_mode') }}
          </p>
        </div>
        <UiThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
</script>
