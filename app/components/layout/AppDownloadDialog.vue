<template>
  <UiResponsiveModal :is-open="isOpen" @close="close">
    <div class="relative space-y-5 pb-2 pt-1 text-center">
      <!-- Clean Close Action -->
      <div class="flex justify-end">
        <button
          type="button"
          class="flex size-8 items-center justify-center rounded-full bg-mist/60 text-ink-secondary hover:text-ink hover:bg-mist transition-colors cursor-pointer"
          :aria-label="$t('cancel')"
          @click="close"
        >
          <span class="material-symbols-rounded text-lg">close</span>
        </button>
      </div>

      <!-- Natural, Compelling Store Invite Copy (No logo, no cluttered tags) -->
      <div class="space-y-2 px-2">
        <h3 class="text-xl sm:text-2xl font-bold text-ink tracking-tight">
          {{ $t('app_promo_title') }}
        </h3>
        <p class="text-sm leading-relaxed text-ink-secondary max-w-sm mx-auto">
          {{ $t('app_promo_desc') }}
        </p>
      </div>

      <!-- iOS-Style Store Badges -->
      <div class="pt-2 px-1">
        <UiStoreBadges stacked class="mx-auto max-w-sm" />
      </div>

      <!-- Secondary Web Dismiss Link -->
      <div class="pt-1">
        <button
          type="button"
          class="text-xs font-medium text-ink-secondary hover:text-ink transition-colors underline-offset-4 hover:underline py-1 cursor-pointer"
          @click="close"
        >
          {{ $t('app_promo_continue') }}
        </button>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
const { isOpen, close } = useAppPromoDialog();
</script>
