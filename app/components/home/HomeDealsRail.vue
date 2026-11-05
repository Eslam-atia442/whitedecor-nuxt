<template>
  <section v-if="visible.length" class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="flex size-7 items-center justify-center rounded-lg bg-gold/15 text-gold">
            <span class="material-symbols-rounded text-lg">bolt</span>
          </span>
          <h2 class="text-fluid-h2 font-extrabold text-ink">{{ title }}</h2>
        </div>
        <p v-if="subtitle" class="mt-1 text-xs sm:text-sm text-ink-secondary">{{ subtitle }}</p>
      </div>
      <NuxtLink
        v-if="to"
        :to="localizedTo"
        class="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-mist/80 bg-card/80 px-4 py-1.5 text-xs font-bold text-ink shadow-subtle hover:border-gold/60 hover:text-gold hover:shadow-card transition-all"
      >
        <span>{{ $t('see_all') }}</span>
        <span class="material-symbols-rounded text-sm">{{ forwardIcon }}</span>
      </NuxtLink>
    </div>

    <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <div v-for="product in visible" :key="product.id" class="h-full">
        <ProductCard :product="product" timer-size="sm" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

const props = defineProps<{
  title: string;
  subtitle?: string;
  to?: string;
  products: ProductDto[];
}>();

const { locale } = useI18n();
const { localize } = useLocalizedPath();
const localizedTo = computed(() => (props.to ? localize(props.to) : undefined));
const forwardIcon = computed(() => (locale.value === 'ar' ? 'arrow_back' : 'arrow_forward'));

const visible = computed(() => props.products.slice(0, 4));
</script>
