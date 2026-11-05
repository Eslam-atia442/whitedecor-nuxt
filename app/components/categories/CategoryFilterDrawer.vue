<template>
  <UiResponsiveModal
    :is-open="isOpen"
    :title="$t('filter_by_category', 'Category')"
    @close="$emit('close')"
  >
    <div class="space-y-4 max-h-[60vh] overflow-y-auto p-1">
      <button
        type="button"
        class="flex w-full items-center justify-between rounded-xl p-3 text-sm font-semibold transition-colors"
        :class="!selectedSlug ? 'bg-gold/15 text-gold font-bold' : 'text-ink hover:bg-mist/50'"
        @click="onSelect(undefined)"
      >
        <span>{{ $t('all_categories', 'All Categories') }}</span>
        <span v-if="!selectedSlug" class="material-symbols-rounded text-lg text-gold">check</span>
      </button>

      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        class="flex w-full items-center justify-between rounded-xl p-3 text-sm font-semibold transition-colors"
        :class="selectedSlug === cat.slug ? 'bg-gold/15 text-gold font-bold' : 'text-ink hover:bg-mist/50'"
        @click="onSelect(cat.slug)"
      >
        <div class="flex items-center gap-3">
          <UiNetworkImage
            :src="cat.image"
            :alt="cat.name"
            fallback-icon="category"
            class="size-8 rounded-lg shrink-0"
          />
          <span>{{ cat.name }}</span>
        </div>
        <span v-if="selectedSlug === cat.slug" class="material-symbols-rounded text-lg text-gold">check</span>
      </button>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
import type { CategoryDto } from '~/types/category';

defineProps<{
  isOpen: boolean;
  categories: CategoryDto[];
  selectedSlug?: string;
}>();

const emit = defineEmits<{
  close: [];
  select: [slug?: string];
}>();

const onSelect = (slug?: string) => {
  emit('select', slug);
  emit('close');
};
</script>
