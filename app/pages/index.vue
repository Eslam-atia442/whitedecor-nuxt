<template>
  <div>
    <UiLoadingOverlay :is-open="isPending" />

    <UiEmptyState
      v-if="isError"
      icon="wifi_off"
      :title="$t('home_error_title')"
      :description="$t('home_error_desc')"
      :action-label="$t('retry')"
      @action="retry"
    />
    <UiEmptyState
      v-else-if="isEmpty"
      icon="chair"
      :title="$t('home_empty_title')"
      :description="$t('home_empty_desc')"
      :action-label="$t('all_products')"
      @action="goProducts"
    />
    <HomeFeedSkeleton v-else-if="isPending" />

    <template v-else>
      <HomeHeroSlider :slides="sliders" />
      <div class="relative mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:space-y-12 lg:px-8 lg:py-12">
        <HomeReveal>
          <HomeCategoryStrip :categories="categories" />
        </HomeReveal>
        <HomeReveal>
          <HomeDealsRail
            :title="$t('flash_deals')"
            :subtitle="$t('flash_deals_subtitle')"
            :products="discounted"
            to="/products?offers=true"
          />
        </HomeReveal>
        <HomeReveal>
          <HomeArrivalsShowcase
            :title="$t('new_arrivals')"
            :subtitle="$t('new_arrivals_subtitle')"
            :products="newest"
            to="/products"
          />
        </HomeReveal>
        <HomeReveal>
          <HomeBestSellers
            :title="$t('best_sellers')"
            :subtitle="$t('best_sellers_subtitle')"
            :products="topSold"
            to="/products"
          />
        </HomeReveal>
        <HomeReveal>
          <UiTrustBadges
            embedded
            :items="whyUsItems"
            :heading="$t('why_us_title')"
            :subheading="$t('why_us_subtitle')"
          />
        </HomeReveal>
        <HomeReveal>
          <HomeTestimonials />
        </HomeReveal>
        <HomeReveal v-if="brands.length">
          <BrandLogoScroller :brands="brands" />
        </HomeReveal>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { WHY_US_ITEMS } from '~/constants/home_content';

definePageMeta({ fullBleed: true });

const whyUsItems = WHY_US_ITEMS;
const router = useRouter();
const localePath = useLocalePath();
const goProducts = () => router.push(localePath('/products'));

const {
  sliders,
  newest,
  discounted,
  topSold,
  categories,
  brands,
  isPending,
  isError,
  isEmpty,
  retry,
} = await useHomeData();
</script>
