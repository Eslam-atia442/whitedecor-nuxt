<template>
  <div class="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
    <div class="flex size-24 sm:size-28 items-center justify-center rounded-3xl bg-gold/10 text-gold mb-6 border border-gold/20 shadow-inner">
      <span class="material-symbols-rounded text-5xl sm:text-6xl">shopping_cart_off</span>
    </div>

    <h2 class="text-xl sm:text-2xl font-black text-ink mb-2">
      {{ $t('cart_empty_title') }}
    </h2>

    <p class="text-xs sm:text-sm text-ink-secondary max-w-md mx-auto mb-8 leading-relaxed">
      {{ $t('cart_empty_subtitle') }}
    </p>

    <NuxtLink :to="localize('/products')">
      <UiButton variant="primary" size="lg" class="shadow-hover">
        <span class="material-symbols-rounded text-xl">storefront</span>
        <span>{{ $t('explore_products') }}</span>
      </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { localize } = useLocalizedPath();
</script>
