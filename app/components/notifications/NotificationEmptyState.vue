<template>
  <div class="mx-auto my-8 max-w-lg rounded-3xl border border-mist bg-card p-8 text-center shadow-card sm:p-12">
    <div class="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl bg-gold/10 text-gold shadow-subtle">
      <span class="material-symbols-rounded text-4xl">notifications</span>
    </div>
    <h2 class="mb-2 text-lg font-black text-ink sm:text-xl">
      {{ $t('no_notifications') }}
    </h2>
    <p class="mb-6 text-xs leading-relaxed text-ink-secondary sm:text-sm">
      {{ $t('notifications_subtitle') }}
    </p>
    <NuxtLink :to="localize('/products')">
      <UiButton variant="primary" size="md">
        {{ $t('start_shopping') }}
      </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { localize } = useLocalizedPath();
</script>
