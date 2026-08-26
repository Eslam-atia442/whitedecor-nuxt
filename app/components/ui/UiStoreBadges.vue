<template>
  <div class="flex flex-col gap-3" :class="stacked ? 'w-full' : 'flex-row flex-wrap'">
    <a
      :href="APP_STORES.googlePlay"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex min-h-12 items-center gap-3 rounded-xl bg-black px-4 py-2 text-white transition hover:-translate-y-0.5 active:scale-95"
      :class="stacked ? 'w-full justify-center' : ''"
    >
      <iconify-icon icon="simple-icons:googleplay" class="text-2xl text-[#34A853]" />
      <span class="flex flex-col leading-tight text-start">
        <span class="text-[10px] font-medium opacity-80">{{ $t('store_get_it') }}</span>
        <span class="text-sm font-bold">{{ $t('store_google_play') }}</span>
      </span>
    </a>
    <span
      class="relative inline-flex min-h-12 items-center gap-3 rounded-xl bg-black px-4 py-2 text-white"
      :class="stacked ? 'w-full justify-center' : ''"
    >
      <iconify-icon icon="simple-icons:apple" class="text-2xl" />
      <span class="flex flex-col leading-tight text-start">
        <span class="text-[10px] font-medium opacity-80">{{ $t('app_promo_soon') }}</span>
        <span class="text-sm font-bold">{{ $t('store_app_store') }}</span>
      </span>
      <UiBadge variant="gold" size="sm" class="absolute -top-2 end-2">{{ $t('app_promo_soon') }}</UiBadge>
    </span>
  </div>
</template>

<script setup lang="ts">
import { APP_STORES } from '~/constants/app_stores';

defineProps<{ stacked?: boolean }>();
</script>
