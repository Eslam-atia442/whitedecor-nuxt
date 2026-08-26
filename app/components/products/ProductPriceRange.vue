<template>
  <div class="space-y-3">
    <!-- Quick Price Presets -->
    <div class="grid grid-cols-2 gap-1.5">
      <button
        v-for="preset in presets"
        :key="preset.label"
        type="button"
        class="rounded-xl px-2.5 py-1.5 text-[11px] font-bold transition-all text-center truncate border"
        :class="isPresetActive(preset) ? 'bg-gradient-to-r from-amber-500 via-gold to-amber-600 text-navy border-gold shadow-sm' : 'border-mist bg-surface text-ink-secondary hover:text-ink hover:border-gold/30'"
        @click="selectPreset(preset)"
      >
        {{ preset.label }}
      </button>
    </div>

    <!-- Custom Min/Max Inputs -->
    <div class="grid grid-cols-2 gap-2 pt-1">
      <div>
        <label class="block text-[10px] font-bold text-ink-secondary mb-1">{{ $t('min_price') }}</label>
        <div class="relative">
          <input
            v-model.number="localMin"
            type="number"
            min="0"
            placeholder="0"
            class="w-full rounded-xl border border-mist bg-surface px-3 py-2 text-xs font-semibold text-ink placeholder:text-ink-secondary/40 focus:border-gold focus:outline-none transition-colors"
          />
          <span class="absolute end-2.5 top-1/2 -translate-y-1/2 text-[10px] text-ink-secondary font-bold">{{ $t('egp') }}</span>
        </div>
      </div>
      <div>
        <label class="block text-[10px] font-bold text-ink-secondary mb-1">{{ $t('max_price') }}</label>
        <div class="relative">
          <input
            v-model.number="localMax"
            type="number"
            min="0"
            placeholder="10000"
            class="w-full rounded-xl border border-mist bg-surface px-3 py-2 text-xs font-semibold text-ink placeholder:text-ink-secondary/40 focus:border-gold focus:outline-none transition-colors"
          />
          <span class="absolute end-2.5 top-1/2 -translate-y-1/2 text-[10px] text-ink-secondary font-bold">{{ $t('egp') }}</span>
        </div>
      </div>
    </div>

    <!-- Apply Action -->
    <button
      type="button"
      class="flex w-full items-center justify-center gap-1.5 rounded-xl bg-navy py-2 px-3 text-xs font-bold text-gold hover:bg-navy-light transition-all duration-150 active:scale-95 shadow-subtle"
      @click="apply"
    >
      <span class="material-symbols-rounded text-sm">filter_alt</span>
      <span>{{ $t('apply_filter') }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  min?: number;
  max?: number;
}>();

const emit = defineEmits<{
  apply: [min?: number, max?: number];
}>();

const { t } = useI18n();
const localMin = ref<number | undefined>(props.min);
const localMax = ref<number | undefined>(props.max);

watch(() => [props.min, props.max], ([newMin, newMax]) => {
  localMin.value = newMin;
  localMax.value = newMax;
});

const presets = computed(() => [
  { label: `< 500 ${t('egp')}`, min: undefined, max: 500 },
  { label: `500 - 1.5k ${t('egp')}`, min: 500, max: 1500 },
  { label: `1.5k - 5k ${t('egp')}`, min: 1500, max: 5000 },
  { label: `> 5k ${t('egp')}`, min: 5000, max: undefined },
]);

const isPresetActive = (p: { min?: number; max?: number }) => {
  return localMin.value === p.min && localMax.value === p.max;
};

const selectPreset = (p: { min?: number; max?: number }) => {
  localMin.value = p.min;
  localMax.value = p.max;
  emit('apply', localMin.value, localMax.value);
};

const apply = () => {
  emit('apply', localMin.value || undefined, localMax.value || undefined);
};
</script>
