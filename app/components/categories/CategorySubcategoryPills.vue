<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
    <button
      type="button"
      :class="[
        'shrink-0 rounded-pill px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200',
        !selectedSlug
          ? 'bg-navy text-surface shadow-subtle'
          : 'border border-mist bg-card text-ink hover:border-gold/40 hover:text-gold'
      ]"
      @click="$emit('select', undefined)"
    >
      {{ $t('all_categories', 'All') }}
    </button>
    <button
      v-for="sub in subcategories"
      :key="sub.id"
      type="button"
      :class="[
        'shrink-0 rounded-pill px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5',
        selectedSlug === sub.slug
          ? 'bg-gold text-navy shadow-subtle'
          : 'border border-mist bg-card text-ink hover:border-gold/40 hover:text-gold'
      ]"
      @click="$emit('select', sub.slug)"
    >
      <span>{{ sub.name }}</span>
      <span
        v-if="sub.products_count"
        class="rounded-full bg-mist/60 px-1.5 py-0.2 text-[10px] text-ink-secondary"
      >
        {{ sub.products_count }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CategoryDto } from '~/types/category';

defineProps<{
  subcategories: CategoryDto[];
  selectedSlug?: string;
}>();

defineEmits<{
  select: [slug?: string];
}>();
</script>
