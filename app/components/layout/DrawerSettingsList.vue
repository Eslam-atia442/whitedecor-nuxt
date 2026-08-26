<template>
  <div class="grid w-full gap-2">
    <div class="flex h-12 w-full items-center justify-between rounded-xl border border-mist bg-card px-3">
      <span class="text-xs font-bold text-ink">{{ $t('settings.theme_mode') }}</span>
      <UiThemeToggle />
    </div>
    <div class="flex h-12 w-full items-center justify-between rounded-xl border border-mist bg-card px-3">
      <span class="text-xs font-bold text-ink">{{ $t('settings.language') }}</span>
      <UiLanguageSwitcher />
    </div>
    <div class="w-full">
      <CountryPickerTrigger @open="openPicker" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { openPicker } = useCountryPicker();
</script>
