<template>
  <div v-if="activeFiltersCount > 0" class="flex flex-wrap items-center gap-2 pb-2">
    <!-- Keyword chip -->
    <span v-if="filters.keyword" class="inline-flex items-center gap-1.5 rounded-pill border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
      <span>{{ filters.keyword }}</span>
      <button type="button" :aria-label="$t('clear')" class="hover:opacity-75" @click="$emit('remove-keyword')">
        <span class="material-symbols-rounded text-sm">close</span>
      </button>
    </span>

    <!-- Category chip -->
    <span v-if="categoryName" class="inline-flex items-center gap-1.5 rounded-pill border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
      <span>{{ categoryName }}</span>
      <button type="button" aria-label="Remove category filter" class="hover:opacity-75" @click="$emit('remove-category')">
        <span class="material-symbols-rounded text-sm">close</span>
      </button>
    </span>

    <!-- Brand chip -->
    <span v-if="brandName" class="inline-flex items-center gap-1.5 rounded-pill border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
      <span>{{ brandName }}</span>
      <button type="button" aria-label="Remove brand filter" class="hover:opacity-75" @click="$emit('remove-brand')">
        <span class="material-symbols-rounded text-sm">close</span>
      </button>
    </span>

    <!-- In Stock chip -->
    <span v-if="filters.in_stock === 1" class="inline-flex items-center gap-1.5 rounded-pill border border-mist bg-card px-3 py-1 text-xs font-semibold text-ink">
      <span>{{ $t('in_stock_only') }}</span>
      <button type="button" aria-label="Remove in-stock filter" class="hover:text-coral" @click="$emit('toggle-in-stock')">
        <span class="material-symbols-rounded text-sm">close</span>
      </button>
    </span>

    <!-- Offers chip -->
    <span v-if="filters.only_offers" class="inline-flex items-center gap-1.5 rounded-pill border border-coral/40 bg-coral/10 px-3 py-1 text-xs font-semibold text-coral">
      <span>{{ $t('offers') }}</span>
      <button type="button" aria-label="Remove offers filter" class="hover:opacity-75" @click="$emit('toggle-offers')">
        <span class="material-symbols-rounded text-sm">close</span>
      </button>
    </span>

    <!-- Price range chip -->
    <span v-if="filters.price_min || filters.price_max" class="inline-flex items-center gap-1.5 rounded-pill border border-mist bg-card px-3 py-1 text-xs font-semibold text-ink">
      <span>{{ filters.price_min || 0 }} - {{ filters.price_max || '∞' }} {{ $t('egp') }}</span>
      <button type="button" aria-label="Remove price filter" class="hover:text-coral" @click="$emit('remove-price')">
        <span class="material-symbols-rounded text-sm">close</span>
      </button>
    </span>

    <!-- Clear All button -->
    <button
      type="button"
      class="text-xs font-bold text-coral hover:underline ms-2"
      @click="$emit('clear-all')"
    >
      {{ $t('clear_filters', 'Clear All') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ProductFilterParams } from '~/types/product';

defineProps<{
  filters: ProductFilterParams;
  categoryName?: string;
  brandName?: string;
  activeFiltersCount: number;
}>();

defineEmits<{
  'remove-category': [];
  'remove-brand': [];
  'remove-keyword': [];
  'toggle-in-stock': [];
  'toggle-offers': [];
  'remove-price': [];
  'clear-all': [];
}>();
</script>
