<template>
  <aside
    class="w-full space-y-6 rounded-3xl border border-mist bg-card p-6 shadow-card transition-opacity duration-200"
    :class="{ 'opacity-60 pointer-events-none': isDisabled }"
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-mist pb-4">
      <div class="flex items-center gap-2.5">
        <div class="flex size-8 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <span class="material-symbols-rounded text-lg">tune</span>
        </div>
        <h3 class="text-base font-bold text-ink">{{ $t('filters') }}</h3>
      </div>
      <button
        v-if="activeFiltersCount > 0"
        type="button"
        :disabled="isDisabled"
        class="text-xs font-bold text-coral hover:underline disabled:opacity-40"
        @click="$emit('clear-all')"
      >
        {{ $t('reset_filter') }}
      </button>
    </div>

    <!-- Categories Section -->
    <div class="space-y-3">
      <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink-secondary">
        <span>{{ $t('filter_by_category') }}</span>
        <span v-if="categories.length" class="text-[10px] text-mist">{{ categories.length }}</span>
      </div>
      <div class="space-y-1.5 max-h-48 overflow-y-auto pe-1 scrollbar-thin">
        <button
          type="button"
          :disabled="isDisabled"
          class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all"
          :class="!filters.category_slug ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-navy font-black shadow-md ring-2 ring-gold/40' : 'text-ink hover:bg-surface'"
          @click="$emit('select-category', undefined)"
        >
          <span>{{ $t('all_categories') }}</span>
          <span v-if="!filters.category_slug" class="material-symbols-rounded text-sm text-navy">check</span>
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          :disabled="isDisabled"
          class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all"
          :class="filters.category_slug === cat.slug ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-navy font-black shadow-md ring-2 ring-gold/40' : 'text-ink hover:bg-surface'"
          @click="$emit('select-category', cat.slug)"
        >
          <span class="truncate">{{ cat.name }}</span>
          <span v-if="filters.category_slug === cat.slug" class="material-symbols-rounded text-sm text-navy">check</span>
        </button>
      </div>
    </div>

    <!-- Brands Section -->
    <div class="space-y-3 border-t border-mist/60 pt-4">
      <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink-secondary">
        <span>{{ $t('filter_by_brand') }}</span>
        <span v-if="brands.length" class="text-[10px] text-mist">{{ brands.length }}</span>
      </div>
      <div class="space-y-1.5 max-h-48 overflow-y-auto pe-1 scrollbar-thin">
        <button
          type="button"
          :disabled="isDisabled"
          class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all"
          :class="!filters.brand_id ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-navy font-black shadow-md ring-2 ring-gold/40' : 'text-ink hover:bg-surface'"
          @click="$emit('select-brand', undefined)"
        >
          <span>{{ $t('all_brands') }}</span>
          <span v-if="!filters.brand_id" class="material-symbols-rounded text-sm text-navy">check</span>
        </button>
        <button
          v-for="b in brands"
          :key="b.id"
          type="button"
          :disabled="isDisabled"
          class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all"
          :class="filters.brand_id === b.id ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-navy font-black shadow-md ring-2 ring-gold/40' : 'text-ink hover:bg-surface'"
          @click="$emit('select-brand', b.id)"
        >
          <span class="truncate">{{ b.name }}</span>
          <span v-if="filters.brand_id === b.id" class="material-symbols-rounded text-sm text-navy">check</span>
        </button>
      </div>
    </div>

    <!-- Price Range Section -->
    <div class="space-y-3 border-t border-mist/60 pt-4">
      <h4 class="text-xs font-bold uppercase tracking-wider text-ink-secondary">{{ $t('price_range') }}</h4>
      <ProductPriceRange
        :min="filters.price_min"
        :max="filters.price_max"
        @apply="(min, max) => $emit('set-price', min, max)"
      />
    </div>

    <!-- Stock & Offers Checkboxes -->
    <div class="space-y-3 border-t border-mist/60 pt-4">
      <UiCheckbox
        :model-value="filters.in_stock === 1"
        :label="$t('in_stock_only')"
        @update:model-value="$emit('toggle-in-stock')"
      />
      <UiCheckbox
        :model-value="Boolean(filters.only_offers)"
        :label="$t('offers')"
        @update:model-value="$emit('toggle-offers')"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { BrandDto } from '~/types/brand';
import type { CategoryDto } from '~/types/category';
import type { ProductFilterParams } from '~/types/product';

withDefaults(
  defineProps<{
    filters: ProductFilterParams;
    categories: CategoryDto[];
    brands: BrandDto[];
    activeFiltersCount: number;
    isDisabled?: boolean;
  }>(),
  {
    isDisabled: false,
  }
);

defineEmits<{
  'select-category': [slug?: string];
  'select-brand': [id?: number];
  'set-price': [min?: number, max?: number];
  'toggle-in-stock': [];
  'toggle-offers': [];
  'clear-all': [];
}>();
</script>
