<template>
  <div class="space-y-6">
    <!-- 1. Ordered Items Preview -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold uppercase tracking-wider text-ink-secondary flex items-center gap-2">
          <span class="material-symbols-rounded text-base text-gold">shopping_bag</span>
          <span>{{ $t('cart_title') }}</span>
        </h3>
        <span class="text-xs font-bold text-ink-secondary">{{ cartStore.itemCount }} {{ $t('items_count', { count: cartStore.itemCount }) }}</span>
      </div>
      <div class="max-h-52 overflow-y-auto space-y-1 pe-1 divide-y divide-mist/30 rounded-2xl border border-mist bg-surface/50 p-2">
        <CheckoutBriefItem v-for="item in cartStore.items" :key="item.id" :item="item" />
      </div>
    </div>

    <!-- 2. Integrated Coupon Section in Checkout -->
    <div class="space-y-2 p-4 rounded-2xl border border-mist bg-surface">
      <label class="block text-xs font-bold uppercase tracking-wider text-ink-secondary">{{ $t('promo_code') }}</label>
      <div v-if="cartStore.appliedCoupon" class="flex items-center justify-between p-2.5 rounded-xl bg-gold/10 border border-gold/30">
        <div class="flex items-center gap-2">
          <span class="material-symbols-rounded text-base text-gold">local_offer</span>
          <span class="text-xs font-bold text-ink uppercase">{{ cartStore.appliedCoupon.coupon_num }}</span>
          <span class="text-[11px] font-bold text-success">-{{ formatPrice(cartStore.discount) }}</span>
        </div>
        <button type="button" class="text-ink-secondary hover:text-error" @click="handleRemoveCoupon"><span class="material-symbols-rounded text-base">close</span></button>
      </div>
      <div v-else class="flex gap-2">
        <UiInput v-model="couponCode" :placeholder="$t('enter_promo_code')" size="sm" class="flex-1" @update:model-value="(val) => store.form.couponNum = val.trim()" @keyup.enter="handleApplyCoupon" />
        <UiButton variant="outline" size="sm" :loading="cartStore.isApplyingCoupon" :disabled="!couponCode.trim()" @click="handleApplyCoupon">{{ $t('apply') }}</UiButton>
      </div>
    </div>

    <!-- 3. Contact & Delivery Summary -->
    <div class="rounded-2xl border border-mist/80 bg-surface/80 p-4 space-y-2 text-xs">
      <div class="flex items-center justify-between"><span class="text-ink-secondary">{{ $t('name') }}:</span><span class="font-bold text-ink">{{ store.form.name || '-' }}</span></div>
      <div class="flex items-center justify-between"><span class="text-ink-secondary">{{ $t('phone') }}:</span><span class="font-mono font-bold text-ink" dir="ltr">{{ store.form.phone || '-' }}</span></div>
      <div class="flex items-start justify-between gap-4"><span class="text-ink-secondary shrink-0">{{ $t('address') }}:</span><span class="font-bold text-ink text-end truncate max-w-[260px]">{{ store.form.address || '-' }}</span></div>
    </div>

    <!-- 4. Price Calculations Receipt (Offers Savings + Coupon Savings) -->
    <div class="space-y-2 border-t border-mist/60 pt-4 text-xs sm:text-sm">
      <div v-if="cartStore.offerSavings > 0" class="flex items-center justify-between text-ink-secondary"><span>{{ $t('price_before_discounts') }}</span><span class="line-through">{{ formatPrice(cartStore.originalSubtotal) }}</span></div>
      <div v-if="cartStore.offerSavings > 0" class="flex items-center justify-between text-success font-bold"><span>{{ $t('offers_discount_saved') }}</span><span>-{{ formatPrice(cartStore.offerSavings) }}</span></div>
      <div class="flex items-center justify-between text-ink-secondary"><span>{{ cartStore.offerSavings > 0 ? $t('subtotal_after_offers') : $t('subtotal') }}</span><span class="font-bold text-ink">{{ formatPrice(cartStore.subtotal) }}</span></div>
      <div v-if="cartStore.discount > 0" class="flex items-center justify-between text-success font-bold"><span>{{ $t('coupon_discount') }}</span><span>-{{ formatPrice(cartStore.discount) }}</span></div>
      <div class="flex items-center justify-between text-ink-secondary"><span>{{ $t('shipping_cost') }}</span><span class="text-success font-semibold">{{ $t('shipping_free') }}</span></div>
      <div class="flex items-baseline justify-between border-t border-mist pt-3 text-base font-black text-ink"><span>{{ $t('total') }}</span><span class="text-2xl text-gold">{{ formatPrice(cartStore.total) }}</span></div>
    </div>

    <!-- 5. Delivery Notes -->
    <div class="space-y-1.5">
      <label class="block text-xs font-bold uppercase tracking-wider text-ink-secondary">{{ $t('delivery_notes') }}</label>
      <textarea v-model="store.form.notes" rows="2" :placeholder="$t('delivery_notes_placeholder')" class="w-full rounded-2xl border border-mist bg-surface p-3 text-xs sm:text-sm text-ink placeholder:text-ink-secondary/50 focus:border-gold focus:outline-hidden focus:ring-2 focus:ring-gold/20 transition-all resize-none" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout';
import { useCartStore } from '~/stores/cart';

const store = useCheckoutStore();
const cartStore = useCartStore();
const { formatPrice } = usePriceFormatter();
const couponCode = ref(cartStore.appliedCoupon?.coupon_num || store.form.couponNum || '');

const handleApplyCoupon = async () => {
  const code = couponCode.value.trim() || (store.form.couponNum ?? '').trim();
  if (!code) return;
  const ok = await cartStore.applyCoupon(code);
  if (ok) { store.form.couponNum = code; couponCode.value = ''; }
};

const handleRemoveCoupon = () => {
  cartStore.removeCoupon();
  store.form.couponNum = '';
  couponCode.value = '';
};
</script>
