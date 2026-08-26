<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to OrderDetailSummaryCard in white_decor/lib/features/orders/ -->
  <section class="rounded-3xl border border-mist bg-card p-6 shadow-card space-y-4">
    <div class="flex items-center gap-2.5 border-b border-mist pb-4">
      <span class="flex size-9 items-center justify-center rounded-2xl bg-gold/15 text-gold shadow-subtle">
        <span class="material-symbols-rounded text-xl">receipt_long</span>
      </span>
      <h2 class="text-base sm:text-lg font-black text-ink">
        {{ $t('order_summary') }}
      </h2>
    </div>

    <div class="space-y-3 text-xs sm:text-sm">
      <!-- Original Price (if offers existed) -->
      <div v-if="offerSavings > 0" class="flex items-center justify-between gap-4 text-ink-secondary">
        <span>{{ $t('price_before_discounts') }}</span>
        <span class="font-medium line-through text-ink-secondary whitespace-nowrap">
          {{ originalSubtotal.toFixed(2) }} {{ $t('egp') }}
        </span>
      </div>

      <!-- Product Offers Discount -->
      <div v-if="offerSavings > 0" class="flex items-center justify-between gap-4 text-emerald-600 font-bold">
        <span>{{ $t('offers_discount_saved') }}</span>
        <span class="whitespace-nowrap">-{{ offerSavings.toFixed(2) }} {{ $t('egp') }}</span>
      </div>

      <!-- Subtotal -->
      <div class="flex items-center justify-between gap-4 text-ink-secondary">
        <span class="font-medium">{{ $t('subtotal') }}</span>
        <span class="font-bold text-ink whitespace-nowrap">
          {{ order.subtotal || order.total || '0' }} {{ $t('egp') }}
        </span>
      </div>

      <!-- Coupon Discount Amount -->
      <div
        v-if="couponDiscount && Number(couponDiscount) > 0"
        class="flex items-center justify-between gap-4 text-emerald-600 font-bold"
      >
        <span class="flex items-center gap-1">
          <span class="material-symbols-rounded text-sm">local_offer</span>
          <span>{{ $t('discount') }}</span>
        </span>
        <span class="whitespace-nowrap">-{{ couponDiscount }} {{ $t('egp') }}</span>
      </div>

      <!-- Coupon Code Chip -->
      <div v-if="couponCode" class="flex items-center justify-between gap-4 text-gold text-xs font-bold bg-gold/10 p-2.5 rounded-xl border border-gold/20">
        <span class="flex items-center gap-1.5">
          <span class="material-symbols-rounded text-sm">confirmation_number</span>
          <span>{{ $t('step_coupon') }}</span>
        </span>
        <span class="font-mono bg-card px-2.5 py-0.5 rounded-md border border-gold/30 text-ink">
          {{ couponCode }}
        </span>
      </div>

      <!-- Shipping -->
      <div class="flex items-center justify-between gap-4 text-ink-secondary">
        <span class="font-medium">{{ $t('shipping_cost') }}</span>
        <span class="font-bold text-emerald-600 whitespace-nowrap">{{ $t('free_shipping') }}</span>
      </div>

      <!-- Grand Total -->
      <div class="pt-4 border-t border-mist flex items-baseline justify-between gap-4">
        <span class="text-base font-black text-ink">{{ $t('total') }}</span>
        <div class="text-end whitespace-nowrap">
          <span class="text-2xl font-black text-gold">
            {{ order.total || order.subtotal || '0' }}
          </span>
          <span class="text-xs font-bold text-gold ms-1">{{ $t('egp') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { OrderDto } from '~/types/orders';

const props = defineProps<{
  order: OrderDto;
}>();

const couponCode = computed(() => {
  return props.order.coupon_num || props.order.coupon?.coupon_num || null;
});

const couponDiscount = computed(() => {
  return props.order.discount_amount || props.order.coupon?.discount_amount || null;
});

const originalSubtotal = computed(() => {
  if (!props.order.items || props.order.items.length === 0) return 0;
  return props.order.items.reduce((sum, item) => {
    const origPrice = parseFloat(String(item.product?.price || item.unit_price || '0')) || 0;
    return sum + origPrice * (item.quantity || 1);
  }, 0);
});

const orderSubtotalNum = computed(() => {
  return parseFloat(String(props.order.subtotal || props.order.total || '0')) || 0;
});

const offerSavings = computed(() => {
  if (originalSubtotal.value <= orderSubtotalNum.value) return 0;
  return Math.max(0, originalSubtotal.value - orderSubtotalNum.value);
});
</script>
