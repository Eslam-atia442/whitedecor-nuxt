<template>
  <header class="sticky top-0 z-40 glass-header lg:hidden">
    <div class="flex items-center justify-between px-4 py-3">
      <button type="button" @click="$emit('open-mobile-drawer')">☰</button>
      <UiLogo />
      <NuxtLink :to="localize('/cart')" class="relative">🛒</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits<{ 'open-mobile-drawer': [] }>();
const { localize } = useLocalizedPath();
</script>
