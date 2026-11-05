<template>
  <div class="rounded-3xl border border-mist bg-card p-5 sm:p-6 shadow-card space-y-4">
    <!-- Header: Title & View Available Coupons Trigger -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="flex size-9 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <span class="material-symbols-rounded text-lg">confirmation_number</span>
        </div>
        <h3 class="text-sm sm:text-base font-bold text-ink">{{ $t('coupon_code') }}</h3>
      </div>
      <button
        v-if="!cartStore.appliedCoupon"
        type="button"
        class="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:underline transition"
        @click="isModalOpen = true"
      >
        <span class="material-symbols-rounded text-sm">local_offer</span>
        <span>{{ $t('view_available_coupons') }}</span>
      </button>
    </div>

    <!-- State A: Active Applied Coupon Pill / Card -->
    <div
      v-if="cartStore.appliedCoupon"
      class="flex items-center justify-between gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-3.5"
    >
      <div class="flex items-center gap-3 min-w-0">
        <div class="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-navy shadow-subtle">
          <span class="material-symbols-rounded text-base font-bold">check</span>
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-bold text-ink uppercase tracking-wide truncate">
              {{ cartStore.appliedCoupon.coupon_num }}
            </span>
            <span class="shrink-0 rounded-md bg-success/15 px-1.5 py-0.5 text-[11px] font-bold text-success">
              {{ cartStore.appliedCoupon.discount }}%
            </span>
          </div>
          <p class="text-xs text-ink-secondary mt-0.5">
            {{ $t('coupon_discount_saved') }}:
            <span class="font-bold text-success font-mono">{{ formatPrice(cartStore.discount) }}</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        class="inline-flex shrink-0 items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-bold text-error hover:bg-error/10 transition"
        @click="cartStore.removeCoupon"
      >
        <span class="material-symbols-rounded text-sm">close</span>
        <span>{{ $t('remove') }}</span>
      </button>
    </div>

    <!-- State B: Code Input & Apply Button -->
    <div v-else class="space-y-2">
      <div class="flex gap-2">
        <div class="relative flex-1">
          <span class="material-symbols-rounded absolute start-3 top-1/2 -translate-y-1/2 text-lg text-ink-secondary">
            discount
          </span>
          <input
            v-model="inputCode"
            type="text"
            :placeholder="$t('coupon_hint')"
            class="w-full rounded-2xl border border-mist bg-surface ps-10 pe-4 py-2.5 text-xs sm:text-sm font-semibold uppercase text-ink placeholder:normal-case placeholder:text-ink-secondary/60 focus:border-gold focus:outline-none transition"
            @keyup.enter="handleApply"
          />
        </div>
        <UiButton
          variant="primary"
          size="md"
          :loading="cartStore.isApplyingCoupon"
          :disabled="!inputCode.trim()"
          class="min-w-24 shrink-0"
          @click="handleApply"
        >
          {{ $t('apply') }}
        </UiButton>
      </div>
    </div>

    <!-- Modal for Listing Available Coupons -->
    <CheckoutAvailableCouponsModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @select="onCouponSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const { formatPrice } = usePriceFormatter();

const inputCode = ref('');
const isModalOpen = ref(false);

const handleApply = async () => {
  if (!inputCode.value.trim()) return;
  const ok = await cartStore.applyCoupon(inputCode.value.trim());
  if (ok) inputCode.value = '';
};

const onCouponSelected = async (code: string) => {
  inputCode.value = code;
  await handleApply();
};
</script>

