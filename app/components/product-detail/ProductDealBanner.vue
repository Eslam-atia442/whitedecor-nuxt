<template>
  <div class="rounded-2xl border border-gold/30 bg-gold/[0.08] px-4 py-3.5 sm:px-5">
    <div class="flex items-center justify-between gap-3">
      <div class="flex min-w-0 items-center gap-2.5">
        <UiSalePulseIcon />
        <p class="text-sm font-semibold text-ink">{{ $t('special_offer') }}</p>
      </div>
      <ProductDealTimer v-if="remainingSeconds && remainingSeconds > 0" :seconds="remainingSeconds" />
    </div>
    <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
      <p v-if="wasFormatted" class="text-xs text-ink-secondary">
        {{ $t('was_price') }}:
        <span class="line-through">{{ wasFormatted }}</span>
      </p>
      <div class="flex items-center gap-2">
        <span
          v-if="saveFormatted"
          class="rounded-md border border-gold/30 bg-gold/15 px-2 py-0.5 text-[11px] font-bold text-ink"
        >
          {{ $t('save') }} {{ saveFormatted }}
        </span>
        <UiDiscountBadge v-if="discountPercent" :percent="discountPercent" size="md" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  remainingSeconds: number | null;
  saveFormatted?: string;
  wasFormatted?: string;
  discountPercent?: number;
}>();
</script>
