<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to OrderDetailScreen in white_decor/lib/features/orders/presentation/pages/ -->
  <div class="space-y-6">
    <UiBreadcrumbs :items="breadcrumbs" />

    <!-- Loading Skeleton -->
    <div v-if="ordersStore.isLoading && !currentOrder" class="space-y-6">
      <div class="h-28 rounded-3xl bg-mist/30 animate-pulse border border-mist" />
      <div class="h-44 rounded-3xl bg-mist/30 animate-pulse border border-mist" />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 h-96 rounded-3xl bg-mist/30 animate-pulse border border-mist" />
        <div class="h-96 rounded-3xl bg-mist/30 animate-pulse border border-mist" />
      </div>
    </div>

    <!-- Order Details Content -->
    <div v-else-if="currentOrder" class="space-y-6">
      <!-- Order Header Card -->
      <OrderDetailHeader :order="currentOrder" />

      <!-- Live 4-Step Tracking Timeline -->
      <OrderTrackingTimeline :order="currentOrder" />

      <!-- Organized Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Main Column (Items + Delivery Info) -->
        <div class="lg:col-span-2 space-y-6">
          <OrderItemsList :items="currentOrder.items" />
          <OrderAddressPaymentCard :order="currentOrder" />
        </div>

        <!-- Sticky Side Summary & Actions Column -->
        <div class="space-y-6 lg:sticky lg:top-24">
          <OrderPriceReceipt :order="currentOrder" />
          <OrderActionButtons :order="currentOrder" />
        </div>
      </div>
    </div>

    <!-- Order Not Found -->
    <OrderEmptyState v-else />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const { t } = useI18n();
const ordersStore = useOrdersStore();
const orderIdentifier = computed(() => String(route.params.id || ''));

const currentOrder = computed(() => {
  const key = orderIdentifier.value;
  return (
    ordersStore.orderDetailsMap[key] ||
    ordersStore.orders.find((o) => String(o.id) === key || o.order_num === key) ||
    null
  );
});

const breadcrumbs = computed(() => [
  { label: t('home'), to: '/' },
  { label: t('my_orders'), to: '/orders' },
  { label: `#${currentOrder.value?.order_num || orderIdentifier.value}`, to: `/orders/${orderIdentifier.value}` },
]);

useSeo({
  title: `${t('order_details')} #${currentOrder.value?.order_num || orderIdentifier.value}`,
  noIndex: true,
});

useSchemaOrg([
  {
    '@type': 'Order',
    orderNumber: currentOrder.value?.order_num || String(currentOrder.value?.id || ''),
    orderDate: currentOrder.value?.created_at,
    priceCurrency: 'EGP',
    price: currentOrder.value?.total,
    seller: {
      '@type': 'Organization',
      name: 'White Decor',
      url: 'https://whitedecor.online',
    },
  },
]);

onMounted(() => {
  if (orderIdentifier.value) {
    ordersStore.fetchOrderDetail(orderIdentifier.value);
  }
});
</script>
