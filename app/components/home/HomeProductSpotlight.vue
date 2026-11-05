<template>
  <section v-if="items.length" class="space-y-4">
    <UiSectionHeader :title="$t('customer_spotlight')" :subtitle="$t('customer_spotlight_subtitle')" />
    <div
      class="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-card via-card to-gold/5 p-6 shadow-card sm:p-8 cursor-grab active:cursor-grabbing select-none"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
      @click.capture="onClickCapture"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div v-if="activeProduct" class="space-y-5">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white shadow-subtle">
              {{ reviewerName.charAt(0) }}
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-sm font-bold text-ink">{{ reviewerName }}</span>
                <span class="material-symbols-rounded text-sm text-green">verified</span>
              </div>
              <p class="text-xs text-ink-secondary">{{ $t('verified_buyer') }}</p>
            </div>
          </div>
          <div class="flex items-center gap-0.5 text-gold">
            <span v-for="s in 5" :key="s" class="material-symbols-rounded text-base font-fill">star</span>
          </div>
        </div>

        <div class="rounded-2xl border border-mist/40 bg-surface/80 p-3.5 text-xs sm:text-sm italic text-ink-secondary">
          "{{ reviewQuote }}"
        </div>

        <NuxtLink
          :to="activeHref"
          class="group/item flex items-center justify-between gap-4 rounded-2xl border border-mist/60 bg-surface/40 p-3 transition-colors hover:border-gold/50"
        >
          <div class="flex items-center gap-3 min-w-0">
            <UiNetworkImage
              :src="activeProduct.image"
              :alt="activeProduct.name"
              fallback-icon="chair"
              class="size-14 sm:size-16 shrink-0 rounded-xl bg-mist/30"
              img-class="transition-transform group-hover/item:scale-105"
            />
            <div class="min-w-0">
              <h4 class="truncate text-sm sm:text-base font-bold text-ink group-hover/item:text-gold">
                {{ activeProduct.name }}
              </h4>
              <div class="mt-1 flex items-baseline gap-2">
                <span class="text-sm sm:text-base font-extrabold text-navy dark:text-gold">{{ formatPrice(effectivePrice) }}</span>
                <del v-if="hasDiscount" class="text-xs text-ink-secondary/60">{{ formatPrice(activeProduct.price) }}</del>
              </div>
            </div>
          </div>
          <span class="shrink-0 rounded-pill bg-navy px-3.5 py-1.5 text-xs font-bold text-white transition-transform group-hover/item:scale-105">
            {{ $t('view_product') }}
          </span>
        </NuxtLink>
      </div>

      <UiSliderDots v-if="items.length > 1" class="mt-5" :index="index" :count="items.length" @go="go" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';
import { productPath } from '~/utils/catalog_paths';

const props = defineProps<{ products: ProductDto[] }>();
const { t } = useI18n();
const { localize } = useLocalizedPath();
const { formatPrice, parsePrice } = usePriceFormatter();

const items = computed(() => props.products.slice(0, 3));
const {
  index,
  paused,
  go,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClickCapture,
  onTouchStart,
  onTouchEnd,
} = useBannerSlider(() => items.value.length, 6000);

const activeProduct = computed(() => items.value[index.value] || null);
const activeHref = computed(() => (activeProduct.value ? localize(productPath(activeProduct.value)) : '#'));

const reviewerName = computed(() => t(`sample_reviewer_name_${(index.value % 3) + 1}`));
const reviewQuote = computed(() => t(`sample_review_quote_${(index.value % 3) + 1}`));

const hasDiscount = computed(() => {
  if (!activeProduct.value) return false;
  const orig = parsePrice(activeProduct.value.price);
  const fin = parsePrice(activeProduct.value.final_price);
  return Boolean(activeProduct.value.is_discount_active) && fin > 0 && fin < orig;
});

const effectivePrice = computed(() => {
  if (!activeProduct.value) return 0;
  return hasDiscount.value ? activeProduct.value.final_price : activeProduct.value.price;
});
</script>
