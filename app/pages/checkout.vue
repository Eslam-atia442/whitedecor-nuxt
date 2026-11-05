<template>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6 pb-24 lg:pb-16">
    <UiBreadcrumbs :items="breadcrumbs" />

    <!-- Page Title -->
    <div class="space-y-1">
      <h1 class="text-2xl sm:text-3xl font-black text-ink">{{ $t('checkout_title') }}</h1>
      <p class="text-xs sm:text-sm text-ink-secondary">{{ $t('checkout_subtitle') }}</p>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="cartStore.isLoading" class="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div class="lg:col-span-7 space-y-4">
        <div class="h-64 rounded-3xl bg-mist/40 animate-pulse" />
        <div class="h-32 rounded-3xl bg-mist/40 animate-pulse" />
      </div>
      <div class="lg:col-span-5">
        <div class="h-80 rounded-3xl bg-mist/40 animate-pulse" />
      </div>
    </div>

    <!-- Unified Single Page Checkout Layout -->
    <div v-else class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
      <!-- Left Column: Delivery, Notes, Coupon & Payment -->
      <div class="lg:col-span-7 space-y-6">
        <!-- 1. Customer & Address Information -->
        <div class="rounded-3xl border border-mist bg-card p-5 sm:p-7 shadow-card space-y-5">
          <div class="flex items-center gap-2.5 border-b border-mist/60 pb-3">
            <span class="material-symbols-rounded text-lg text-gold">local_shipping</span>
            <h2 class="text-base font-black text-ink">{{ $t('delivery_address') }}</h2>
          </div>
          <CheckoutAddressSection />

          <div class="pt-2">
            <UiInput
              v-model="store.form.notes"
              :label="$t('order_notes')"
              :placeholder="$t('order_notes_placeholder', 'ملاحظات إضافية للتوصيل (اختياري)...')"
            />
          </div>
        </div>

        <!-- 2. Coupon Card -->
        <CheckoutCouponField />

        <!-- 3. Payment Method -->
        <div class="rounded-3xl border border-mist bg-card p-5 sm:p-6 shadow-card space-y-3">
          <div class="flex items-center gap-2.5 border-b border-mist/60 pb-3">
            <span class="material-symbols-rounded text-lg text-gold">payments</span>
            <h2 class="text-base font-black text-ink">{{ $t('payment_method') }}</h2>
          </div>
          <div class="flex items-center gap-3.5 rounded-2xl border border-gold/40 bg-gold/5 p-4">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
              <span class="material-symbols-rounded text-xl">handshake</span>
            </div>
            <div>
              <p class="text-sm font-bold text-ink">{{ $t('cash_on_delivery') }}</p>
              <p class="text-xs text-ink-secondary mt-0.5">
                {{ $t('cod_description', 'ادفع نقداً عند استلام ومعاينة طلبك') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Sticky Order Summary & Action -->
      <div class="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
        <CheckoutOrderBrief />
        <UiButton
          variant="primary"
          size="lg"
          class="hidden lg:flex w-full justify-center shadow-lg"
          :loading="store.status === 'submitting'"
          @click="promptConfirmation"
        >
          <span class="material-symbols-rounded text-lg">verified</span>
          <span>{{ $t('place_order') }}</span>
        </UiButton>
      </div>
    </div>

    <!-- Mobile Sticky Bottom Bar -->
    <CheckoutStickyBottomBar
      :is-submitting="store.status === 'submitting'"
      @submit="promptConfirmation"
    />

    <!-- Confirmation & Success Modals -->
    <CheckoutConfirmModal
      :is-open="store.isConfirmModalOpen"
      :address="fullDeliveryAddress"
      :total="finalTotal"
      @confirm="executeOrder"
      @cancel="store.isConfirmModalOpen = false"
    />
    <CheckoutSuccessModal
      v-if="store.placedOrder"
      :is-open="store.isSuccessModalOpen"
      :order="store.placedOrder"
      @close="store.isSuccessModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useCheckout } from '~/composables/useCheckout';

definePageMeta({ middleware: 'auth' });

const { t, locale } = useI18n();
const {
  store,
  cartStore,
  finalTotal,
  fullDeliveryAddress,
  initCheckout,
  promptConfirmation,
  executeOrder,
} = useCheckout();

useSeo({ title: t('checkout_title'), description: t('checkout_subtitle'), noIndex: true });
useSchemaOrg([
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('home'), item: '/' },
      { '@type': 'ListItem', position: 2, name: t('cart_title'), item: '/cart' },
      { '@type': 'ListItem', position: 3, name: t('checkout_title'), item: '/checkout' },
    ],
  },
]);
const breadcrumbs = computed(() => [
  { label: t('home'), to: '/' },
  { label: t('cart_title'), to: '/cart' },
  { label: t('checkout_title'), to: '/checkout', isCurrent: true },
]);

onMounted(() => {
  initCheckout();
});
watch(locale, () => {
  cartStore.fetchCart();
});
</script>
