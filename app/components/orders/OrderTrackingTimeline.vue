<template>
  <section class="rounded-3xl border border-mist bg-card p-6 sm:p-8 shadow-card">
    <div class="flex items-center gap-2.5 mb-8">
      <span class="flex size-9 items-center justify-center rounded-2xl bg-gold/15 text-gold shadow-subtle">
        <span class="material-symbols-rounded text-xl">timeline</span>
      </span>
      <h2 class="text-base sm:text-lg font-black text-ink">
        {{ $t('track_shipment') }}
      </h2>
    </div>

    <!-- Timeline Container -->
    <div class="relative flex flex-col md:flex-row justify-between gap-6 md:gap-4">
      <!-- Background Connecting Line for Desktop -->
      <div class="hidden md:block absolute top-6 inset-x-10 h-1 rounded-full bg-mist z-0" />
      <div
        class="hidden md:block absolute top-6 start-10 h-1 rounded-full bg-[#D4AF37] transition-all duration-500 z-0"
        :style="{ width: `calc(${progressPercent}% * 0.8)` }"
      />

      <!-- Steps -->
      <div
        v-for="(step, idx) in steps"
        :key="step.key"
        class="relative z-10 flex md:flex-col items-start md:items-center gap-4 md:gap-3.5 flex-1 text-start md:text-center"
      >
        <!-- Step Circle Node -->
        <div
          :class="[
            'size-12 rounded-full flex items-center justify-center font-black text-sm shrink-0 transition-all duration-300 select-none shadow-sm',
            step.isCompleted
              ? 'bg-[#D4AF37] text-[#0A0E29] ring-4 ring-[#D4AF37]/30'
              : step.isCurrent
              ? 'bg-[#0A0E29] text-[#D4AF37] ring-4 ring-[#D4AF37]/50'
              : 'bg-card border-2 border-mist text-ink-secondary',
          ]"
        >
          <span v-if="step.isCompleted" class="material-symbols-rounded text-xl font-black">check</span>
          <span v-else>{{ idx + 1 }}</span>
        </div>

        <!-- Step Text Content -->
        <div class="min-w-0 flex-1">
          <h3
            :class="[
              'text-xs sm:text-sm font-black',
              step.isCompleted || step.isCurrent ? 'text-ink' : 'text-ink-secondary',
            ]"
          >
            {{ $t(step.titleKey) }}
          </h3>
          <p class="text-[11px] text-ink-secondary mt-1 leading-relaxed max-w-[180px] md:mx-auto">
            {{ $t(step.descriptionKey) }}
          </p>
          <p v-if="step.date" class="text-[11px] font-mono font-bold text-gold mt-1.5">
            {{ step.date }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { OrderDto } from '~/types/orders';

const props = defineProps<{
  order: OrderDto;
}>();

const { buildTimelineSteps, getProgressPercent } = useOrderTracking();
const steps = computed(() => buildTimelineSteps(props.order));
const progressPercent = computed(() => getProgressPercent(props.order));
</script>
