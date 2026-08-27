<template>
  <div class="product-gallery-card rounded-3xl border border-mist bg-card p-4 sm:p-5 shadow-card space-y-4">
    <!-- Main High-Res Image Display Container -->
    <div class="group relative aspect-square w-full overflow-hidden rounded-2xl border border-mist/80 bg-surface/60 shadow-inner flex items-center justify-center select-none">
      <!-- Image or Placeholder -->
      <transition name="fade" mode="out-in">
        <NuxtImg
          v-if="currentImage"
          :key="currentImage"
          :src="currentImage"
          :alt="productName || 'Product Image'"
          loading="eager"
          format="webp"
          class="size-full object-contain p-4 sm:p-6 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />
        <div v-else class="flex size-full items-center justify-center text-gold">
          <span class="material-symbols-rounded text-6xl opacity-30">chair</span>
        </div>
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

      <!-- Prev / Next Slider Arrows (when multiple images exist) -->
      <template v-if="images && images.length > 1">
        <button
          type="button"
          class="absolute start-2 sm:start-3 top-1/2 -translate-y-1/2 flex size-9 sm:size-10 items-center justify-center rounded-full bg-card/85 text-ink shadow-card backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-card hover:text-gold active:scale-90 opacity-85 sm:opacity-0 sm:group-hover:opacity-100 border border-mist z-10"
          aria-label="Previous image"
          @click.stop="prevImage"
        >
          <span class="material-symbols-rounded text-xl sm:text-2xl rtl:rotate-180">chevron_left</span>
        </button>

        <button
          type="button"
          class="absolute end-2 sm:end-3 top-1/2 -translate-y-1/2 flex size-9 sm:size-10 items-center justify-center rounded-full bg-card/85 text-ink shadow-card backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-card hover:text-gold active:scale-90 opacity-85 sm:opacity-0 sm:group-hover:opacity-100 border border-mist z-10"
          aria-label="Next image"
          @click.stop="nextImage"
        >
          <span class="material-symbols-rounded text-xl sm:text-2xl rtl:rotate-180">chevron_right</span>
        </button>

        <!-- Image Counter Pill Bottom-Center -->
        <div class="absolute bottom-3 inset-x-0 flex justify-center z-10 pointer-events-none">
          <div class="inline-flex items-center gap-1.5 rounded-full bg-navy/75 text-white text-[11px] font-bold px-3 py-1 shadow-card backdrop-blur-md border border-white/10 tabular-nums">
            <span>{{ activeIndex + 1 }}</span>
            <span class="opacity-50">/</span>
            <span>{{ images.length }}</span>
          </div>
        </div>
      </template>
    </div>

    <!-- Thumbnail Strip Carousel -->
    <div v-if="images && images.length > 1" class="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none pt-1">
      <button
        v-for="(img, idx) in images"
        :key="img"
        type="button"
        class="relative size-16 sm:size-18 shrink-0 overflow-hidden rounded-2xl border-2 bg-surface/60 p-1.5 transition-all duration-300 hover:scale-105 active:scale-95"
        :class="activeIndex === idx ? 'border-gold shadow-card ring-2 ring-gold/20 scale-102 bg-card' : 'border-mist opacity-60 hover:opacity-100 hover:border-gold/40'"
        @click="$emit('update:activeIndex', idx)"
      >
        <NuxtImg
          :src="img"
          :alt="`${productName || 'Product'} thumbnail ${idx + 1}`"
          loading="lazy"
          format="webp"
          class="size-full object-contain"
        />
      </button>
    </div>
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
