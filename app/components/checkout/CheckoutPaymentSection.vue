<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div
        v-for="option in paymentOptions"
        :key="option.id"
        class="cursor-pointer rounded-2xl border p-4 transition-all space-y-2 relative"
        :class="store.form.paymentMethod === option.id ? 'border-gold bg-gold/10 shadow-subtle ring-1 ring-gold' : 'border-mist bg-surface hover:border-gold/30'"
        @click="store.form.paymentMethod = option.id"
      >
        <div class="flex items-center justify-between">
          <span class="flex size-9 items-center justify-center rounded-xl bg-gold/20 text-gold">
            <span class="material-symbols-rounded text-lg">{{ option.icon }}</span>
          </span>
          <span v-if="option.badge" class="text-[10px] font-bold text-gold bg-gold/15 px-2 py-0.5 rounded-full">
            {{ option.badge }}
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
import type { PaymentOption } from '~/types/checkout';

const store = useCheckoutStore();

const paymentOptions: PaymentOption[] = [
  {
    id: 'cod',
    titleKey: 'payment_cod',
    descriptionKey: 'payment_cod_desc',
    icon: 'payments',
  },
  {
    id: 'card',
    titleKey: 'payment_card',
    descriptionKey: 'payment_card_desc',
    icon: 'credit_card',
  },
  {
    id: 'installments',
    titleKey: 'payment_installments',
    descriptionKey: 'payment_installments_desc',
    icon: 'pie_chart',
    badge: '4 Payments',
  },
];
</script>
