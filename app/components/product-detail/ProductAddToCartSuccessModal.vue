<template>
  <UiResponsiveModal
    :is-open="isOpen"
    :title="$t('added_to_cart_success_title')"
    @close="$emit('close')"
  >
    <div class="space-y-6 pt-2 text-center">
      <div class="flex size-16 items-center justify-center rounded-full bg-success/15 text-success mx-auto">
        <span class="material-symbols-rounded text-4xl animate-bounce">check_circle</span>
      </div>

      <div class="space-y-1">
        <h3 class="font-black text-lg text-ink">{{ $t('added_to_cart_success_title') }}</h3>
        <p class="text-xs text-ink-secondary">{{ $t('added_to_cart_success_subtitle') }}</p>
      </div>

      <!-- Item Preview Card -->
      <div class="flex items-center gap-4 p-3.5 rounded-2xl border border-mist bg-surface text-start">
        <div class="relative size-16 shrink-0 overflow-hidden rounded-xl bg-card border border-mist">
          <UiNetworkImage
            :src="product?.image"
            :alt="product?.name"
            fallback-icon="chair"
            class="size-full"
          />
        </div>

        <div class="flex-1 min-w-0 space-y-1">
          <h4 class="font-bold text-sm text-ink truncate">{{ product?.name }}</h4>
          <div class="flex items-center justify-between text-xs">
            <span class="text-ink-secondary font-medium">{{ $t('quantity') }}: <b class="text-ink">{{ quantity }}</b></span>
            <span class="font-black text-gold text-sm">{{ formatPrice(grandTotal) }}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <UiButton variant="primary" size="md" @click="handleGoToCart">
          <span class="material-symbols-rounded text-lg">shopping_cart_checkout</span>
          <span>{{ $t('go_to_cart') }}</span>
        </UiButton>
        <UiButton variant="outline" size="md" @click="$emit('close')">
          <span class="material-symbols-rounded text-lg">storefront</span>
          <span>{{ $t('continue_shopping') }}</span>
        </UiButton>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

const props = defineProps<{
  isOpen: boolean;
  product?: ProductDto | null;
  quantity: number;
  grandTotal: number | string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { push } = useLocalizedPath();
const { formatPrice } = usePriceFormatter();

const handleGoToCart = () => {
  emit('close');
  push('/cart');
};
</script>
