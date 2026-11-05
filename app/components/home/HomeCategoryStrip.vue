<template>
  <section v-if="categories.length" class="space-y-4">
    <UiSectionHeader
      :title="$t('categories')"
      :subtitle="$t('home_categories_subtitle')"
      to="/categories"
    />
    <div
      ref="scroller"
      class="flex gap-3 overflow-x-auto pb-2 pt-1 snap-x scrollbar-none sm:flex-wrap sm:overflow-visible cursor-grab active:cursor-grabbing select-none"
      style="-webkit-overflow-scrolling: touch; touch-action: pan-x pan-y;"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerLeave"
      @pointercancel="onPointerCancel"
      @click.capture="onClickCapture"
    >
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="localize(`/categories/${category.slug}`)"
        class="group w-20 shrink-0 snap-start sm:w-24 text-center"
      >
        <div class="aspect-square overflow-hidden rounded-2xl bg-surface/90 p-1 shadow-subtle ring-1 ring-mist/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card group-hover:ring-gold/50">
          <UiNetworkImage
            :src="category.image"
            :alt="category.name"
            fallback-icon="category"
            class="size-full rounded-xl"
            img-class="transition duration-500 group-hover:scale-105"
          />
        </div>
        <p class="mt-2 truncate text-xs font-bold text-ink transition-colors group-hover:text-gold">
          {{ category.name }}
        </p>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CategoryDto } from '~/types/category';

defineProps<{ categories: CategoryDto[] }>();

const { localize } = useLocalizedPath();
const scroller = ref<HTMLElement | null>(null);
const {
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onClickCapture,
} = useDragScroll(scroller);
</script>
