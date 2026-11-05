<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to OrdersScreen in white_decor/lib/features/orders/presentation/pages/ -->
  <div class="space-y-6">
    <UiBreadcrumbs :items="breadcrumbs" />

    <!-- Unauthenticated View (matches Flutter UnauthenticatedOrdersView) -->
    <OrderUnauthenticatedView v-if="!authStore.isAuthenticated" />

    <template v-else>
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-ink">
            {{ $t('my_orders') }}
          </h1>
          <p class="text-xs sm:text-sm text-ink-secondary mt-1">
            {{ $t('orders_empty_subtitle') }}
          </p>
        </div>

        <!-- Optional Search Input -->
        <div v-if="ordersStore.orders.length > 2" class="relative w-full sm:w-72 shrink-0">
          <span class="material-symbols-rounded absolute start-3 top-1/2 -translate-y-1/2 text-ink-secondary text-lg pointer-events-none">
            search
          </span>
          <input
            v-model="ordersStore.searchQuery"
            type="search"
            :placeholder="$t('search_orders_hint')"
            class="w-full rounded-2xl border border-mist bg-card py-2.5 ps-9 pe-8 text-xs text-ink placeholder:text-ink-secondary/60 focus:border-gold focus:outline-none transition shadow-subtle"
          />
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div
        v-if="ordersStore.isLoading && ordersStore.orders.length === 0"
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div
          v-for="n in 4"
          :key="n"
          class="h-44 rounded-3xl border border-mist bg-mist/30 animate-pulse"
        />
      </div>

      <!-- Empty State -->
      <OrderEmptyState v-else-if="ordersStore.filteredOrders.length === 0" />

      <!-- Orders Grid: Clean chronological list matching Flutter -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <OrderCard
          v-for="order in ordersStore.filteredOrders"
          :key="order.id"
          :order="order"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useOrdersStore } from '~/stores/orders';

const { t } = useI18n();
const localePath = useLocalePath();
const authStore = useAuthStore();
const ordersStore = useOrdersStore();

useSeo({
  title: t('my_orders'),
  noIndex: true,
});

const breadcrumbs = computed(() => [
  { label: t('home'), to: localePath('/') },
  { label: t('my_orders'), to: localePath('/orders') },
]);

onMounted(() => {
  if (authStore.isAuthenticated) {
    ordersStore.fetchOrders(true);
  }
});

watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (isAuth) {
      ordersStore.fetchOrders(true);
    }
  },
);
</script>
