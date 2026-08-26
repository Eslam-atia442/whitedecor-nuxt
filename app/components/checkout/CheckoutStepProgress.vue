<template>
  <div class="rounded-2xl sm:rounded-3xl border border-mist/80 bg-card p-2 sm:p-3 shadow-card space-y-2">
    <!-- iOS Progress Fill Bar -->
    <div class="h-1 w-full bg-mist/50 rounded-full overflow-hidden">
      <div
        class="h-full bg-gold transition-all duration-300 rounded-full"
        :style="{ width: `${(currentStep / steps.length) * 100}%` }"
      />
    </div>

    <!-- iOS Segmented Control Grid -->
    <div class="grid grid-cols-4 gap-1 sm:gap-1.5 p-1 rounded-xl sm:rounded-2xl bg-surface/80 border border-mist/60">
      <button
        v-for="step in steps"
        :key="step.number"
        type="button"
        class="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 sm:px-2 rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none"
        :class="[
          currentStep === step.number
            ? 'bg-card text-ink shadow-sm ring-1 ring-gold/40 font-black'
            : currentStep > step.number
              ? 'bg-card/40 text-ink hover:bg-card/70'
              : 'text-ink-secondary/50 hover:text-ink-secondary/80'
        ]"
        @click="$emit('select-step', step.number)"
      >
        <!-- iOS Circular Badge -->
        <span
          class="flex size-5 sm:size-6 shrink-0 items-center justify-center rounded-full text-[10px] sm:text-xs font-black transition-colors"
          :class="[
            currentStep === step.number
              ? 'bg-gold text-navy shadow-xs'
              : currentStep > step.number
                ? 'bg-gold/15 text-gold'
                : 'bg-mist/60 text-ink-secondary'
          ]"
        >
          <span v-if="currentStep > step.number" class="material-symbols-rounded text-xs font-bold">check</span>
          <span v-else>{{ step.number }}</span>
        </span>

        <!-- Step Name -->
        <span
          class="text-[10px] sm:text-xs truncate transition-colors leading-tight"
          :class="currentStep === step.number ? 'font-black text-ink' : 'font-bold text-ink-secondary/70'"
        >
          {{ $t(step.titleKey) }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: number;
}>();

defineEmits<{
  (e: 'select-step', step: number): void;
}>();

const steps = [
  { number: 1, titleKey: 'step_address' },
  { number: 2, titleKey: 'step_shipping' },
  { number: 3, titleKey: 'step_payment' },
  { number: 4, titleKey: 'step_review' },
];
</script>
