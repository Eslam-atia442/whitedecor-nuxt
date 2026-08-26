<template>
  <UiResponsiveModal :is-open="isOpen" @close="close">
    <div class="space-y-6 pb-2 text-center">
      <div class="flex justify-end">
        <UiButton variant="ghost" size="icon" :aria-label="$t('cancel')" @click="close">
          <span class="material-symbols-rounded">close</span>
        </UiButton>
      </div>
      <div class="mx-auto flex size-20 items-center justify-center overflow-hidden rounded-[22px] shadow-hover ring-1 ring-mist">
        <img :src="settingsStore.appLogo" :alt="settingsStore.appName" class="size-full object-cover">
      </div>
      <div class="space-y-2">
        <h3 class="text-xl font-extrabold text-ink">{{ settingsStore.appName }}</h3>
        <p class="text-sm leading-relaxed text-ink-secondary">{{ $t('app_promo_desc') }}</p>
      </div>
      <UiStoreBadges stacked class="mx-auto max-w-xs" />
      <UiButton variant="ghost" block @click="close">
        {{ $t('app_promo_continue') }}
      </UiButton>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
const settingsStore = useSettingsStore();
const { isOpen, close } = useAppPromoDialog();
</script>
