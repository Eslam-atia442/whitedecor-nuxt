<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to OrdersScreen in white_decor/lib/features/orders/presentation/pages/ -->
  <div class="space-y-6">
    <UiBreadcrumbs :items="breadcrumbs" />

    <!-- Enhanced Luxury Header & Search Banner -->
    <div class="relative overflow-hidden rounded-3xl border border-mist bg-card p-6 sm:p-8 shadow-card">
      <div class="absolute -end-10 -top-10 size-40 rounded-full bg-gold/5 blur-2xl pointer-events-none" />
      
      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <!-- Title & Subtitle with Luxury Icon Badge -->
        <div class="flex items-start sm:items-center gap-4">
          <div class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold shadow-subtle">
            <span class="material-symbols-rounded text-3xl">package_2</span>
          </div>
          <div>
            <h1 class="text-2xl sm:text-3xl font-black text-ink">
              {{ $t('my_orders') }}
            </h1>
            <p class="text-xs sm:text-sm text-ink-secondary mt-1 max-w-xl leading-relaxed">
              {{ $t('orders_empty_subtitle') }}
            </p>
          </div>
        </div>

        <!-- Luxury Search Input -->
        <div class="relative w-full lg:w-80 shrink-0">
          <span class="material-symbols-rounded absolute start-3.5 top-1/2 -translate-y-1/2 text-gold text-xl pointer-events-none">
            search
          </span>
          <input
            v-model="ordersStore.searchQuery"
            type="search"
            :placeholder="$t('search_orders_hint')"
            class="w-full rounded-2xl border border-mist bg-surface py-3 ps-11 pe-10 text-xs sm:text-sm text-ink placeholder:text-ink-secondary/60 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-all shadow-xs"
          />
          <button
            v-if="ordersStore.searchQuery"
            type="button"
            class="absolute end-3 top-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded-full bg-mist/60 text-ink-secondary hover:text-ink transition-colors"
            @click="ordersStore.searchQuery = ''"
          >
            <span class="material-symbols-rounded text-sm">close</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Status Filter Tabs Bar -->
    <OrderFilterTabs v-model="ordersStore.activeStatusFilter" />

    <!-- Loading Skeleton -->
    <div
      v-if="ordersStore.isLoading && ordersStore.orders.length === 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <div
        v-for="n in 4"
        :key="n"
        class="h-56 rounded-3xl border border-mist bg-mist/30 animate-pulse"
      />
    </div>

    <!-- Empty State -->
    <OrderEmptyState v-else-if="ordersStore.filteredOrders.length === 0" />

    <!-- Orders Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      <OrderCard
        v-for="order in ordersStore.filteredOrders"
        :key="order.id"
        :order="order"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const { t } = useI18n();
const localePath = useLocalePath();
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
  ordersStore.fetchOrders();
});
</script>
