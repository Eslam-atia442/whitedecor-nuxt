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
    <div class="max-h-52 overflow-y-auto space-y-1 pe-1 divide-y divide-mist/30">
      <CheckoutBriefItem v-for="item in cartStore.items" :key="item.id" :item="item" />
    </div>

    <!-- Coupon Input / Applied Tag in Checkout -->
    <div class="space-y-2 border-t border-mist/60 pt-3">
      <div v-if="cartStore.appliedCoupon" class="flex items-center justify-between p-2.5 rounded-xl bg-gold/10 border border-gold/30">
        <div class="flex items-center gap-2">
          <span class="material-symbols-rounded text-base text-gold">local_offer</span>
          <span class="text-xs font-bold text-ink uppercase">{{ cartStore.appliedCoupon.coupon_num }}</span>
          <span class="text-[11px] font-bold text-success">-{{ formatPrice(cartStore.discount) }}</span>
        </div>
        <button type="button" class="text-ink-secondary hover:text-error" @click="cartStore.removeCoupon">
          <span class="material-symbols-rounded text-base">close</span>
        </button>
      </div>

      <div v-else class="flex gap-2">
        <UiInput
          v-model="couponCode"
          :placeholder="$t('promo_code')"
          size="sm"
          class="flex-1"
          @keyup.enter="handleApplyCoupon"
        />
        <UiButton variant="outline" size="sm" :loading="cartStore.isApplyingCoupon" :disabled="!couponCode.trim()" @click="handleApplyCoupon">
          {{ $t('apply') }}
        </UiButton>
      </div>
    </div>

    <!-- Calculations -->
    <div class="space-y-2 border-t border-mist/60 pt-3 text-xs sm:text-sm">
      <div class="flex items-center justify-between text-ink-secondary">
        <span>{{ $t('subtotal') }}</span>
        <span class="font-bold text-ink">{{ formatPrice(cartStore.subtotal) }}</span>
      </div>
      <div v-if="cartStore.discount > 0" class="flex items-center justify-between text-success font-semibold">
        <span>{{ $t('coupon_discount') }}</span>
        <span>-{{ formatPrice(cartStore.discount) }}</span>
      </div>
      <div class="flex items-center justify-between text-ink-secondary">
        <span>{{ $t('shipping_cost') }}</span>
        <span class="text-success font-semibold">{{ $t('shipping_free') }}</span>
      </div>
      <div class="flex items-baseline justify-between border-t border-mist pt-3 text-base font-black text-ink">
        <span>{{ $t('total') }}</span>
        <span class="text-xl text-gold">{{ formatPrice(cartStore.total) }}</span>
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

const cartStore = useCartStore();
const { formatPrice } = usePriceFormatter();
const couponCode = ref('');

const handleApplyCoupon = async () => {
  if (!couponCode.value.trim()) return;
  const ok = await cartStore.applyCoupon(couponCode.value);
  if (ok) couponCode.value = '';
};
</script>
