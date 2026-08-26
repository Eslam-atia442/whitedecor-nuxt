<template>
  <div class="rounded-3xl border border-mist bg-card p-6 shadow-card space-y-6">
    <h2 class="text-lg font-bold text-ink flex items-center justify-between">
      <span>{{ $t('order_summary') }}</span>
      <span class="text-xs font-semibold text-ink-secondary">({{ store.itemCount }} {{ $t('items_count', { count: store.itemCount }) }})</span>
    </h2>

    <!-- Pricing Breakdown with Offer Savings -->
    <div class="space-y-3 border-t border-mist/60 pt-4 text-xs sm:text-sm">
      <!-- Original subtotal before offers -->
      <div v-if="store.offerSavings > 0" class="flex items-center justify-between text-ink-secondary">
        <span>{{ $t('price_before_discounts') }}</span>
        <span class="line-through">{{ formatPrice(store.originalSubtotal) }}</span>
      </div>

      <!-- Offers Savings -->
      <div v-if="store.offerSavings > 0" class="flex items-center justify-between text-success font-bold">
        <span>{{ $t('offers_discount_saved') }}</span>
        <span>-{{ formatPrice(store.offerSavings) }}</span>
      </div>

      <div class="flex items-center justify-between text-ink-secondary">
        <span>{{ store.offerSavings > 0 ? $t('subtotal_after_offers') : $t('subtotal') }}</span>
        <span class="font-bold text-ink">{{ formatPrice(store.subtotal) }}</span>
      </div>

      <div class="flex items-center justify-between text-ink-secondary">
        <span>{{ $t('shipping_cost') }}</span>
        <span class="text-success font-semibold">{{ $t('shipping_free') }}</span>
      </div>

      <div class="flex items-center justify-between text-[11px] text-ink-secondary/60">
        <span>{{ $t('vat_tax') }}</span>
        <span>{{ $t('vat_inclusive') }}</span>
      </div>

      <div class="flex items-baseline justify-between border-t border-mist pt-3 text-base sm:text-lg font-black text-ink">
        <span>{{ $t('total') }}</span>
        <span class="text-xl sm:text-2xl text-gold">{{ formatPrice(store.subtotal) }}</span>
      </div>
    </div>

    <!-- Checkout CTA Button -->
    <UiButton
      variant="primary"
      size="lg"
      class="w-full"
      :disabled="store.isEmpty"
      @click="proceedToCheckout"
    >
      <span class="material-symbols-rounded text-xl">shopping_cart_checkout</span>
      <span>{{ $t('proceed_to_checkout') }}</span>
    </UiButton>

    <!-- Trust Badge -->
    <div class="flex items-center justify-center gap-2 pt-1 text-[11px] font-semibold text-ink-secondary/70">
      <span class="material-symbols-rounded text-sm text-gold">verified_user</span>
      <span>{{ $t('secure_checkout') }}</span>
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
