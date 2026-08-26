<template>
  <div class="fixed inset-x-0 bottom-0 z-40 border-t border-mist bg-card/95 px-4 pt-3 pb-5 sm:pb-4 shadow-glass backdrop-blur-2xl lg:hidden">
    <div class="mx-auto flex max-w-md items-center justify-between gap-3">
      <!-- Total Column -->
      <div class="shrink-0">
        <span class="block text-[10px] uppercase font-bold text-ink-secondary tracking-wider">{{ $t('total') }}</span>
        <span class="block text-base sm:text-lg font-black text-ink tracking-tight">{{ formatPrice(store.total) }}</span>
      </div>

      <!-- Checkout CTA -->
      <UiButton
        variant="primary"
        size="md"
        class="flex-1"
        :disabled="store.isEmpty"
        @click="proceedToCheckout"
      >
        <span class="material-symbols-rounded text-lg">shopping_cart_checkout</span>
        <span class="truncate">{{ $t('proceed_to_checkout') }}</span>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { useCartActions } from '~/composables/useCartActions';

const store = useCartStore();
const { proceedToCheckout } = useCartActions();
const { formatPrice } = usePriceFormatter();
</script>
