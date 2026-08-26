<template>
  <div class="fixed inset-x-0 bottom-0 z-40 border-t border-mist bg-card/95 px-4 pt-3 pb-5 sm:pb-4 shadow-glass backdrop-blur-2xl lg:hidden">
    <div class="mx-auto flex max-w-md items-center justify-between gap-3">
      <!-- Price Column -->
      <div class="shrink-0">
        <span class="block text-[10px] uppercase font-bold text-ink-secondary tracking-wider">{{ $t('total') }}</span>
        <span class="block text-base sm:text-lg font-black text-ink tracking-tight">{{ formatPrice(price) }}</span>
      </div>

      <!-- Actions -->
      <div class="flex flex-1 items-center gap-2">
        <!-- Add-ons Button -->
        <button
          v-if="hasAddons"
          type="button"
          class="flex items-center justify-center gap-1.5 rounded-2xl border border-mist bg-surface px-3.5 py-3 text-xs font-bold text-ink shadow-subtle active:scale-95 transition-all hover:border-gold/40"
          @click="$emit('open-addons')"
        >
          <span class="material-symbols-rounded text-base text-gold">tune</span>
          <span class="hidden xs:inline">{{ $t('addons') }}</span>
        </button>

        <!-- Trendy Luxury Add to Cart CTA -->
        <button
          type="button"
          :disabled="!isInStock || loading"
          class="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-navy via-navy-light to-navy border border-gold/40 py-3 px-4 text-xs sm:text-sm font-extrabold text-surface shadow-hover hover:scale-[1.02] active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          @click="$emit('add-to-cart')"
        >
          <span v-if="loading" class="size-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <template v-else>
            <span class="material-symbols-rounded text-lg text-gold animate-bounce">add_shopping_cart</span>
            <span class="truncate">{{ isInStock ? $t('add_to_cart') : $t('out_of_stock') }}</span>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  price: number | string;
  hasAddons?: boolean;
  isInStock?: boolean;
  loading?: boolean;
}>();

defineEmits<{
  'open-addons': [];
  'add-to-cart': [];
}>();

const { formatPrice } = usePriceFormatter();
</script>
