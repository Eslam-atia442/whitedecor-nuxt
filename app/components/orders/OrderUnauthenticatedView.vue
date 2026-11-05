<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to UnauthenticatedOrdersView in white_decor/lib/features/orders/presentation/widgets/ -->
  <div class="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
    <div class="flex size-24 items-center justify-center rounded-full bg-navy/10 text-navy shadow-subtle dark:bg-card/60 dark:text-gold">
      <span class="material-symbols-rounded text-5xl">receipt_long</span>
    </div>

    <h2 class="mt-6 text-xl sm:text-2xl font-black text-ink">
      {{ $t('sign_in_orders_title') }}
    </h2>

    <p class="mt-2 max-w-sm text-sm text-ink-secondary leading-relaxed">
      {{ $t('login_to_view_orders') }}
    </p>

    <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
      <UiButton
        variant="primary"
        size="lg"
        :to="loginUrl"
        class="min-w-40"
      >
        <span class="material-symbols-rounded text-lg">login</span>
        <span>{{ $t('sign_in') }}</span>
      </UiButton>

      <UiButton
        variant="outline"
        size="lg"
        to="/products"
      >
        <span>{{ $t('shop_now', 'تسوق الآن') }}</span>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { localize } = useLocalizedPath();
const loginUrl = computed(() => localize('/login?redirect=/orders'));
</script>

