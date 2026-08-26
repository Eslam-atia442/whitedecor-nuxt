<template>
  <UiResponsiveModal
    :is-open="isOpen"
    :title="$t('filters')"
    @close="$emit('close')"
  >
    <div class="space-y-6 max-h-[72vh] overflow-y-auto pe-1 pb-4" :class="{ 'opacity-60 pointer-events-none': isDisabled }">
      <!-- Categories Section -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-ink uppercase tracking-wider">{{ $t('filter_by_category') }}</label>
          <span v-if="categories.length" class="text-[10px] text-ink-secondary">{{ categories.length }}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            :disabled="isDisabled"
            class="rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-subtle"
            :class="!filters.category_slug ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-navy font-black shadow-md ring-2 ring-gold/40' : 'border border-mist bg-surface text-ink hover:bg-card'"
            @click="$emit('select-category', undefined)"
          >
            {{ $t('all_categories') }}
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            :disabled="isDisabled"
            class="rounded-xl px-3.5 py-2 text-xs font-semibold transition-all shadow-subtle"
            :class="filters.category_slug === cat.slug ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-navy font-black shadow-md ring-2 ring-gold/40' : 'border border-mist bg-surface text-ink hover:bg-card'"
            @click="$emit('select-category', cat.slug)"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Brands Section -->
      <div class="space-y-2.5 border-t border-mist/60 pt-4">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-ink uppercase tracking-wider">{{ $t('filter_by_brand') }}</label>
          <span v-if="brands.length" class="text-[10px] text-ink-secondary">{{ brands.length }}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            :disabled="isDisabled"
            class="rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-subtle"
            :class="!filters.brand_id ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-navy font-black shadow-md ring-2 ring-gold/40' : 'border border-mist bg-surface text-ink hover:bg-card'"
            @click="$emit('select-brand', undefined)"
          >
            {{ $t('all_brands') }}
          </button>
          <button
            v-for="b in brands"
            :key="b.id"
            type="button"
            :disabled="isDisabled"
            class="rounded-xl px-3.5 py-2 text-xs font-semibold transition-all shadow-subtle"
            :class="filters.brand_id === b.id ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-navy font-black shadow-md ring-2 ring-gold/40' : 'border border-mist bg-surface text-ink hover:bg-card'"
            @click="$emit('select-brand', b.id)"
          >
            {{ b.name }}
          </button>
        </div>
      </div>

      <!-- Price Range Section -->
      <div class="space-y-2.5 border-t border-mist/60 pt-4">
        <label class="text-xs font-bold text-ink uppercase tracking-wider">{{ $t('price_range') }}</label>
        <ProductPriceRange
          :min="filters.price_min"
          :max="filters.price_max"
          @apply="(min, max) => $emit('set-price', min, max)"
        />
      </div>

      <!-- Availability & Offers Checkboxes -->
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

      <!-- Action Buttons Sticky Footer -->
      <div class="flex items-center gap-3 pt-4 border-t border-mist sticky -bottom-4 bg-card/95 backdrop-blur-md py-3 -mx-2 px-2 z-20">
        <button
          type="button"
          :disabled="isDisabled"
          class="flex-1 rounded-xl bg-navy py-3 px-4 text-xs font-bold text-gold shadow-hover hover:bg-navy-light transition-all active:scale-95 disabled:opacity-50"
          @click="$emit('close')"
        >
          {{ $t('apply_filter') }}
        </button>
        <button
          type="button"
          :disabled="isDisabled"
          class="rounded-xl border border-mist bg-surface px-4 py-3 text-xs font-bold text-ink-secondary hover:text-coral transition-colors disabled:opacity-50"
          @click="$emit('clear-all')"
        >
          {{ $t('reset_filter') }}
        </button>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
import type { BrandDto } from '~/types/brand';
import type { CategoryDto } from '~/types/category';
import type { ProductFilterParams } from '~/types/product';

withDefaults(
  defineProps<{
    isOpen: boolean;
    filters: ProductFilterParams;
    categories: CategoryDto[];
    brands: BrandDto[];
    isDisabled?: boolean;
  }>(),
  {
    isDisabled: false,
  }
);

defineEmits<{
  close: [];
  'select-category': [slug?: string];
  'select-brand': [id?: number];
  'set-price': [min?: number, max?: number];
  'toggle-in-stock': [];
  'toggle-offers': [];
  'clear-all': [];
}>();
</script>
