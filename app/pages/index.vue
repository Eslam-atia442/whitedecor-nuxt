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

      <!-- Categories Container -->
      <div class="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <HomeReveal v-if="categories.length">
          <HomeCategoryStrip :categories="categories" />
        </HomeReveal>
      </div>

      <!-- Full-Width Flash Deals Section with Distinct Warm Background -->
      <section
        v-if="discounted.length"
        class="w-full bg-[#EAE2D2] dark:bg-[#0A0E24] border-y border-[#D6CBB7] dark:border-white/10 py-10 lg:py-14 my-6 sm:my-8 relative overflow-hidden transition-colors"
      >
        <div class="pointer-events-none absolute -top-24 -start-24 size-80 rounded-full bg-gold/10 blur-3xl" />
        <div class="pointer-events-none absolute -bottom-24 -end-24 size-80 rounded-full bg-gold/5 blur-3xl" />

        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HomeReveal>
            <HomeDealsRail
              :title="$t('flash_deals')"
              :subtitle="$t('flash_deals_subtitle')"
              :products="discounted"
              to="/products?offers=true"
            />
          </HomeReveal>
        </div>
      </section>

      <!-- Remaining Sections Container -->
      <div class="relative mx-auto max-w-7xl space-y-8 px-4 pb-8 sm:px-6 lg:space-y-12 lg:px-8 lg:pb-12">
        <HomeReveal v-if="newest.length">
          <HomeArrivalsShowcase
            :title="$t('new_arrivals')"
            :subtitle="$t('new_arrivals_subtitle')"
            :products="newest"
            to="/products"
          />
        </HomeReveal>
        <HomeReveal v-if="topSold.length">
          <HomeBestSellers
            :title="$t('best_sellers')"
            :subtitle="$t('best_sellers_subtitle')"
            :products="topSold"
            to="/products"
          />
        </HomeReveal>
        <HomeReveal v-if="spotlightProducts.length">
          <HomeProductSpotlight :products="spotlightProducts" />
        </HomeReveal>
        <HomeReveal v-if="brands.length">
          <BrandLogoScroller :brands="brands" />
        </HomeReveal>
        <HomeReveal v-if="catalogList.length">
          <HomeChosenForYou :products="catalogList" :seed="chosenSeed" />
        </HomeReveal>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ fullBleed: true });

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
  spotlightProducts,
  catalogList,
  chosenSeed,
  isPending,
  isError,
  isEmpty,
  retry,
} = await useHomeData();
</script>
