<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to OrderDetailItemTile in white_decor/lib/features/orders/ -->
  <div class="flex items-center justify-between gap-4 p-4 rounded-2xl border border-mist bg-surface hover:border-gold/30 transition-all">
    <div class="flex items-center gap-3.5 min-w-0 flex-1">
      <img
        :src="item.product?.image || '/images/placeholder.webp'"
        :alt="item.product_name"
        class="size-16 sm:size-18 rounded-2xl object-cover bg-card border border-mist shrink-0 shadow-xs"
        loading="lazy"
      />

      <div class="min-w-0 flex-1">
        <h3 class="text-sm sm:text-base font-black text-ink truncate">
          {{ item.product_name }}
        </h3>
        
        <div class="flex items-center gap-2 mt-1 text-xs text-ink-secondary">
          <span class="px-2 py-0.5 rounded-md bg-mist/60 font-bold text-ink text-[11px]">
            {{ item.quantity }}x
          </span>
          <span>{{ item.unit_price }} {{ $t('egp') }}</span>
        </div>

        <!-- Addon Badges -->
        <div v-if="item.addons && item.addons.length > 0" class="mt-2 flex flex-wrap gap-1.5">
          <span
            v-for="addon in item.addons"
            :key="addon.id"
            class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-gold/10 text-gold border border-gold/20"
          >
            <span>+</span>
            <span>{{ addon.addon_name || $t('order_addons') }}</span>
            <span v-if="addon.total_price || addon.unit_price" class="text-[10px] opacity-80">
              ({{ addon.total_price || addon.unit_price }} {{ $t('egp') }})
            </span>
          </span>
        </div>
      </div>
    </div>

    <!-- Total Item Price -->
    <div class="text-end shrink-0 ps-3">
      <span class="text-base sm:text-lg font-black text-gold">
        {{ item.total_price }}
      </span>
      <span class="text-xs font-bold text-gold ms-1">{{ $t('egp') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderItemDto } from '~/types/orders';

defineProps<{
  item: OrderItemDto;
}>();
</script>
