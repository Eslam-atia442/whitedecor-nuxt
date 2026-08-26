<template>
  <div class="space-y-2.5 rounded-2xl border border-mist bg-card p-4 shadow-subtle">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="material-symbols-rounded text-lg text-gold">extension</span>
        <h4 class="text-xs sm:text-sm font-bold text-ink">{{ $t('addons') }}</h4>
      </div>
      <button
        type="button"
        class="text-xs font-bold text-gold hover:underline"
        @click="$emit('customize')"
      >
        {{ $t('details', 'Customize') }}
      </button>
    </div>

    <div class="flex flex-wrap gap-2 pt-1">
      <div
        v-for="addon in addons"
        :key="addon.id"
        class="inline-flex items-center gap-1.5 rounded-xl border border-mist bg-surface px-3 py-1 text-xs text-ink transition-colors cursor-pointer hover:border-gold/40"
        @click="$emit('customize')"
      >
        <span
          class="material-symbols-rounded text-sm"
          :class="selectedIds.includes(addon.id) ? 'text-gold' : 'text-mist'"
        >
          {{ selectedIds.includes(addon.id) ? 'check_circle' : 'radio_button_unchecked' }}
        </span>
        <span class="font-medium">{{ addon.name }}</span>
        <span class="font-bold text-gold">
          {{ addon.is_free ? $t('free') : `+${formatPrice(addon.price)}` }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AddonDto } from '~/types/addon';

defineProps<{
  addons: AddonDto[];
  selectedIds: number[];
}>();

defineEmits<{
  customize: [];
}>();

const { formatPrice } = usePriceFormatter();
</script>
