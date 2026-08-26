<template>
  <div
    v-if="ordersStore.pendingOrdersCount > 0"
    class="flex items-center justify-between gap-3 p-4 rounded-2xl bg-gold/10 border border-gold/30 text-ink shadow-subtle"
  >
    <div class="flex items-center gap-3">
      <span class="flex size-9 items-center justify-center rounded-xl bg-gold/20 text-gold shrink-0">
        <span class="material-symbols-rounded text-xl">local_shipping</span>
      </span>
      <span class="text-xs sm:text-sm font-semibold">
        {{ $t('pending_orders_banner') }}
      </span>
    </div>
    <NuxtLink :to="localize('/orders')">
      <UiButton variant="outline" size="sm">
        {{ $t('orders') }}
      </UiButton>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from '~/stores/orders';

const ordersStore = useOrdersStore();
const { localize } = useLocalizedPath();
</script>
