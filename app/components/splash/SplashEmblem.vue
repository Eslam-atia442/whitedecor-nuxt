<template>
  <div class="flex size-24 items-center justify-center overflow-hidden rounded-3xl border border-gold/30 bg-card shadow-glass">
    <img
      :src="settingsStore.appLogo"
      :alt="settingsStore.appName"
      class="size-full object-contain p-3"
    >
  </div>
</template>

<script setup lang="ts">
const settingsStore = useSettingsStore();
</script>
