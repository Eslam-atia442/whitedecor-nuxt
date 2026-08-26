<template>
  <UiResponsiveModal
    :is-open="isOpen"
    :title="$t('confirm_order_dialog_title')"
    @close="$emit('cancel')"
  >
    <div class="space-y-6 pt-2">
      <div class="flex items-center gap-4 p-4 rounded-2xl border border-gold/30 bg-gold/5">
        <div class="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-gold/10 text-gold shadow-subtle shrink-0">
          <span class="material-symbols-rounded text-3xl">shopping_cart_checkout</span>
        </div>
        <div class="space-y-1 min-w-0 flex-1">
          <p class="text-xs sm:text-sm font-bold text-ink leading-relaxed">
            {{ $t('confirm_order_dialog_msg', { total: formatPrice(total), address: address }) }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-3 border-t border-mist">
        <UiButton variant="outline" size="sm" @click="$emit('cancel')">
          {{ $t('cancel') }}
        </UiButton>
        <UiButton variant="primary" size="sm" @click="$emit('confirm')">
          <span class="material-symbols-rounded text-base">verified</span>
          <span>{{ $t('confirm') }}</span>
        </UiButton>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  address: string;
  total: number | string;
}>();

defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const { formatPrice } = usePriceFormatter();
</script>
