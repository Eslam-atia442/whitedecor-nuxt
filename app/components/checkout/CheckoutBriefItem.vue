<template>
  <div class="flex items-center gap-3 py-2.5 border-b border-mist/50 last:border-0">
    <div class="relative size-14 shrink-0 overflow-hidden rounded-xl bg-surface border border-mist/60">
      <NuxtImg
        v-if="item.product?.image"
        :src="item.product.image"
        :alt="item.product_name"
        class="size-full object-cover"
      />
      <div v-else class="flex size-full items-center justify-center text-gold/40">
        <span class="material-symbols-rounded text-2xl">chair</span>
      </div>
      <span class="absolute -top-1.5 -end-1.5 flex size-5 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-surface shadow-subtle">
        {{ item.quantity }}
      </span>
    </div>

    <div class="flex-1 min-w-0 space-y-0.5">
      <h4 class="truncate text-xs font-bold text-ink">
        {{ item.product_name || item.product?.name }}
      </h4>
      <div v-if="item.addons && item.addons.length > 0" class="text-[10px] text-gold font-medium truncate">
        + {{ item.addons.length }} {{ $t('custom_addons') }}
      </div>
      <div class="flex items-center gap-2">
        <span v-if="priceInfo.hasDiscount" class="text-[10px] text-ink-secondary/60 line-through">
          {{ formatPrice(originalTotalPrice) }}
        </span>
        <span class="block text-xs font-black text-ink" :class="{ 'text-gold': priceInfo.hasDiscount }">
          {{ formatPrice(itemTotalPrice) }}
        </span>
        <span v-if="priceInfo.discountPercent > 0" class="bg-gold/15 text-gold text-[9px] font-black px-1 rounded">
          -{{ priceInfo.discountPercent }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItemDto } from '~/types/cart';

const props = defineProps<{ item: CartItemDto }>();
const { formatPrice, parsePrice, getProductPriceInfo } = usePriceFormatter();

const priceInfo = computed(() => getProductPriceInfo(props.item.product, props.item.unit_price));

const addonTotal = computed(() => {
  return (props.item.addons || []).reduce((acc, a) => {
    return acc + (a.addon && !a.addon.is_free ? parsePrice(a.addon.price || a.unit_price) : 0);
  }, 0);
});

const originalTotalPrice = computed(() => (priceInfo.value.originalPrice + addonTotal.value) * (props.item.quantity || 1));
const itemTotalPrice = computed(() => (priceInfo.value.effectivePrice + addonTotal.value) * (props.item.quantity || 1));
</script>
