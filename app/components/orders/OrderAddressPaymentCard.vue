<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to OrderDetailShippingCard in white_decor/lib/features/orders/ -->
  <section class="rounded-3xl border border-mist bg-card p-6 shadow-card space-y-4">
    <div class="flex items-center gap-2.5 border-b border-mist pb-4">
      <span class="flex size-9 items-center justify-center rounded-2xl bg-gold/15 text-gold shadow-subtle">
        <span class="material-symbols-rounded text-xl">local_shipping</span>
      </span>
      <h2 class="text-base sm:text-lg font-black text-ink">
        {{ $t('shipping_info') }}
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
      <div v-if="order.name" class="flex items-center gap-3 p-3 rounded-2xl bg-surface border border-mist">
        <span class="flex size-8 items-center justify-center rounded-xl bg-card text-gold shrink-0 border border-mist">
          <span class="material-symbols-rounded text-base">person</span>
        </span>
        <div class="min-w-0">
          <p class="text-[10px] text-ink-secondary font-medium">{{ $t('recipient_name') }}</p>
          <p class="font-bold text-ink truncate">{{ order.name }}</p>
        </div>
      </div>

      <div v-if="order.phone" class="flex items-center gap-3 p-3 rounded-2xl bg-surface border border-mist">
        <span class="flex size-8 items-center justify-center rounded-xl bg-card text-gold shrink-0 border border-mist">
          <span class="material-symbols-rounded text-base">call</span>
        </span>
        <div class="min-w-0">
          <p class="text-[10px] text-ink-secondary font-medium">{{ $t('recipient_phone') }}</p>
          <p dir="ltr" class="font-mono font-bold text-ink">{{ order.phone }}</p>
        </div>
      </div>

      <div v-if="order.address" class="sm:col-span-2 flex items-start gap-3 p-3 rounded-2xl bg-surface border border-mist">
        <span class="flex size-8 items-center justify-center rounded-xl bg-card text-gold shrink-0 border border-mist mt-0.5">
          <span class="material-symbols-rounded text-base">location_on</span>
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-[10px] text-ink-secondary font-medium">{{ $t('delivery_address') }}</p>
          <p class="font-bold text-ink leading-relaxed">{{ order.address }}</p>
        </div>
      </div>

      <div class="sm:col-span-2 flex items-center gap-3 p-3 rounded-2xl bg-surface border border-mist">
        <span class="flex size-8 items-center justify-center rounded-xl bg-card text-gold shrink-0 border border-mist">
          <span class="material-symbols-rounded text-base">payments</span>
        </span>
        <div class="min-w-0">
          <p class="text-[10px] text-ink-secondary font-medium">{{ $t('payment_method') }}</p>
          <p class="font-bold text-ink">{{ $t('payment_cod') }}</p>
        </div>
      </div>
    </div>

    <!-- Notes -->
    <div v-if="order.notes" class="rounded-2xl border border-mist bg-surface p-4">
      <div class="flex items-center gap-1.5 text-xs font-bold text-ink mb-1">
        <span class="material-symbols-rounded text-base text-gold">edit_note</span>
        <span>{{ $t('order_notes') }}</span>
      </div>
      <p class="text-xs text-ink-secondary leading-relaxed">{{ order.notes }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { OrderDto } from '~/types/orders';

defineProps<{
  order: OrderDto;
}>();
</script>
