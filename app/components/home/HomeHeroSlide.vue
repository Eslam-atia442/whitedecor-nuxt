<template>
  <div
    class="absolute inset-0 transition-opacity duration-700 ease-out"
    :class="active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
    :aria-hidden="!active"
  >
    <img
      v-if="slide.image"
      :src="slide.image"
      :alt="title"
      class="size-full object-cover"
      :class="active && !reduceMotion ? 'hero-ken-burns' : 'scale-105'"
    >
    <div v-else class="size-full navy-gradient overflow-hidden">
      <div class="hero-aurora pointer-events-none" />
    </div>

    <div class="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/20" />

    <div class="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:justify-center lg:px-8 lg:pb-0">
      <div class="max-w-2xl space-y-4 text-surface">
        <UiBadge variant="gold" size="sm">
          {{ $t('app_name') }} · {{ $t('premium') }}
        </UiBadge>
        <component :is="active ? 'h1' : 'p'" class="text-fluid-h1 font-extrabold leading-tight">
          {{ title }}
        </component>
        <p v-if="subtitle" class="max-w-xl text-sm text-surface/80 sm:text-base">
          {{ subtitle }}
        </p>
        <NuxtLink v-if="ctaTo" :to="localize(ctaTo)" class="inline-flex pt-2">
          <UiButton variant="gold" size="lg">
            <span>{{ $t('home_shop_now') }}</span>
            <span class="material-symbols-rounded text-lg">{{ locale === 'ar' ? 'arrow_back' : 'arrow_forward' }}</span>
          </UiButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SliderDto } from '~/types/home';

const props = defineProps<{ slide: SliderDto; active: boolean }>();
const { t, locale } = useI18n();
const { localize } = useLocalizedPath();
const reduceMotion = ref(true);

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});

const title = computed(() => props.slide.name || (props.slide.titleKey ? t(props.slide.titleKey) : ''));
const subtitle = computed(() => (props.slide.subtitleKey ? t(props.slide.subtitleKey) : ''));
const ctaTo = computed(() => props.slide.url || '/products');
</script>
