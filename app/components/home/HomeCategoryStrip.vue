<template>
  <section v-if="categories.length" class="rounded-3xl bg-card p-4 shadow-card sm:p-6">
    <UiSectionHeader
      :title="$t('categories')"
      :subtitle="$t('home_categories_subtitle')"
      to="/categories"
    />
    <div class="mt-4 flex gap-2.5 overflow-x-auto pb-1 snap-x scrollbar-none sm:flex-wrap sm:overflow-visible">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="localize(`/categories/${category.slug}`)"
        class="group w-[4.25rem] shrink-0 snap-start sm:w-20"
      >
        <div class="aspect-square overflow-hidden rounded-xl bg-surface shadow-card ring-1 ring-mist">
          <NuxtImg
            v-if="category.image"
            :src="category.image"
            :alt="category.name"
            class="size-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div v-else class="flex size-full items-center justify-center text-gold">
            <span class="material-symbols-rounded text-xl opacity-50">category</span>
          </div>
        </div>
        <p class="mt-1.5 truncate text-center text-[10px] font-bold text-ink group-hover:text-gold sm:text-[11px]">
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
</script>
