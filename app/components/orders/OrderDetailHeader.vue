<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to OrderDetailHeaderCard in white_decor/lib/features/orders/ -->
  <div class="rounded-3xl border border-mist bg-card p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div class="space-y-2">
      <div class="flex flex-wrap items-center gap-3">
        <h1 class="text-xl sm:text-2xl font-black text-ink">
          <span>{{ $t('order_num') }}</span>
          <span class="font-mono text-gold ms-1">#{{ order.order_num || order.id }}</span>
        </h1>
        <OrderStatusBadge :status="order.status" :label="order.status_label" />
      </div>

      <p v-if="order.created_at" class="text-xs sm:text-sm text-ink-secondary flex items-center gap-2">
        <span class="material-symbols-rounded text-base opacity-70">schedule</span>
        <span>{{ $t('order_date') }}: {{ order.created_at }}</span>
      </p>
    </div>

    <!-- Actions: Print Invoice & Support -->
    <div class="flex flex-wrap items-center gap-2.5">
      <UiButton
        variant="outline"
        size="sm"
        @click="printInvoice"
      >
        <span class="material-symbols-rounded text-base">print</span>
        <span>{{ $t('print_invoice') }}</span>
      </UiButton>

      <a
        :href="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex"
      >
        <UiButton variant="outline" size="sm">
          <span class="material-symbols-rounded text-base text-emerald-500">chat</span>
          <span>{{ $t('whatsapp_support') }}</span>
        </UiButton>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderDto } from '~/types/orders';

const props = defineProps<{
  order: OrderDto;
}>();

const { printInvoice, getWhatsAppSupportLink } = useOrderTracking();
const whatsappLink = computed(() => getWhatsAppSupportLink(props.order));
</script>
