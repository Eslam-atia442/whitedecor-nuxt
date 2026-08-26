<template>
  <div class="relative hidden min-h-[520px] items-center justify-center overflow-hidden rounded-3xl bg-[#0A0E29] shadow-card lg:flex select-none">
    <!-- Full Size Background Logo Image -->
    <img
      :src="logoSrc"
      :alt="appName"
      draggable="false"
      class="pointer-events-none absolute inset-0 size-full select-none object-cover opacity-75 blur-[2px] transition-transform duration-700"
    >

    <!-- Luxury Ambient Gradient Overlay -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0E29]/70 via-[#0A0E29]/30 to-[#0A0E29]/50 backdrop-blur-[1px]" />

    <!-- Subtle Border -->
    <div class="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
  </div>
</template>

<script setup lang="ts">
const settingsStore = useSettingsStore();
const appName = computed(() => settingsStore.appName || 'وايت ديكور');
const logoSrc = computed(() => settingsStore.appLogo || '/images/logo.png');
</script>
