<template>
  <!-- [FLUTTER CONCEPT]: Equivalent to OrderDetailItemTile in white_decor/lib/features/orders/presentation/widgets/ -->
  <div class="flex items-center justify-between gap-4 p-4 rounded-2xl border border-mist bg-surface hover:border-gold/30 transition-all">
    <div class="flex items-center gap-3.5 min-w-0 flex-1">
      <NuxtLink :to="productLink" class="block shrink-0">
        <img
          :src="item.product?.image || '/images/placeholder.webp'"
          :alt="item.product_name"
          class="size-16 sm:size-18 rounded-2xl object-cover bg-card border border-mist shadow-xs transition-transform hover:scale-105"
          loading="lazy"
        />
      </NuxtLink>

      <div class="min-w-0 flex-1">
        <NuxtLink :to="productLink">
          <h3 class="text-sm sm:text-base font-black text-ink truncate hover:text-gold transition-colors">
            {{ item.product_name }}
          </h3>
        </NuxtLink>

        <div class="flex items-center gap-2 mt-1 text-xs text-ink-secondary">
          <span class="px-2 py-0.5 rounded-md bg-mist/60 font-bold text-ink text-[11px]">
            {{ item.quantity }}x
          </span>
          <span>{{ item.unit_price }} {{ $t('egp') }}</span>
        </div>

        <!-- Addons Badges (matches Flutter order_detail_item_tile.dart) -->
        <div v-if="addonsList.length > 0" class="mt-2 flex flex-wrap gap-1.5">
          <span
            v-for="(addon, idx) in addonsList"
            :key="idx"
            class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-gold/10 text-gold border border-gold/20"
          >
            <span>•</span>
            <span>{{ getAddonName(addon) }}</span>
            <span v-if="getAddonPrice(addon)" class="text-[10px] opacity-80">
              (+{{ getAddonPrice(addon) }} {{ $t('egp') }})
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

const props = defineProps<{
  item: OrderItemDto;
}>();

const { localize } = useLocalizedPath();

const productLink = computed(() => {
  const pid = props.item.product_id || props.item.product?.id;
  return pid ? localize(`/products/${pid}`) : '#';
});

const addonsList = computed(() => {
  if (Array.isArray(props.item.addons) && props.item.addons.length > 0) {
    return props.item.addons;
  }
  return [];
});

const getAddonName = (addon: any): string => {
  return addon.addon_name || addon.name || addon.addon?.name || addon.title || '';
};

const getAddonPrice = (addon: any): string | null => {
  const p = addon.total_price || addon.unit_price || addon.price || addon.addon?.price;
  return p ? String(p) : null;
};
</script>
