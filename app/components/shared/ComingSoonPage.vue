<template>
  <section class="mx-auto max-w-lg rounded-2xl border border-mist bg-card p-10 text-center shadow-card">
    <p class="text-4xl">🚧</p>
    <h1 class="mt-4 text-fluid-h2 font-bold text-ink">{{ $t('coming_soon') }}</h1>
    <p class="mt-2 text-ink-secondary">{{ $t('coming_soon_desc') }}</p>
    <UiButton class="mt-6" @click="push('/')">{{ $t('home') }}</UiButton>
  </section>
</template>

<script setup lang="ts">
const { push } = useLocalizedPath();
</script>
