<template>
  <div class="space-y-5">
    <!-- Modern Drawn Decor Divider: UP -->
    <UiDecorDivider />

    <!-- Centered Header Widget -->
    <div class="text-center space-y-1.5 max-w-xl mx-auto px-4">
      <h2 class="text-fluid-h2 font-extrabold text-ink">
        {{ $t('brand_showcase') }}
      </h2>
      <p class="text-xs sm:text-sm text-ink-secondary leading-relaxed">
        {{ $t('brand_showcase_desc') }}
      </p>
    </div>

    <!-- Marquee Track with Full Mouse Drag Support -->
    <div
      class="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      @mouseenter="pause"
      @mouseleave="() => resume(500)"
    >
      <div
        ref="el"
        dir="ltr"
        class="flex gap-3 overflow-x-auto pb-2 scrollbar-none select-none overscroll-x-contain cursor-grab active:cursor-grabbing"
        style="-webkit-overflow-scrolling: touch; touch-action: pan-x pan-y;"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointerleave="onPointerLeave"
        @click.capture="onClickCapture"
      >
        <BrandMarqueeChip
          v-for="(brand, i) in looped"
          :key="`${brand.id}-${i}`"
          :brand="brand"
        />
      </div>
    </div>

    <!-- Centered Action Link -->
    <div class="flex justify-center pt-1">
      <NuxtLink
        :to="localize('/brands')"
        class="inline-flex items-center gap-1.5 rounded-full border border-mist bg-card/90 px-4 py-1.5 text-xs font-bold text-ink shadow-subtle hover:border-gold/60 hover:text-gold hover:shadow-card transition-all"
      >
        <span>{{ $t('all_brands') }}</span>
        <span class="material-symbols-rounded text-sm">{{ forwardIcon }}</span>
      </NuxtLink>
    </div>

    <!-- Modern Drawn Decor Divider: DOWN -->
    <UiDecorDivider />
  </div>
</template>

<script setup lang="ts">
import type { BrandDto } from '~/types/brand';

const props = defineProps<{ brands: BrandDto[] }>();
const { locale } = useI18n();
const { localize } = useLocalizedPath();
const forwardIcon = computed(() => (locale.value === 'ar' ? 'arrow_back' : 'arrow_forward'));

const {
  el,
  pause,
  resume,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onClickCapture,
} = useMarqueeScroll();

const looped = computed(() => {
  if (!props.brands.length) return [];
  const repeatCount = Math.max(4, Math.ceil(24 / props.brands.length));
  return Array(repeatCount).fill(props.brands).flat();
});
</script>
