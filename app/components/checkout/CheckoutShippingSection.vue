<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div
        v-for="option in deliveryOptions"
        :key="option.id"
        class="cursor-pointer rounded-2xl border p-4 transition-all space-y-2 relative"
        :class="store.form.deliveryMethod === option.id ? 'border-gold bg-gold/10 shadow-subtle ring-1 ring-gold' : 'border-mist bg-surface hover:border-gold/30'"
        @click="store.form.deliveryMethod = option.id"
      >
        <div class="flex items-center justify-between">
          <span class="flex size-9 items-center justify-center rounded-xl bg-gold/20 text-gold">
            <span class="material-symbols-rounded text-lg">{{ option.icon }}</span>
          </span>
          <span v-if="option.cost === 0" class="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
            {{ $t('free') }}
          </span>
        </div>

        <h3 class="text-xs sm:text-sm font-bold text-ink leading-snug">
          {{ $t(option.titleKey) }}
        </h3>
        <p class="text-[11px] text-ink-secondary leading-relaxed">
          {{ $t(option.descriptionKey) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCheckoutStore } from '~/stores/checkout';
import type { DeliveryOption } from '~/types/checkout';

const store = useCheckoutStore();

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'white_glove',
    titleKey: 'shipping_white_glove',
    descriptionKey: 'shipping_white_glove_desc',
    cost: 0,
    icon: 'verified',
  },
  {
    id: 'express',
    titleKey: 'shipping_express',
    descriptionKey: 'shipping_express_desc',
    cost: 0,
    icon: 'bolt',
  },
  {
    id: 'showroom',
    titleKey: 'shipping_showroom',
    descriptionKey: 'shipping_showroom_desc',
    cost: 0,
    icon: 'storefront',
  },
];
</script>
