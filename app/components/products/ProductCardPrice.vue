<template>
  <div class="mt-auto min-h-[3.5rem] border-t border-mist/50 pt-3">
    <div class="flex items-end justify-between gap-2">
      <div class="space-y-0.5">
        <span class="block text-lg sm:text-xl font-black text-ink tracking-tight leading-none">
          {{ formatPrice(effectivePrice) }}
        </span>
        <div class="flex min-h-5 items-center gap-2 pt-0.5">
          <template v-if="hasDiscount && product.price">
            <del class="text-[11px] text-ink-secondary/60 font-medium">
              {{ formatPrice(product.price) }}
            </del>
            <span class="text-[11px] font-bold text-coral">
              {{ locale === 'ar' ? `خصم ${discountPercent}%` : `${discountPercent}% off` }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

const props = defineProps<{
  product: ProductDto;
  hasDiscount: boolean;
  effectivePrice?: string | number | null;
  discountPercent: number;
}>();

const { formatPrice } = usePriceFormatter();
const { locale } = useI18n();
</script>

