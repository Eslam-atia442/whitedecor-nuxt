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
      <!-- Subtotal -->
      <div class="flex items-center justify-between gap-4 text-ink-secondary">
        <span class="font-medium">{{ $t('subtotal') }}</span>
        <span class="font-bold text-ink whitespace-nowrap">
          {{ formatPrice(subtotalNum) }}
        </span>
      </div>

      <!-- Coupon Discount Amount & Pill -->
      <div
        v-if="couponDiscountNum > 0"
        class="flex items-center justify-between gap-4 text-success font-bold"
      >
        <span class="flex items-center gap-1.5">
          <span class="material-symbols-rounded text-sm">local_offer</span>
          <span>{{ $t('coupon_discount') }}</span>
          <span
            v-if="couponCode"
            class="rounded bg-success/15 px-1.5 py-0.5 text-[10px] font-mono uppercase font-bold"
          >
            {{ couponCode }}
          </span>
        </span>
        <span class="whitespace-nowrap">-{{ formatPrice(couponDiscountNum) }}</span>
      </div>

      <div
        v-else-if="couponCode"
        class="flex items-center justify-between gap-4 text-gold text-xs font-bold bg-gold/10 p-2.5 rounded-xl border border-gold/20"
      >
        <span class="flex items-center gap-1.5">
          <span class="material-symbols-rounded text-sm">confirmation_number</span>
          <span>{{ $t('coupon_code') }}</span>
        </span>
        <span class="font-mono bg-card px-2.5 py-0.5 rounded-md border border-gold/30 text-ink">
          {{ couponCode }}
        </span>
      </div>

      <!-- Shipping -->
      <div class="flex items-center justify-between gap-4 text-ink-secondary">
        <span class="font-medium">{{ $t('shipping_cost') }}</span>
        <span v-if="shippingCostNum > 0" class="font-bold text-ink whitespace-nowrap">
          {{ formatPrice(shippingCostNum) }}
        </span>
        <span v-else class="font-bold text-success whitespace-nowrap">
          {{ $t('free_shipping') }}
        </span>
      </div>

      <!-- Grand Total -->
      <div class="pt-4 border-t border-mist flex items-baseline justify-between gap-4">
        <span class="text-base font-black text-ink">{{ $t('total') }}</span>
        <div class="text-end whitespace-nowrap">
          <span class="text-2xl font-black text-gold">
            {{ formatPrice(totalNum) }}
          </span>
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

const { formatPrice, parsePrice } = usePriceFormatter();

const couponCode = computed(() => {
  return (
    props.order.coupon_num ||
    props.order.coupon?.coupon_num ||
    (props.order as any).coupon_code ||
    null
  );
});

const couponDiscountNum = computed(() => {
  const d =
    props.order.discount_amount ??
    (props.order as any).coupon_discount ??
    props.order.coupon?.discount_amount;
  return parsePrice(d);
});

const subtotalNum = computed(() => {
  return parsePrice(props.order.subtotal || props.order.total);
});

const shippingCostNum = computed(() => {
  const s = (props.order as any).shipping_cost || (props.order as any).shipping_fee;
  return parsePrice(s);
});

const totalNum = computed(() => {
  return parsePrice(props.order.total || props.order.subtotal);
});
</script>
