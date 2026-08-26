<template>
  <p class="text-xs text-surface/70">{{ $t('splash_version', { version }) }}</p>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const version = computed(() => String(config.public.appVersion || '1.0.0'));
</script>
