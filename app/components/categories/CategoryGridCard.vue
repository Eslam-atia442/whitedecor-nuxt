<template>
  <NuxtLink
    :to="localize(`/categories/${category.slug}`)"
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-mist bg-card shadow-subtle transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card"
  >
    <!-- Category Image Container with Smooth Zoom -->
    <div class="relative aspect-4/3 w-full overflow-hidden bg-surface">
      <UiNetworkImage
        :src="category.image"
        :alt="category.name"
        fallback-icon="category"
        class="size-full"
        img-class="transition-transform duration-700 ease-out group-hover:scale-108"
      />

      <!-- Subtle Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <!-- Subcategory / Item Count Pill Badge -->
      <div class="absolute top-3 end-3">
        <UiBadge variant="navy" size="sm">
          <span v-if="category.children && category.children.length > 0">
            {{ category.children.length }} {{ $t('subcategories') }}
          </span>
          <span v-else>
            {{ $t('items_count', { count: category.products_count || 0 }) }}
          </span>
        </UiBadge>
      </div>
    </div>

    <!-- Category Meta Details -->
    <div class="flex flex-1 flex-col justify-between p-4 sm:p-5">
      <div>
        <h3 class="text-base sm:text-lg font-bold text-ink transition-colors duration-200 group-hover:text-gold">
          {{ category.name }}
        </h3>
        <p v-if="category.description" class="mt-1 line-clamp-2 text-xs text-ink-secondary leading-relaxed">
          {{ category.description }}
        </p>
      </div>

      <div class="mt-4 flex items-center justify-between pt-3 border-t border-mist/60 text-xs font-bold text-gold">
        <span>{{ $t('view_all_products', 'View Products') }}</span>
        <span class="material-symbols-rounded text-base transition-transform duration-300 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          arrow_forward
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { CategoryDto } from '~/types/category';

defineProps<{
  category: CategoryDto;
}>();

const { localize } = useLocalizedPath();
</script>
