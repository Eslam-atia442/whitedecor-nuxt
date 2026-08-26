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
      :to="localize('/categories')"
      class="group flex flex-col items-center rounded-2xl border border-mist bg-card p-4 text-center shadow-subtle transition hover:border-gold/50 hover:shadow-card active:scale-98"
    >
      <div class="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-navy">
        <span class="material-symbols-rounded text-xl">favorite</span>
      </div>
      <span class="mt-2 text-lg font-bold text-ink sm:text-xl">{{ wishlistCount }}</span>
      <span class="text-xs text-ink-secondary">{{ $t('wishlist_items_count') }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const ordersStore = useOrdersStore();
const { localize } = useLocalizedPath();

const cartCount = computed(() => cartStore.itemCount || 0);
const ordersCount = computed(() => ordersStore.pendingOrdersCount || 0);
const wishlistCount = computed(() => 0);
</script>
