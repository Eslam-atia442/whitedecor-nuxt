<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to OrderCardWidget in white_decor/lib/features/orders/ -->
  <article
    class="group rounded-3xl border border-mist bg-card p-5 sm:p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/40 flex flex-col justify-between"
  >
    <!-- Card Header -->
    <div class="flex items-start justify-between gap-3 border-b border-mist pb-4">
      <div>
        <NuxtLink
          :to="orderDetailUrl"
          class="text-base sm:text-lg font-black text-ink group-hover:text-gold transition-colors inline-flex items-center gap-1.5"
        >
          <span>{{ $t('order_num') }}</span>
          <span class="font-mono text-gold">#{{ order.order_num || order.id }}</span>
        </NuxtLink>
        <p v-if="order.created_at" class="text-xs text-ink-secondary mt-1 flex items-center gap-1.5">
          <span class="material-symbols-rounded text-sm opacity-60">calendar_today</span>
          <span>{{ order.created_at }}</span>
        </p>
      </div>
      <OrderStatusBadge :status="order.status" :label="order.status_label" />
    </div>

    <!-- Items Preview -->
    <div class="py-4">
      <div v-if="order.items && order.items.length > 0" class="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div
          v-for="item in order.items.slice(0, 3)"
          :key="item.id"
          class="flex items-center gap-2.5 rounded-2xl border border-mist bg-surface p-2 shrink-0 max-w-[210px]"
        >
          <img
            :src="item.product?.image || '/images/placeholder.webp'"
            :alt="item.product_name"
            class="size-12 rounded-xl object-cover bg-card border border-mist shrink-0"
            loading="lazy"
          />
          <div class="min-w-0 flex-1 text-xs">
            <p class="truncate font-bold text-ink">{{ item.product_name }}</p>
            <p class="text-ink-secondary text-[11px] mt-0.5 font-medium">
              {{ item.quantity }} × {{ item.unit_price }} {{ $t('egp') }}
            </p>
          </div>
        </div>
        <span
          v-if="order.items.length > 3"
          class="rounded-xl border border-mist bg-surface px-3 py-2 text-xs font-bold text-ink-secondary shrink-0"
        >
          +{{ order.items.length - 3 }} {{ $t('order_items') }}
        </span>
      </div>
      <p v-else class="text-xs text-ink-secondary italic">
        {{ $t('no_notes') }}
      </p>
    </div>

    <!-- Card Footer -->
    <div class="flex items-center justify-between gap-3 pt-4 border-t border-mist mt-auto">
      <div class="flex items-baseline gap-1.5">
        <span class="text-xs text-ink-secondary">{{ $t('total') }}:</span>
        <span class="text-lg sm:text-xl font-black text-gold">
          {{ order.total || order.subtotal || '0' }}
        </span>
        <span class="text-xs font-bold text-gold">{{ $t('egp') }}</span>
      </div>

      <NuxtLink :to="orderDetailUrl">
        <UiButton variant="primary" size="sm">
          <span>{{ $t('view_details_track') }}</span>
          <span class="material-symbols-rounded text-base transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
            arrow_forward
          </span>
        </UiButton>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { OrderDto } from '~/types/orders';

const props = defineProps<{
  order: OrderDto;
}>();

const { localize } = useLocalizedPath();

const orderDetailUrl = computed(() => localize(`/orders/${props.order.order_num || props.order.id}`));
</script>
