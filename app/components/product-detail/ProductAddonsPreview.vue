<template>
  <div class="space-y-3 rounded-2xl border border-mist bg-card p-4 sm:p-5 shadow-subtle">
    <!-- Header Row -->
    <div class="flex items-center justify-between border-b border-mist/60 pb-2.5">
      <div class="flex items-center gap-2">
        <span class="material-symbols-rounded text-lg text-gold">tune</span>
        <h4 class="text-xs sm:text-sm font-bold text-ink font-cairo">
          {{ $t('custom_options_title', 'خيارات وإضافات مخصصة') }}
        </h4>
      </div>
      <button
        type="button"
        class="text-xs font-bold text-gold hover:underline cursor-pointer font-cairo"
        @click="$emit('customize')"
      >
        {{ $t('customize', 'تعديل الخيارات') }}
      </button>
    </div>

    <!-- Vertical Sorted List -->
    <div class="space-y-2 pt-0.5">
      <div
        v-for="addon in sortedAddons"
        :key="addon.id"
        class="flex items-center justify-between rounded-xl border p-2.5 sm:p-3 text-xs sm:text-sm transition-all duration-200 cursor-pointer"
        :class="selectedIds.includes(addon.id) ? 'border-gold/60 bg-gold/5 shadow-xs' : 'border-mist/80 bg-surface/50 hover:bg-surface hover:border-mist'"
        @click="$emit('customize')"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <span
            class="material-symbols-rounded text-base sm:text-lg transition-colors shrink-0"
            :class="selectedIds.includes(addon.id) ? 'text-gold font-fill' : 'text-neutral-400'"
          >
            {{ selectedIds.includes(addon.id) ? 'check_circle' : 'radio_button_unchecked' }}
          </span>
          <span class="font-semibold text-ink truncate font-cairo">{{ addon.name }}</span>
        </div>
        <span
          class="shrink-0 font-bold tabular-nums ms-2"
          :class="addon.is_free ? 'text-emerald-600 dark:text-emerald-400' : 'text-gold'"
        >
          {{ addon.is_free ? $t('free') : `+${formatPrice(addon.price)}` }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AddonDto } from '~/types/addon';

const props = defineProps<{
  addons: AddonDto[];
  selectedIds: number[];
}>();

defineEmits<{
  customize: [];
}>();

const { formatPrice } = usePriceFormatter();

const sortedAddons = computed(() => {
  return [...props.addons].sort((a, b) => {
    if (a.is_free && !b.is_free) return -1;
    if (!a.is_free && b.is_free) return 1;
    return (Number(a.price) || 0) - (Number(b.price) || 0);
  });
});
</script>
