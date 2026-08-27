<template>
  <div class="max-w-3xl mx-auto space-y-6 pb-16">
    <UiBreadcrumbs :items="breadcrumbs" />

    <!-- Page Title -->
    <div class="text-center space-y-1">
      <h1 class="text-2xl sm:text-3xl font-black text-ink">{{ $t('checkout_title') }}</h1>
      <p class="text-xs sm:text-sm text-ink-secondary">{{ $t('checkout_subtitle') }}</p>
    </div>

    <!-- Loading Skeleton during initial load or language switch -->
    <div v-if="cartStore.isLoading" class="space-y-4 py-4">
      <div class="h-16 rounded-3xl bg-mist/40 animate-pulse" />
      <div class="h-96 rounded-3xl bg-mist/40 animate-pulse" />
    </div>

    <template v-else>
      <!-- iOS Style Stepper Navigation -->
      <CheckoutStepProgress :current-step="store.activeStep" @select-step="store.setStep" />

      <!-- Single Unified iOS Stepped Card -->
      <div class="rounded-3xl border border-mist/80 bg-card p-5 sm:p-7 shadow-card">
        <!-- Step 1: Address & Contact -->
        <div v-show="store.activeStep === 1" class="space-y-6">
          <div class="flex items-center gap-2.5 border-b border-mist/60 pb-3">
            <span class="flex size-7 items-center justify-center rounded-full bg-gold text-navy text-xs font-black">1</span>
            <h2 class="text-base font-black text-ink">{{ $t('step_address') }}</h2>
          </div>
          <CheckoutAddressSection />
          <div class="flex justify-end pt-4 border-t border-mist/60">
            <UiButton variant="primary" size="lg" class="w-full sm:w-auto min-w-40" @click="nextStep">
              <span>{{ $t('next_step') }}</span>
              <span class="material-symbols-rounded text-base">arrow_forward</span>
            </UiButton>
          </div>
        </div>

        <!-- Step 2: Shipping Method -->
        <div v-show="store.activeStep === 2" class="space-y-6">
          <div class="flex items-center gap-2.5 border-b border-mist/60 pb-3">
            <span class="flex size-7 items-center justify-center rounded-full bg-gold text-navy text-xs font-black">2</span>
            <h2 class="text-base font-black text-ink">{{ $t('step_shipping') }}</h2>
          </div>
          <CheckoutShippingSection />
          <div class="flex items-center justify-between gap-3 pt-4 border-t border-mist/60">
            <UiButton variant="outline" size="md" @click="prevStep">{{ $t('prev_step') }}</UiButton>
            <UiButton variant="primary" size="md" class="min-w-36" @click="nextStep">{{ $t('next_step') }}</UiButton>
          </div>
        </div>

        <!-- Step 3: Payment Method -->
        <div v-show="store.activeStep === 3" class="space-y-6">
          <div class="flex items-center gap-2.5 border-b border-mist/60 pb-3">
            <span class="flex size-7 items-center justify-center rounded-full bg-gold text-navy text-xs font-black">3</span>
            <h2 class="text-base font-black text-ink">{{ $t('step_payment') }}</h2>
          </div>
          <CheckoutPaymentSection />
          <div class="flex items-center justify-between gap-3 pt-4 border-t border-mist/60">
            <UiButton variant="outline" size="md" @click="prevStep">{{ $t('prev_step') }}</UiButton>
            <UiButton variant="primary" size="md" class="min-w-36" @click="nextStep">{{ $t('next_step') }}</UiButton>
          </div>
        </div>

        <!-- Step 4: Review, Coupon & Final Order Place -->
        <div v-show="store.activeStep === 4" class="space-y-6">
          <div class="flex items-center gap-2.5 border-b border-mist/60 pb-3">
            <span class="flex size-7 items-center justify-center rounded-full bg-gold text-navy text-xs font-black">4</span>
            <h2 class="text-base font-black text-ink">{{ $t('step_review') }}</h2>
          </div>
          <CheckoutReviewSection />
          <div class="flex items-center justify-between gap-3 pt-4 border-t border-mist/60">
            <UiButton variant="outline" size="md" @click="prevStep">{{ $t('prev_step') }}</UiButton>
            <UiButton variant="primary" size="lg" :loading="store.status === 'submitting'" class="flex-1 sm:flex-initial min-w-48" @click="promptConfirmation">
              <span class="material-symbols-rounded text-lg">verified</span>
              <span>{{ $t('place_order') }}</span>
            </UiButton>
          </div>
        </div>
      </div>
    </template>

    <!-- Confirmation & Success Modals -->
    <CheckoutConfirmModal :is-open="store.isConfirmModalOpen" :address="store.form.address" :total="cartStore.total" @confirm="executeOrder" @cancel="store.isConfirmModalOpen = false" />
    <CheckoutSuccessModal v-if="store.placedOrder" :is-open="store.isSuccessModalOpen" :order="store.placedOrder" @close="store.isSuccessModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { useCheckout } from '~/composables/useCheckout';

definePageMeta({ middleware: 'auth' });

const { t, locale } = useI18n();
const { store, cartStore, initCheckout, nextStep, prevStep, promptConfirmation, executeOrder } = useCheckout();

useSeo({ title: t('checkout_title'), description: t('checkout_subtitle'), noIndex: true });
useSchemaOrg([{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: t('home'), item: '/' }, { '@type': 'ListItem', position: 2, name: t('cart_title'), item: '/cart' }, { '@type': 'ListItem', position: 3, name: t('checkout_title'), item: '/checkout' }] }]);
const breadcrumbs = computed(() => [{ label: t('home'), to: '/' }, { label: t('cart_title'), to: '/cart' }, { label: t('checkout_title'), to: '/checkout', isCurrent: true }]);

onMounted(() => { initCheckout(); });
onUnmounted(() => { store.setStep(1); });
watch(locale, () => { cartStore.fetchCart(); });
</script>
