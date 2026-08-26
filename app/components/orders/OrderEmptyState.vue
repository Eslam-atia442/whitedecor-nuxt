<template>
  <div class="rounded-3xl border border-mist bg-card p-8 sm:p-12 text-center shadow-card max-w-lg mx-auto my-8">
    <div class="mx-auto flex size-20 items-center justify-center rounded-3xl bg-gold/10 text-gold mb-6 shadow-subtle">
      <span class="material-symbols-rounded text-4xl">local_shipping</span>
    </div>
    <h3 class="text-lg sm:text-xl font-black text-ink mb-2">
      {{ $t('no_orders_placed') }}
    </h3>
    <p class="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6">
      {{ $t('orders_empty_subtitle') }}
    </p>
    <NuxtLink :to="localize('/products')">
      <UiButton variant="primary" size="md">
        <span class="material-symbols-rounded text-base">storefront</span>
        <span>{{ $t('start_shopping') }}</span>
      </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { localize } = useLocalizedPath();
</script>
