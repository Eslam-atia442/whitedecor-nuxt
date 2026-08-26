<template>
  <section class="rounded-3xl border border-mist bg-card p-6 shadow-card space-y-4">
    <div class="flex items-center justify-between border-b border-mist pb-4">
      <div class="flex items-center gap-2">
        <span class="flex size-8 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <span class="material-symbols-rounded text-lg">shopping_bag</span>
        </span>
        <h2 class="text-base font-black text-ink">
          {{ $t('order_items') }}
        </h2>
      </div>
      <span class="rounded-full bg-surface border border-mist px-3 py-1 text-xs font-bold text-ink-secondary">
        {{ (items || []).length }} {{ $t('items') }}
      </span>
    </div>

    <div class="space-y-3">
      <OrderItemRow
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { OrderItemDto } from '~/types/orders';

withDefaults(
  defineProps<{
    items?: OrderItemDto[] | null;
  }>(),
  {
    items: () => [],
  },
);
</script>
