<template>
  <div class="rounded-2xl border border-mist bg-card p-5 sm:p-6 shadow-subtle space-y-3">
    <!-- Main Price Row -->
    <div class="flex items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-baseline gap-3">
          <span class="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight leading-none">
            {{ formatPrice(effectivePrice) }}
          </span>
          <span class="text-[10px] sm:text-xs text-ink-secondary/60 font-medium">
            {{ $t('vat_inclusive', 'شامل الضريبة') }}
          </span>
        </div>

        <!-- Original Price Strike-through & Clean Save Tag -->
        <div v-if="hasDiscount && originalPrice" class="flex items-center gap-2.5 pt-0.5">
          <del class="text-sm sm:text-base text-ink-secondary/50 font-medium tracking-tight">{{ formatPrice(originalPrice) }}</del>
          <span class="inline-flex items-center rounded-md bg-coral/10 text-coral dark:bg-coral/20 px-2 py-0.5 text-xs font-bold tracking-tight">
            {{ $t('save', 'وفر') }} {{ formatPrice(savingsAmount) }}
          </span>
        </div>
      </div>

      <UiDiscountBadge
        v-if="hasDiscount && discountPercent && discountPercent > 0"
        :percent="discountPercent || 0"
        size="md"
      />
    </div>

    <!-- Installment teaser (optional enhancement) -->
    <div v-if="hasDiscount" class="flex items-center gap-2 rounded-xl bg-gold/5 border border-gold/15 px-3 py-2 text-xs text-ink-secondary">
      <span class="material-symbols-rounded text-base text-gold">info</span>
      <span class="font-semibold">
        {{ $t('limited_offer_hint', 'Limited time offer — price reverts after the deal expires') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  effectivePrice: number | string;
  originalPrice?: string | null;
  hasDiscount?: boolean;
  discountPercent?: number;
}>();

const { formatPrice, parsePrice } = usePriceFormatter();

const savingsAmount = computed(() => {
  const orig = parsePrice(props.originalPrice);
  const eff = parsePrice(props.effectivePrice);
  return Math.max(0, orig - eff);
});
</script>
