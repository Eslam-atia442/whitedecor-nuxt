<template>
  <div
    class="product-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-mist bg-card shadow-subtle transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-hover"
  >
    <div class="relative aspect-square w-full overflow-hidden bg-surface">
      <NuxtLink :to="href" class="block size-full">
        <NuxtImg
          v-if="product.image"
          :src="product.image"
          :alt="product.name || 'Product'"
          loading="lazy"
          format="webp"
          class="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
        />
        <div v-else class="flex size-full items-center justify-center bg-gold/5 text-gold">
          <span class="material-symbols-rounded text-5xl opacity-40">chair</span>
        </div>
      </NuxtLink>

      <div
        v-if="product.discount_end_at && hasDiscount"
        class="absolute z-30"
        :class="timerSize === 'lg' ? 'start-2 top-2' : 'start-1.5 top-1.5'"
      >
        <ProductCardTimer :end-at="product.discount_end_at" :size="timerSize" />
      </div>

      <NuxtLink
        :to="href"
        class="absolute inset-0 z-10 flex items-center justify-center bg-navy/0 transition-all duration-500 group-hover:bg-navy/40 group-hover:backdrop-blur-[2px]"
      >
        <span
          class="flex items-center gap-2 rounded-xl bg-card/90 px-4 py-2.5 text-xs font-bold text-ink shadow-card backdrop-blur-md translate-y-4 scale-90 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
        >
          <span class="material-symbols-rounded text-base text-gold">visibility</span>
          {{ $t('quick_view', 'Quick View') }}
        </span>
      </NuxtLink>

      <!-- Badges Stack -->
      <div
        class="absolute start-3 flex flex-col gap-1.5 pointer-events-none z-20"
        :class="hasFlashTimer ? (timerSize === 'lg' ? 'top-[5.75rem]' : 'top-11') : 'top-3'"
      >
        <UiDiscountBadge v-if="hasDiscount" :percent="discountPercent" size="md" />
        <UiBadge v-if="!isInStock" variant="mist" size="sm">
          {{ $t('out_of_stock', 'Out of Stock') }}
        </UiBadge>
      </div>

      <!-- Wishlist Heart Button -->
      <button
        type="button"
        class="absolute end-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-ink shadow-subtle backdrop-blur-md transition-all duration-300 hover:scale-115 hover:shadow-card active:scale-90 z-30"
        :class="[
          isFav ? 'text-coral ring-2 ring-coral/30' : 'hover:text-coral',
          hasFlashTimer ? (timerSize === 'lg' ? 'top-[5.75rem]' : 'top-11') : 'top-3',
        ]"
        aria-label="Toggle favorite"
        @click.stop="toggleFav"
      >
        <span
          class="material-symbols-rounded text-lg transition-transform duration-300"
          :class="[isFav ? 'font-fill scale-110' : 'scale-100']"
        >favorite</span>
      </button>
    </div>

    <!-- Content & Meta Info -->
    <div class="flex flex-1 flex-col justify-between p-4 sm:p-5">
      <div class="space-y-2">
        <!-- Category & Brand -->
        <div class="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase">
          <span v-if="product.category" class="truncate max-w-[50%] text-ink-secondary/70">
            {{ product.category.name }}
          </span>
          <span
            v-if="product.brand"
            class="truncate max-w-[50%] font-extrabold text-gold"
          >
            {{ product.brand.name }}
          </span>
        </div>

        <!-- Product Name -->
        <NuxtLink :to="href">
          <h3 class="line-clamp-2 text-sm sm:text-[15px] font-bold text-ink transition-colors duration-300 group-hover:text-gold leading-snug">
            {{ product.name }}
          </h3>
        </NuxtLink>

        <!-- Rating Stars (if available) -->
        <div class="flex min-h-5 items-center gap-1.5 pt-0.5">
          <template v-if="product.reviews_avg">
            <div class="flex items-center gap-0.5">
              <span
                v-for="star in 5"
                :key="star"
                class="material-symbols-rounded text-sm font-fill"
                :class="star <= Math.round(Number(product.reviews_avg)) ? 'text-amber-400' : 'text-mist'"
              >star</span>
            </div>
            <span class="text-[10px] font-semibold text-ink-secondary tabular-nums">
              ({{ product.reviews_count || 0 }})
            </span>
          </template>
        </div>
      </div>

      <!-- Price Section -->
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import type { ProductDto } from '~/types/product';
import { productPath } from '~/utils/catalog_paths';

const props = withDefaults(defineProps<{
  product: ProductDto;
  timerSize?: 'sm' | 'lg';
}>(), {
  timerSize: 'sm',
});
const { localize } = useLocalizedPath();
const href = computed(() => localize(productPath(props.product)));
const { formatPrice, parsePrice } = usePriceFormatter();
const wishlistStore = useWishlistStore();
const { t, locale } = useI18n();

const isFav = computed(() => wishlistStore.isFavorite(props.product.id));
const isInStock = computed(() => Boolean(props.product.in_stock === 1 || props.product.in_stock === true || String(props.product.in_stock) === '1'));

const hasDiscount = computed(() => {
  const isAct = Boolean(props.product.is_discount_active === true || props.product.is_discount_active === 1 || String(props.product.is_discount_active) === '1');
  const original = parsePrice(props.product.price);
  const finalP = parsePrice(props.product.final_price);
  return isAct && finalP > 0 && finalP < original;
});

const hasFlashTimer = computed(() => Boolean(props.product.discount_end_at && hasDiscount.value));

const effectivePrice = computed(() => hasDiscount.value ? props.product.final_price : props.product.price);

const discountPercent = computed(() => {
  const orig = parsePrice(props.product.price);
  const fin = parsePrice(props.product.final_price);
  if (orig <= 0 || fin <= 0 || fin >= orig) return 0;
  return Math.round(((orig - fin) / orig) * 100);
});

const toggleFav = () => {
  wishlistStore.toggleFavorite(props.product);
  if (wishlistStore.isFavorite(props.product.id)) {
    toast.success(t('added_to_wishlist'));
  }
};
</script>
