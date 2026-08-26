<template>
  <div class="space-y-10 pb-16 lg:pb-0">
    <UiBreadcrumbs :items="breadcrumbs" />
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <ProductGalleryViewer
        :images="allImages"
        :current-image="currentImage"
        :active-index="activeImageIndex"
        :product-name="product.name"
        :has-discount="hasActiveDiscount"
        :discount-percent="discountPercentage"
        :is-in-stock="isInStock"
        :is-favorite="isFavorite"
        @update:active-index="activeImageIndex = $event"
        @open-zoom="isZoomModalOpen = true"
        @toggle-favorite="toggleFavorite"
      />
      <div class="space-y-6">
        <ProductDealBanner
          v-if="hasActiveDiscount"
          :remaining-seconds="remainingSeconds"
          :save-formatted="formatPrice(effectivePriceNumeric)"
        />
        <ProductHeaderInfo :product="product" :is-in-stock="isInStock" />
        <ProductPriceSection
          :effective-price="effectivePriceNumeric"
          :original-price="product.price"
          :has-discount="hasActiveDiscount"
          :discount-percent="discountPercentage"
        />
        <ProductPerksBar />
        <ProductAddonsPreview
          v-if="product.addons?.length"
          :addons="product.addons"
          :selected-ids="selectedAddonIds"
          @customize="isAddonsModalOpen = true"
        />
        <div class="hidden items-center gap-4 border-t border-mist pt-4 lg:flex">
          <UiQuantityStepper v-model="quantity" :min="1" :max="5" />
          <UiButton variant="primary" size="lg" :disabled="!isInStock" :loading="isAddingToCart" class="flex-1" @click="promptAddToCart">
            <span class="material-symbols-rounded text-xl text-gold">add_shopping_cart</span>
            <span>{{ $t('add_to_cart') }} • {{ formatPrice(grandTotal) }}</span>
          </UiButton>
        </div>
        <ProductInfoSection :product="product" />
      </div>
    </div>
    <ProductRelatedSection :related-products="relatedProducts" />
    <ProductStickyBottomBar
      :price="grandTotal"
      :has-addons="Boolean(product.addons?.length)"
      :is-in-stock="isInStock"
      :loading="isAddingToCart"
      @open-addons="isAddonsModalOpen = true"
      @add-to-cart="promptAddToCart"
    />
    <ProductImageZoomModal
      :is-open="isZoomModalOpen"
      :images="allImages"
      :current-image="currentImage"
      :active-index="activeImageIndex"
      :product-name="product.name"
      @close="isZoomModalOpen = false"
      @update:active-index="activeImageIndex = $event"
    />
    <ProductAddonsModal
      v-if="product.addons?.length"
      :is-open="isAddonsModalOpen"
      :addons="product.addons"
      :selected-ids="selectedAddonIds"
      :quantity="quantity"
      :grand-total="grandTotal"
      @close="isAddonsModalOpen = false"
      @toggle-addon="toggleAddon"
      @update:quantity="quantity = $event"
      @confirm="promptAddToCart"
    />
    <ProductAddToCartConfirmModal
      :is-open="isAddToCartConfirmModalOpen"
      :product-name="product.name || ''"
      :product-image="product.image"
      :loading="isAddingToCart"
      @confirm="confirmAddToCart"
      @cancel="isAddToCartConfirmModalOpen = false"
    />
    <ProductAddToCartSuccessModal
      :is-open="isAddToCartSuccessModalOpen"
      :product="product"
      :quantity="quantity"
      :grand-total="grandTotal"
      @close="isAddToCartSuccessModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { productPath } from '~/utils/catalog_paths';

const { t } = useI18n();
const { formatPrice } = usePriceFormatter();
const detail = useProductDetail();
const product = computed(() => detail.product.value!);
const {
  relatedProducts, allImages, currentImage, activeImageIndex, selectedAddonIds, quantity,
  remainingSeconds, isAddingToCart, isInStock, effectivePriceNumeric, hasActiveDiscount,
  discountPercentage, grandTotal, isFavorite, isZoomModalOpen, isAddonsModalOpen,
  isAddToCartConfirmModalOpen, isAddToCartSuccessModalOpen, toggleFavorite, promptAddToCart,
  confirmAddToCart, toggleAddon,
} = detail;

const breadcrumbs = computed(() => [
  { label: t('home'), to: '/' },
  { label: t('all_products'), to: '/products' },
  ...(product.value.category ? [{ label: product.value.category.name, to: `/categories/${product.value.category.slug}` }] : []),
  { label: product.value.name || '', to: productPath(product.value), isCurrent: true },
]);
</script>
