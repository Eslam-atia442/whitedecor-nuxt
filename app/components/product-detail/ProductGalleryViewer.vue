<template>
  <div class="product-gallery-card rounded-3xl border border-mist bg-card p-4 sm:p-5 shadow-card space-y-4">
    <!-- Main High-Res Image Display Container -->
    <div class="group relative aspect-square w-full overflow-hidden rounded-2xl border border-mist/80 bg-surface/60 shadow-inner flex items-center justify-center select-none">
      <!-- Image or Placeholder -->
      <transition name="fade" mode="out-in">
        <UiNetworkImage
          :key="currentImage"
          :src="currentImage"
          :alt="productName || 'Product Image'"
          fit="contain"
          loading="eager"
          fallback-icon="chair"
          class="size-full"
          img-class="p-4 sm:p-6 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />
      </transition>

      <!-- Floating Badges Top-Start -->
      <div class="absolute start-3 sm:start-4 top-3 sm:top-4 flex flex-col gap-2 z-10 pointer-events-none">
        <UiDiscountBadge
          v-if="hasDiscount && discountPercent && discountPercent > 0"
          :percent="discountPercent"
          size="lg"
        />
        <UiBadge v-if="!isInStock" variant="mist" size="md">
          {{ $t('out_of_stock') }}
        </UiBadge>
      </div>

      <!-- Quick Actions Top-End (Wishlist + Zoom Lightbox) -->
      <div class="absolute end-3 sm:end-4 top-3 sm:top-4 flex flex-col gap-2 z-10">
        <button
          type="button"
          class="flex size-10 items-center justify-center rounded-full bg-card/90 text-ink shadow-subtle backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-card active:scale-95 border border-mist/60"
          :class="isFavorite ? 'text-coral ring-2 ring-coral/30' : 'hover:text-coral'"
          aria-label="Wishlist"
          @click="$emit('toggle-favorite')"
        >
          <span class="material-symbols-rounded text-xl transition-transform duration-300" :class="{ 'font-fill scale-110': isFavorite }">
            favorite
          </span>
        </button>

        <button
          v-if="currentImage"
          type="button"
          class="flex size-10 items-center justify-center rounded-full bg-card/90 text-ink shadow-subtle backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-card active:scale-95 border border-mist/60 hover:text-gold"
          aria-label="Zoom image"
          @click="$emit('open-zoom')"
        >
          <span class="material-symbols-rounded text-xl">zoom_in</span>
        </button>
      </div>

      <!-- Prev / Next Slider Arrows & Counter -->
      <ProductGalleryNavControls
        :images="images"
        :active-index="activeIndex"
        @prev="prevImage"
        @next="nextImage"
      />
    </div>

    <!-- Thumbnail Strip Carousel -->
    <ProductGalleryThumbnails
      :images="images"
      :active-index="activeIndex"
      :product-name="productName"
      @select="$emit('update:activeIndex', $event)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[];
  currentImage?: string;
  activeIndex: number;
  productName?: string | null;
  hasDiscount?: boolean;
  discountPercent?: number;
  isInStock?: boolean;
  isFavorite?: boolean;
}>();

const emit = defineEmits<{
  'update:activeIndex': [idx: number];
  'open-zoom': [];
  'toggle-favorite': [];
}>();

const prevImage = () => {
  if (!props.images || props.images.length <= 1) return;
  const newIndex = (props.activeIndex - 1 + props.images.length) % props.images.length;
  emit('update:activeIndex', newIndex);
};

const nextImage = () => {
  if (!props.images || props.images.length <= 1) return;
  const newIndex = (props.activeIndex + 1) % props.images.length;
  emit('update:activeIndex', newIndex);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
