<template>
  <div class="relative w-full">
    <!-- Horizontal Scrollable Container with edge bleed on mobile -->
    <div class="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x touch-pan-x">
      <button
        v-for="tab in filterTabs"
        :key="tab.key"
        type="button"
        :class="[
          'flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 shrink-0 select-none snap-start whitespace-nowrap',
          modelValue === tab.key
            ? 'bg-[#0A0E29] text-[#D4AF37] border border-[#D4AF37]/50 shadow-md ring-2 ring-[#D4AF37]/20 scale-[1.02]'
            : 'bg-card border border-mist text-ink hover:border-gold/60 hover:bg-surface shadow-subtle',
        ]"
        @click="$emit('update:modelValue', tab.key)"
      >
        <span>{{ $t(tab.labelKey) }}</span>
        <span
          v-if="tab.count !== undefined"
          :class="[
            'px-2 py-0.5 rounded-full text-[11px] font-black shrink-0 transition-colors',
            modelValue === tab.key
              ? 'bg-[#D4AF37] text-[#0A0E29]'
              : 'bg-mist text-ink-secondary',
          ]"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderStatus } from '~/types/orders';

const props = defineProps<{
  modelValue: OrderStatus | 'all';
}>();

defineEmits<{
  'update:modelValue': [value: OrderStatus | 'all'];
}>();

const ordersStore = useOrdersStore();

const getCountFor = (status: OrderStatus | 'all'): number => {
  if (status === 'all') return ordersStore.orders.length;
  return ordersStore.orders.filter(
    (o) => (o.status || '').trim().toLowerCase() === status,
  ).length;
};

const filterTabs = computed(() => [
  { key: 'all' as const, labelKey: 'orders_filter_all', count: getCountFor('all') },
  { key: 'pending' as const, labelKey: 'orders_filter_pending', count: getCountFor('pending') },
  { key: 'processing' as const, labelKey: 'orders_filter_processing', count: getCountFor('processing') },
  { key: 'shipping' as const, labelKey: 'orders_filter_shipping', count: getCountFor('shipping') },
  { key: 'delivered' as const, labelKey: 'orders_filter_delivered', count: getCountFor('delivered') },
  { key: 'cancelled' as const, labelKey: 'orders_filter_cancelled', count: getCountFor('cancelled') },
]);
</script>
