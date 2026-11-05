<template>
  <div
    class="product-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-mist bg-card shadow-subtle transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-hover"
  >
    <div class="relative aspect-square w-full overflow-hidden bg-surface">
      <NuxtLink :to="href" class="block size-full">
        <UiNetworkImage
          :src="product.image"
          :alt="product.name || 'Product'"
          fallback-icon="chair"
          class="size-full"
          img-class="transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
        />
      </NuxtLink>

      <ProductCardMediaBadges
        :product="product"
        :href="href"
        :is-fav="isFav"
        :is-in-stock="isInStock"
        :has-discount="hasDiscount"
        :has-flash-timer="hasFlashTimer"
        :timer-size="timerSize"
        :discount-percent="discountPercent"
        @toggle-fav="toggleFav"
      />
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
      <ProductCardPrice
        :product="product"
        :has-discount="hasDiscount"
        :effective-price="effectivePrice"
        :discount-percent="discountPercent"
      />
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
  const orig = parsePrice(props.product.price);
  const fin = parsePrice(props.product.final_price);
  return isAct && fin > 0 && fin < orig;
});
const hasFlashTimer = computed(() => Boolean(props.product.discount_end_at && hasDiscount.value));
const effectivePrice = computed(() => (hasDiscount.value ? props.product.final_price : props.product.price));
const discountPercent = computed(() => {
  const orig = parsePrice(props.product.price);
  const fin = parsePrice(props.product.final_price);
  return orig > 0 && fin > 0 && fin < orig ? Math.round(((orig - fin) / orig) * 100) : 0;
});
const toggleFav = () => {
  wishlistStore.toggleFavorite(props.product);
  if (wishlistStore.isFavorite(props.product.id)) toast.success(t('added_to_wishlist'));
};
</script>
