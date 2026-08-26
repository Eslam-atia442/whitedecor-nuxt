<template>
  <UiResponsiveModal
    :is-open="isOpen"
    :title="$t('flash_deal_dialog_title')"
    @close="$emit('close')"
  >
    <div class="space-y-5 p-2 text-center">
      <div class="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gold/15 text-gold shadow-subtle">
        <span class="material-symbols-rounded text-3xl animate-bounce">local_fire_department</span>
      </div>

      <div class="space-y-1.5">
        <h3 class="text-lg font-bold text-ink">
          {{ product?.name }}
        </h3>
        <p class="text-xs text-ink-secondary max-w-sm mx-auto leading-relaxed">
          {{ $t('flash_deal_dialog_desc') }}
        </p>
      </div>

      <div class="flex items-center justify-center gap-3">
        <span class="text-2xl font-extrabold text-ink">{{ formatPrice(product?.final_price || product?.price) }}</span>
        <del v-if="product?.price" class="text-sm text-ink-secondary">{{ formatPrice(product?.price) }}</del>
      </div>

      <div class="flex items-center gap-3 pt-2">
        <UiButton variant="primary" size="lg" class="flex-1" @click="$emit('claim')">
          {{ $t('claim_deal') }}
        </UiButton>
        <UiButton variant="outline" size="lg" @click="$emit('close')">
          {{ $t('explore_now') }}
        </UiButton>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

defineProps<{
  isOpen: boolean;
  product: ProductDto | null;
}>();

defineEmits<{
  close: [];
  claim: [];
}>();

const { formatPrice } = usePriceFormatter();
</script>
