<template>
  <div class="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 lg:py-16">
    <div class="space-y-3">
      <h1 class="text-3xl font-extrabold text-ink">{{ $t('sitemap_title') }}</h1>
      <p class="text-sm text-ink-secondary">{{ $t('sitemap_intro') }}</p>
    </div>

    <nav class="space-y-8" :aria-label="$t('sitemap_title')">
      <NuxtLink :to="localize('/')" class="block text-lg font-extrabold text-ink hover:text-gold">
        {{ $t('home') }}
      </NuxtLink>

      <div class="space-y-3">
        <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">{{ $t('footer_shop') }}</p>
        <ul class="space-y-2 text-sm font-bold text-ink-secondary">
          <li><NuxtLink :to="localize('/products')" class="hover:text-gold">{{ $t('all_products') }}</NuxtLink></li>
          <li><NuxtLink :to="localize('/categories')" class="hover:text-gold">{{ $t('categories') }}</NuxtLink></li>
          <li><NuxtLink :to="localize('/brands')" class="hover:text-gold">{{ $t('brands') }}</NuxtLink></li>
        </ul>
        <ul class="space-y-4 pt-2">
          <li v-for="category in categories" :key="category.id" class="space-y-2">
            <NuxtLink :to="localize(`/categories/${category.slug}`)" class="font-extrabold text-ink hover:text-gold">
              {{ category.name }}
            </NuxtLink>
            <ul v-if="category.children?.length" class="ms-4 space-y-1 text-sm text-ink-secondary">
              <li v-for="child in category.children" :key="child.id">
                <NuxtLink :to="localize(`/categories/${child.slug}`)" class="hover:text-gold">{{ child.name }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="flex flex-col gap-2 font-extrabold text-ink">
        <NuxtLink :to="localize('/about')" class="hover:text-gold">{{ $t('legal.about_us') }}</NuxtLink>
        <NuxtLink :to="localize('/privacy')" class="hover:text-gold">{{ $t('legal.privacy_policy') }}</NuxtLink>
        <NuxtLink :to="localize('/terms')" class="hover:text-gold">{{ $t('legal.terms_conditions') }}</NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const { localize } = useLocalizedPath();
const categoriesStore = useCategoriesStore();
const categories = computed(() => categoriesStore.rootCategories);

await useAsyncData(
  () => `sitemap-categories-${locale.value}`,
  () => categoriesStore.fetchCategories({ roots: 1, embed: 'children' }),
);

useSeo({
  title: t('sitemap_title'),
  description: t('sitemap_intro'),
});
</script>
