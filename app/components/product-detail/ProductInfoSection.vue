<template>
  <div class="product-info-card rounded-3xl border border-mist bg-card p-5 sm:p-6 shadow-card space-y-5">
    <!-- Segmented Tab Header -->
    <div class="flex items-center gap-2 p-1 rounded-2xl bg-surface/70 border border-mist/80 w-fit">
      <button
        type="button"
        class="flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 select-none"
        :class="activeTab === 'desc' ? 'bg-card text-ink shadow-subtle border border-mist/60' : 'text-ink-secondary hover:text-ink hover:bg-card/40'"
        @click="activeTab = 'desc'"
      >
        <span class="material-symbols-rounded text-base text-gold">description</span>
        <span>{{ $t('description', 'الوصف') }}</span>
      </button>

      <button
        type="button"
        class="flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 select-none"
        :class="activeTab === 'specs' ? 'bg-card text-ink shadow-subtle border border-mist/60' : 'text-ink-secondary hover:text-ink hover:bg-card/40'"
        @click="activeTab = 'specs'"
      >
        <span class="material-symbols-rounded text-base text-gold">tune</span>
        <span>{{ $t('product_specifications', 'المواصفات والتفاصيل') }}</span>
      </button>
    </div>

    <!-- Tab 1: Description Content -->
    <div v-if="activeTab === 'desc'" class="space-y-4 text-xs sm:text-sm text-ink-secondary leading-relaxed pt-1">
      <p v-if="product.short_description" class="font-medium text-ink leading-relaxed">
        {{ product.short_description }}
      </p>

      <div v-if="product.description" class="prose dark:prose-invert max-w-none text-ink-secondary leading-relaxed">
        {{ product.description }}
      </div>

      <p v-if="!product.description && !product.short_description" class="text-xs text-ink-secondary/60 py-2">
        {{ $t('no_data', 'لا يوجد وصف متاح') }}
      </p>
    </div>

    <!-- Tab 2: Specifications & Details Table -->
    <div v-else class="space-y-2.5 pt-1 text-xs sm:text-sm">
      <div v-if="product.sku" class="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-surface/50 border border-mist/50">
        <span class="text-ink-secondary font-medium">{{ $t('sku', 'رمز المنتج (SKU)') }}</span>
        <span class="font-mono font-bold text-ink">{{ product.sku }}</span>
      </div>

      <div v-if="product.barcode" class="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-surface/50 border border-mist/50">
        <span class="text-ink-secondary font-medium">{{ $t('barcode', 'الباركود') }}</span>
        <span class="font-mono font-bold text-ink">{{ product.barcode }}</span>
      </div>

      <div v-if="product.brand" class="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-surface/50 border border-mist/50">
        <span class="text-ink-secondary font-medium">{{ $t('brand', 'العلامة التجارية') }}</span>
        <NuxtLink :to="localize(`/products?brand=${product.brand.id}`)" class="font-bold text-gold hover:underline">
          {{ product.brand.name }}
        </NuxtLink>
      </div>

      <div v-if="product.category" class="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-surface/50 border border-mist/50">
        <span class="text-ink-secondary font-medium">{{ $t('category', 'القسم') }}</span>
        <NuxtLink :to="localize(`/categories/${product.category.slug}`)" class="font-bold text-ink hover:text-gold transition-colors">
          {{ product.category.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

defineProps<{
  product: ProductDto;
}>();

const { localize } = useLocalizedPath();
const activeTab = ref<'desc' | 'specs'>('desc');
</script>
