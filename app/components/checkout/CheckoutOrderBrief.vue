<template>
  <div class="rounded-3xl border border-mist bg-card p-6 shadow-card space-y-5">
    <div class="flex items-center justify-between border-b border-mist/60 pb-3">
      <h2 class="text-base font-bold text-ink flex items-center gap-2">
        <span class="material-symbols-rounded text-lg text-gold">receipt_long</span>
        <span>{{ $t('order_summary') }}</span>
      </h2>
      <span class="text-xs font-semibold text-ink-secondary">
        {{ cartStore.itemCount }} {{ $t('items_count', { count: cartStore.itemCount }) }}
      </span>
    </div>

    <!-- Items list preview -->
    <div class="max-h-56 overflow-y-auto space-y-1 pe-1 divide-y divide-mist/30">
      <CheckoutBriefItem v-for="item in cartStore.items" :key="item.id" :item="item" />
    </div>

    <!-- Calculations -->
    <div class="space-y-2.5 border-t border-mist/60 pt-4 text-xs sm:text-sm">
      <div class="flex items-center justify-between text-ink-secondary">
        <span>{{ $t('subtotal') }}</span>
        <span class="font-bold text-ink">{{ formatPrice(cartStore.subtotal) }}</span>
      </div>

      <div v-if="cartStore.discount > 0" class="flex items-center justify-between text-success font-semibold">
        <span class="flex items-center gap-1.5">
          <span>{{ $t('coupon_discount') }}</span>
          <span v-if="cartStore.appliedCoupon" class="rounded bg-success/15 px-1.5 py-0.5 text-[10px] uppercase font-mono">
            {{ cartStore.appliedCoupon.coupon_num }}
          </span>
        </span>
        <span>-{{ formatPrice(cartStore.discount) }}</span>
      </div>

      <div class="flex items-center justify-between text-ink-secondary">
        <span class="flex items-center gap-1">
          <span>{{ $t('shipping_cost') }}</span>
          <span v-if="selectedGovName" class="text-[11px] text-ink-secondary/70">
            ({{ selectedGovName }})
          </span>
        </span>
        <span class="font-bold text-ink">{{ formatPrice(shippingFee) }}</span>
      </div>

      <div class="flex items-baseline justify-between border-t border-mist pt-3 text-base font-black text-ink">
        <span>{{ $t('total') }}</span>
        <span class="text-xl text-gold">{{ formatPrice(finalTotal) }}</span>
      </div>
    </div>

    <!-- Trust Seals -->
    <div class="flex items-center justify-center gap-2 pt-2 border-t border-mist/40 text-[11px] font-semibold text-ink-secondary/70">
      <span class="material-symbols-rounded text-sm text-gold">lock</span>
      <span>{{ $t('secure_checkout') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { useCheckoutStore } from '~/stores/checkout';
import { findGovernorate } from '~/constants/governorates';

const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const { formatPrice } = usePriceFormatter();
const { locale } = useI18n();

const shippingFee = computed(() => checkoutStore.shippingFee);

const selectedGovName = computed(() => {
  const gov = findGovernorate(checkoutStore.form.governorate);
  if (!gov) return null;
  return locale.value === 'ar' ? gov.nameAr : gov.nameEn;
});

const finalTotal = computed(() => {
  return Math.max(0, cartStore.subtotal - cartStore.discount + shippingFee.value);
});
</script>
