<template>
  <div class="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-mist bg-card p-4 sm:p-5 shadow-subtle transition-all duration-300 hover:border-gold/30 hover:shadow-card">
    <!-- Thumbnail & Details -->
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <NuxtLink :to="localize(`/products/${item.product_id}`)" class="relative size-20 sm:size-24 shrink-0 overflow-hidden rounded-xl bg-surface border border-mist/60">
        <UiNetworkImage
          :src="item.product?.image"
          :alt="item.product_name"
          fallback-icon="chair"
          class="size-full"
          img-class="transition-transform duration-500 hover:scale-105"
        />
      </NuxtLink>

      <div class="space-y-1.5 min-w-0 flex-1">
        <NuxtLink :to="localize(`/products/${item.product_id}`)" class="block">
          <h3 class="truncate text-sm sm:text-base font-bold text-ink hover:text-gold transition-colors">
            {{ item.product_name || item.product?.name }}
          </h3>
        </NuxtLink>

        <!-- Price with Strikethrough & Discount Tag if on offer -->
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span v-if="item.product?.sku" class="font-mono text-[11px] bg-surface px-1.5 py-0.5 rounded border border-mist/40 text-ink-secondary">
            {{ item.product.sku }}
          </span>
          <span v-if="hasItemDiscount" class="text-xs text-ink-secondary/60 line-through">
            {{ formatPrice(priceInfo.originalPrice) }}
          </span>
          <span class="font-bold text-ink" :class="{ 'text-gold': hasItemDiscount }">
            {{ formatPrice(priceInfo.effectivePrice) }}
          </span>
          <UiDiscountBadge v-if="priceInfo.discountPercent > 0" :percent="priceInfo.discountPercent" size="sm" />
        </div>

        <div v-if="item.addons && item.addons.length > 0" class="flex flex-wrap gap-1.5 pt-1">
          <CartItemAddonBadge
            v-for="addon in item.addons"
            :key="addon.addon_id || addon.id"
            :name="addon.addon?.name || addon.addon_name || 'Addon'"
            :price="addon.addon?.price || addon.unit_price"
            removable
            @remove="$emit('remove-addon', addon.addon_id || addon.id)"
          />
        </div>
      </div>
    </div>

    <!-- Stepper & Actions -->
    <div class="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-mist/40">
      <div class="flex items-center gap-1 rounded-xl border border-mist bg-surface p-1 shadow-subtle">
        <button type="button" class="flex size-7 items-center justify-center rounded-lg text-ink hover:bg-card active:scale-90 disabled:opacity-30 transition-all" :disabled="isLoading || item.quantity <= 1" aria-label="Decrease quantity" @click="$emit('decrement')">
          <span class="material-symbols-rounded text-sm">remove</span>
        </button>
        <span class="w-8 text-center text-xs font-bold text-ink tabular-nums">{{ item.quantity }}</span>
        <button type="button" class="flex size-7 items-center justify-center rounded-lg text-ink hover:bg-card active:scale-90 disabled:opacity-30 transition-all" :disabled="isLoading || item.quantity >= 5" aria-label="Increase quantity" @click="$emit('increment')">
          <span class="material-symbols-rounded text-sm">add</span>
        </button>
      </div>

      <span class="block text-sm sm:text-base font-black text-ink tracking-tight min-w-[70px] text-end">
        {{ formatPrice(itemTotalPrice) }}
      </span>

      <button type="button" class="flex size-8 items-center justify-center rounded-xl text-ink-secondary hover:text-error hover:bg-error/10 active:scale-90 transition-all" :disabled="isLoading" aria-label="Remove item" @click="$emit('remove')">
        <span v-if="isLoading" class="size-4 border-2 border-error/40 border-t-error rounded-full animate-spin" />
        <span v-else class="material-symbols-rounded text-lg">delete</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItemDto } from '~/types/cart';

const props = defineProps<{ item: CartItemDto; isLoading?: boolean }>();
const { localize } = useLocalizedPath();
defineEmits<{(e: 'increment'): void; (e: 'decrement'): void; (e: 'remove'): void; (e: 'remove-addon', addonId: number): void }>();
const { formatPrice, parsePrice, getProductPriceInfo } = usePriceFormatter();

const priceInfo = computed(() => getProductPriceInfo(props.item.product, props.item.unit_price));
const hasItemDiscount = computed(() => priceInfo.value.hasDiscount);

const itemTotalPrice = computed(() => {
  const unit = priceInfo.value.effectivePrice;
  const addSum = (props.item.addons || []).reduce((acc, a) => {
    return acc + (a.addon && !a.addon.is_free ? parsePrice(a.addon.price || a.unit_price) : 0);
  }, 0);
  return (unit + addSum) * (props.item.quantity || 1);
});
</script>
