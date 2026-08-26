<template>
  <NuxtLink :to="localePath('/')" class="group inline-flex items-center gap-2.5 outline-none">
    <img
      :src="logoSrc"
      :alt="appName"
      class="size-9 rounded-xl object-cover shadow-subtle transition-transform duration-200 group-hover:scale-105"
    >
    <span
      class="text-base font-bold tracking-tight transition-colors group-hover:text-gold"
      :class="inverted ? 'text-surface' : 'text-ink'"
    >
      {{ appName }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ inverted?: boolean }>();
const localePath = useLocalePath();
const settingsStore = useSettingsStore();
const appName = computed(() => settingsStore.appName || 'وايت ديكور');
const logoSrc = computed(() => settingsStore.appLogo || '/images/logo.png');
</script>
