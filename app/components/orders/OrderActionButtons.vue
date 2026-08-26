<template>
  <div class="rounded-3xl border border-mist bg-card p-6 shadow-card space-y-3">
    <!-- Back to Orders Button -->
    <NuxtLink :to="localize('/orders')" class="block">
      <UiButton variant="primary" size="md" block>
        <span class="material-symbols-rounded text-base rtl:rotate-180">arrow_back</span>
        <span>{{ $t('back_to_orders') }}</span>
      </UiButton>
    </NuxtLink>

    <!-- Print Invoice Button -->
    <UiButton
      variant="outline"
      size="md"
      block
      @click="printInvoice"
    >
      <span class="material-symbols-rounded text-base">print</span>
      <span>{{ $t('print_invoice') }}</span>
    </UiButton>

    <!-- WhatsApp Support Link -->
    <a
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      class="block"
    >
      <UiButton variant="ghost" size="sm" block class="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10">
        <span class="material-symbols-rounded text-base">chat</span>
        <span>{{ $t('whatsapp_support') }}</span>
      </UiButton>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { OrderDto } from '~/types/orders';

const props = defineProps<{
  order: OrderDto;
}>();

const { printInvoice, getWhatsAppSupportLink } = useOrderTracking();
const { localize } = useLocalizedPath();
const whatsappLink = computed(() => getWhatsAppSupportLink(props.order));
</script>
