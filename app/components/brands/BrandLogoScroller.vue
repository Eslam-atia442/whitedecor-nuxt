<template>
  <div class="space-y-4">
    <UiSectionHeader
      :title="$t('brand_showcase')"
      :subtitle="$t('brand_showcase_desc')"
      to="/brands"
      :link-label="$t('all_brands')"
    />
    <div
      class="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <div
        ref="el"
        dir="ltr"
        class="flex gap-3 overflow-x-auto pb-1 scrollbar-none touch-pan-x"
        @pointerdown="pause"
        @pointerup="resume"
        @pointercancel="resume"
      >
        <BrandMarqueeChip
          v-for="(brand, i) in looped"
          :key="`${brand.id}-${i}`"
          :brand="brand"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BrandDto } from '~/types/brand';

const props = defineProps<{ brands: BrandDto[] }>();
const { el, pause, resume } = useMarqueeScroll();
const looped = computed(() => [...props.brands, ...props.brands]);
</script>
