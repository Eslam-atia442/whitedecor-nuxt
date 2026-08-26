<template>
  <Transition
    enter-active-class="transition-opacity duration-500"
    leave-active-class="transition-opacity duration-500"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isActive"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-between navy-gradient py-16"
    >
      <div />
      <div class="flex flex-col items-center gap-4 animate-scale-in">
        <SplashEmblem />
        <h1 class="text-2xl font-bold tracking-wide text-surface">{{ settingsStore.appName }}</h1>
        <p class="text-sm text-surface/70">{{ $t('splash.loading_brand') }}</p>
      </div>
      <SplashVersionBadge />
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { isActive } = useAppSplash();
const settingsStore = useSettingsStore();
</script>
