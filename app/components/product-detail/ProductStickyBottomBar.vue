<template>
  <div
    class="cart-bar-shadow fixed inset-x-4 bottom-4 z-50 rounded-3xl border border-mist bg-card px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] lg:hidden"
  >
    <div class="flex items-center gap-3">
      <div class="min-w-0 shrink-0">
        <span class="block text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
          {{ $t('total') }}
        </span>
        <span class="block text-base font-bold tracking-tight text-ink">{{ formatPrice(price) }}</span>
      </div>

      <button
        v-if="hasAddons"
        type="button"
        class="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-mist bg-surface text-ink active:scale-95"
        :aria-label="$t('addons')"
        @click="$emit('open-addons')"
      >
        <span class="material-symbols-rounded text-xl text-gold">tune</span>
      </button>

      <button
        type="button"
        :disabled="!isInStock || loading"
        class="cta-heartbeat flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-navy px-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:[animation:none]"
        @click="$emit('add-to-cart')"
      >
        <span v-if="loading" class="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        <template v-else>
          <span class="material-symbols-rounded text-lg">add_shopping_cart</span>
          <span class="truncate">{{ isInStock ? $t('add_to_cart') : $t('out_of_stock') }}</span>
        </template>
      </button>
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
