<template>
  <div class="space-y-1.5">
    <p class="text-xs font-semibold text-ink-secondary">{{ $t('categories') }}</p>
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink">
      {{ category.name }}
    </h1>
    <p v-if="category.description" class="text-xs sm:text-sm text-ink-secondary max-w-xl leading-relaxed">
      {{ category.description }}
    </p>
    <p v-if="category.children?.length" class="text-xs sm:text-sm text-ink-secondary">
      {{ category.children.length }} {{ $t('subcategories') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { CategoryDto } from '~/types/category';

defineProps<{
  category: CategoryDto;
}>();
</script>
