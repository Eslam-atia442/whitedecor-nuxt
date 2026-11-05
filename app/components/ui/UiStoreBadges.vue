<template>
  <div class="flex flex-col sm:flex-row gap-3" :class="stacked ? 'w-full !flex-col' : 'items-center justify-center flex-wrap'">
    <!-- Google Play Store Card (Light with Black Border) -->
    <a
      :href="APP_STORES.googlePlay"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative flex min-h-[58px] items-center gap-3.5 rounded-2xl bg-white px-4 py-2.5 text-neutral-900 border-2 border-black shadow-xs transition-all duration-200 hover:bg-neutral-50 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
      :class="stacked ? 'w-full' : 'flex-1 min-w-[200px]'"
    >
      <div class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5">
        <img
          src="/images/stores/ai-google-play.webp"
          alt="Google Play"
          class="size-full object-contain transition-transform duration-200 group-hover:scale-105"
          width="40"
          height="40"
          loading="lazy"
        >
      </div>
      <div class="flex flex-col text-start leading-tight">
        <span class="text-[10px] font-semibold tracking-wider uppercase text-neutral-500">
          {{ $t('store_get_it') }}
        </span>
        <span class="text-sm sm:text-base font-bold text-black tracking-tight">
          {{ $t('store_google_play') }}
        </span>
      </div>
    </a>

    <!-- Apple App Store Card (Active Link) -->
    <a
      v-if="APP_STORES.apple"
      :href="APP_STORES.apple"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative flex min-h-[58px] items-center gap-3.5 rounded-2xl bg-white px-4 py-2.5 text-neutral-900 border-2 border-black shadow-xs transition-all duration-200 hover:bg-neutral-50 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
      :class="stacked ? 'w-full' : 'flex-1 min-w-[200px]'"
    >
      <div class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5">
        <img
          src="/images/stores/ai-apple-store.webp"
          alt="App Store"
          class="size-full object-contain transition-transform duration-200 group-hover:scale-105"
          width="40"
          height="40"
          loading="lazy"
        >
      </div>
      <div class="flex flex-col text-start leading-tight">
        <span class="text-[10px] font-semibold tracking-wider uppercase text-neutral-500">
          {{ $t('store_get_it') }}
        </span>
        <span class="text-sm sm:text-base font-bold text-black tracking-tight">
          {{ $t('store_app_store') }}
        </span>
      </div>
    </a>

    <!-- Apple App Store Card (Coming Soon / Standard Light Card) -->
    <div
      v-else
      class="relative flex min-h-[58px] items-center gap-3.5 rounded-2xl bg-neutral-50/90 px-4 py-2.5 text-neutral-900 border-2 border-black/80 shadow-xs select-none"
      :class="stacked ? 'w-full' : 'flex-1 min-w-[200px]'"
    >
      <div class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 opacity-90">
        <img
          src="/images/stores/ai-apple-store.webp"
          alt="App Store"
          class="size-full object-contain"
          width="40"
          height="40"
          loading="lazy"
        >
      </div>
      <div class="flex flex-col text-start leading-tight">
        <span class="text-[10px] font-semibold tracking-wider uppercase text-neutral-500">
          {{ $t('store_get_it') }}
        </span>
        <span class="text-sm sm:text-base font-bold text-neutral-800 tracking-tight">
          {{ $t('store_app_store') }}
        </span>
      </div>
      <!-- Subtle Clean Tag -->
      <span class="ms-auto inline-flex items-center rounded-full bg-neutral-200/80 px-2.5 py-0.5 text-[11px] font-bold text-neutral-800 border border-neutral-300">
        {{ $t('app_promo_soon') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APP_STORES } from '~/constants/app_stores';

defineProps<{ stacked?: boolean }>();
</script>
