<template>
  <div
    class="absolute inset-0 transition-opacity duration-700 ease-out"
    :class="active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
    :aria-hidden="!active"
  >
    <UiNetworkImage
      v-if="slide.image"
      :src="slide.image"
      :alt="title"
      loading="eager"
      fallback-icon="storefront"
      class="absolute inset-0 size-full"
      img-class="transition-transform duration-1000 ease-out"
      :class="active && !reduceMotion ? 'hero-ken-burns' : 'scale-105'"
    />
    <div v-else class="absolute inset-0 size-full navy-gradient overflow-hidden">
      <div class="hero-aurora pointer-events-none" />
    </div>

    <!-- Multi-layered cinematic gradient overlays for high text contrast -->
    <div class="absolute inset-0 bg-navy/30 pointer-events-none" />
    <div class="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent pointer-events-none" />
    <div class="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-navy/85 via-navy/40 to-transparent pointer-events-none" />

    <div class="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20 lg:justify-center lg:pb-0 pointer-events-none">
      <div class="max-w-2xl space-y-3 sm:space-y-4 text-surface pointer-events-auto">
        <!-- Headline with Scale Zoom & Fade -->
        <component
          :is="active ? 'h1' : 'p'"
          class="text-fluid-h1 font-cairo font-extrabold leading-tight text-white drop-shadow-md transition-all duration-700 ease-out"
          :class="active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'"
        >
          {{ title }}
        </component>

        <!-- Subtitle with Slide-up & Fade -->
        <p
          class="max-w-xl text-sm sm:text-base leading-relaxed text-surface/90 drop-shadow-sm transition-all duration-700 delay-200 ease-out"
          :class="active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          {{ subtitle }}
        </p>

        <!-- Action Button with Staggered Entrance -->
        <div
          class="pt-2 transition-all duration-700 delay-300 ease-out"
          :class="active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'"
        >
          <NuxtLink v-if="ctaTo" :to="localize(ctaTo)" class="inline-flex">
            <UiButton variant="gold" size="lg" class="shadow-lg hover:shadow-hover">
              <span>{{ $t('home_shop_now') }}</span>
              <span class="material-symbols-rounded text-lg">{{ locale === 'ar' ? 'arrow_back' : 'arrow_forward' }}</span>
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SliderDto } from '~/types/home';

const props = defineProps<{ slide: SliderDto; active: boolean }>();
const { t, locale } = useI18n();
const { localize } = useLocalizedPath();
const reduceMotion = ref(false);

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});

const title = computed(() => props.slide.name || (props.slide.titleKey ? t(props.slide.titleKey) : ''));
const subtitle = computed(() => {
  if (props.slide.subtitleKey) return t(props.slide.subtitleKey);
  return t('hero_default_subtitle');
});
const ctaTo = computed(() => props.slide.url || '/products');
</script>
