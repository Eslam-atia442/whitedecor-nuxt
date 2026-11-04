<template>
  <div class="grid grid-cols-3 gap-3 sm:gap-4">
    <NuxtLink
      :to="localize('/cart')"
      class="group flex flex-col items-center rounded-2xl border border-mist bg-card p-4 text-center shadow-subtle transition hover:border-gold/50 hover:shadow-card active:scale-98"
    >
      <div class="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-navy">
        <span class="material-symbols-rounded text-xl">shopping_bag</span>
      </div>
      <span class="mt-2 text-lg font-bold text-ink sm:text-xl">{{ cartCount }}</span>
      <span class="text-xs text-ink-secondary">{{ $t('in_cart_items') }}</span>
    </NuxtLink>

    <NuxtLink
      :to="localize('/orders')"
      class="group flex flex-col items-center rounded-2xl border border-mist bg-card p-4 text-center shadow-subtle transition hover:border-gold/50 hover:shadow-card active:scale-98"
    >
      <div class="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-navy">
        <span class="material-symbols-rounded text-xl">local_shipping</span>
      </div>
      <span class="mt-2 text-lg font-bold text-ink sm:text-xl">{{ ordersCount }}</span>
      <span class="text-xs text-ink-secondary">{{ $t('total_orders_count') }}</span>
    </NuxtLink>

    <NuxtLink
      :to="localize('/notifications')"
      class="group flex flex-col items-center rounded-2xl border border-mist bg-card p-4 text-center shadow-subtle transition hover:border-gold/50 hover:shadow-card active:scale-98"
    >
      <div class="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-navy">
        <span class="material-symbols-rounded text-xl">notifications</span>
      </div>
      <span class="mt-2 text-lg font-bold text-ink sm:text-xl">{{ notificationsCount }}</span>
      <span class="text-xs text-ink-secondary">{{ $t('notifications') }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const ordersStore = useOrdersStore();
const notificationsStore = useNotificationsStore();
const { localize } = useLocalizedPath();

const cartCount = computed(() => cartStore.itemCount || 0);
const ordersCount = computed(() => ordersStore.pendingOrdersCount || 0);
const notificationsCount = computed(() => notificationsStore.unreadCount || 0);
</script>
