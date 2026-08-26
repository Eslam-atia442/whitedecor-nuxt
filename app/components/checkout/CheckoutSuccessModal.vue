<template>
  <UiResponsiveModal :is-open="isOpen" :title="$t('order_success_title')" @close="handleGoHome">
    <div class="space-y-6 pt-2 text-center">
      <!-- Success Icon Animation -->
      <div class="flex size-16 sm:size-20 items-center justify-center rounded-full bg-success/15 text-success mx-auto shadow-inner">
        <span class="material-symbols-rounded text-4xl sm:text-5xl animate-bounce">check_circle</span>
      </div>

      <div class="space-y-1">
        <div class="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-ink">
          <span>{{ $t('order_number') }}:</span>
          <span class="font-mono text-gold">{{ order.order_num || order.id }}</span>
        </div>
        <p class="text-xs sm:text-sm text-ink-secondary max-w-sm mx-auto leading-relaxed pt-2">
          {{ $t('order_success_subtitle') }}
        </p>
      </div>

      <!-- Comprehensive Savings Card (Offers + Coupon) -->
      <div class="rounded-2xl border border-gold/40 bg-gold/10 p-4 text-start space-y-2.5 text-xs">
        <div v-if="order.coupon || order.coupon_num" class="flex items-center justify-between font-bold text-ink">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-rounded text-base text-gold">local_offer</span>
            <span>{{ $t('coupon_code_applied', { code: order.coupon?.coupon_num || order.coupon_num }) }}</span>
          </div>
          <span v-if="order.coupon?.discount" class="rounded-md bg-gold px-1.5 py-0.5 text-[10px] font-black text-navy">
            -{{ order.coupon.discount }}%
          </span>
        </div>

        <div class="border-t border-mist/60 pt-2 space-y-1.5">
          <!-- 1. Original price before discounts -->
          <div v-if="displayOfferSavings > 0" class="flex justify-between text-ink-secondary">
            <span>{{ $t('price_before_discounts') }}</span>
            <span class="line-through">{{ formatPrice(displayOriginalTotal) }}</span>
          </div>

          <!-- 2. Offers discount savings -->
          <div v-if="displayOfferSavings > 0" class="flex justify-between font-bold text-success">
            <span>{{ $t('offers_discount_saved') }}</span>
            <span>-{{ formatPrice(displayOfferSavings) }}</span>
          </div>

          <!-- 3. Subtotal after offers -->
          <div class="flex justify-between text-ink-secondary">
            <span>{{ displayOfferSavings > 0 ? $t('subtotal_after_offers') : $t('subtotal') }}</span>
            <span class="font-bold text-ink">{{ formatPrice(displaySubtotal) }}</span>
          </div>

          <!-- 4. Coupon discount savings -->
          <div v-if="displayCouponDiscount > 0" class="flex justify-between font-bold text-success">
            <span>{{ $t('coupon_discount_saved') }}</span>
            <span>-{{ formatPrice(displayCouponDiscount) }}</span>
          </div>

          <!-- 5. Free Shipping -->
          <div class="flex justify-between text-ink-secondary">
            <span>{{ $t('shipping_cost') }}</span>
            <span class="text-success font-semibold">{{ $t('shipping_free') }}</span>
          </div>

          <!-- 6. Grand Total -->
          <div class="flex justify-between pt-1.5 border-t border-mist/60 font-black text-ink text-sm">
            <span>{{ $t('total') }}</span>
            <span class="text-gold text-base">{{ formatPrice(order.total) }}</span>
          </div>
        </div>
      </div>

      <!-- Modal Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <UiButton variant="primary" size="md" @click="handleGoOrders">
          <span class="material-symbols-rounded text-lg">local_shipping</span>
          <span>{{ $t('track_orders') }}</span>
        </UiButton>
        <UiButton variant="outline" size="md" @click="handleGoHome">
          <span class="material-symbols-rounded text-lg">storefront</span>
          <span>{{ $t('continue_shopping') }}</span>
        </UiButton>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
import type { OrderDto } from '~/types/checkout';

const props = defineProps<{
  isOpen: boolean;
  order: OrderDto;
}>();

const emit = defineEmits<{ (e: 'close'): void }>();
const { push } = useLocalizedPath();
const { formatPrice, parsePrice, getProductPriceInfo } = usePriceFormatter();

const displayOriginalTotal = computed(() => {
  if (props.order.original_subtotal) return parsePrice(props.order.original_subtotal);
  if (!props.order.items || !props.order.items.length) return parsePrice(props.order.subtotal || props.order.total);
  return props.order.items.reduce((acc, item) => {
    const info = getProductPriceInfo(item.product, item.unit_price);
    return acc + (info.originalPrice * (item.quantity || 1));
  }, 0);
});

const displaySubtotal = computed(() => parsePrice(props.order.subtotal || props.order.total));
const displayOfferSavings = computed(() => {
  if (props.order.offer_savings) return parsePrice(props.order.offer_savings);
  return Math.max(0, displayOriginalTotal.value - displaySubtotal.value);
});
const displayCouponDiscount = computed(() => parsePrice(props.order.discount_amount || '0'));

const handleGoOrders = () => { emit('close'); push('/orders'); };
const handleGoHome = () => { emit('close'); push('/products'); };
</script>
