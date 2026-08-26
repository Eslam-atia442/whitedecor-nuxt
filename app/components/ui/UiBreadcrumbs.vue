<template>
  <nav aria-label="Breadcrumb" class="flex items-center text-xs sm:text-sm text-ink-secondary">
    <ol class="flex flex-wrap items-center gap-1.5 sm:gap-2">
      <li v-for="(item, index) in items" :key="item.to || index" class="flex items-center gap-1.5 sm:gap-2">
        <NuxtLink
          v-if="!item.isCurrent && item.to"
          :to="localize(item.to)"
          class="flex items-center gap-1 transition-colors duration-200 hover:text-gold"
        >
          <span v-if="index === 0" class="material-symbols-rounded text-base">home</span>
          <span>{{ item.label }}</span>
        </NuxtLink>
        <span
          v-else
          class="font-semibold text-ink"
          :aria-current="item.isCurrent ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
        <span
          v-if="index < items.length - 1"
          class="material-symbols-rounded text-xs text-mist rtl:rotate-180 select-none"
        >
          chevron_right
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { CategoryBreadcrumb } from '~/types/category';

defineProps<{
  items: CategoryBreadcrumb[];
}>();

const { localize } = useLocalizedPath();
</script>
