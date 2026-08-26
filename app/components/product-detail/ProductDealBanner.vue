<template>
  <div
    v-if="remainingSeconds && remainingSeconds > 0"
    class="deal-banner group/deal relative overflow-hidden rounded-2xl border border-gold/25 shadow-hover"
  >
    <!-- Animated Background Layers -->
    <div class="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/90 to-navy" />
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(196,154,67,0.15)_0%,transparent_60%)]" />
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(217,108,95,0.1)_0%,transparent_50%)]" />

    <!-- Subtle moving shimmer -->
    <div class="pointer-events-none absolute inset-0 deal-shimmer opacity-30" />

    <!-- Content -->
    <div class="relative z-10 p-4 sm:p-6">
      <!-- Top Row: Icon + Title + Urgency Label -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <!-- Pulsing Fire Icon -->
          <div class="relative flex size-12 shrink-0 items-center justify-center">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/20 to-red-500/20 animate-pulse" />
            <div class="relative flex size-12 items-center justify-center rounded-2xl bg-gold/10 border border-gold/30 shadow-[0_0_20px_rgba(196,154,67,0.15)]">
              <span class="material-symbols-rounded text-2xl text-amber-300 font-fill drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                local_fire_department
              </span>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-2.5 flex-wrap">
              <h4 class="text-base sm:text-lg font-black text-surface tracking-tight">
                {{ $t('flash_deal') }}
              </h4>
              <!-- Animated LIVE badge -->
              <span class="inline-flex items-center gap-1.5 rounded-pill bg-red-500/20 border border-red-400/30 px-2.5 py-0.5 backdrop-blur-sm">
                <span class="relative flex size-2">
                  <span class="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span class="relative inline-flex size-2 rounded-full bg-red-400" />
                </span>
                <span class="text-[10px] font-black text-red-300 uppercase tracking-widest">
                  {{ $t('sale_live', 'LIVE') }}
                </span>
              </span>
            </div>
            <p v-if="saveFormatted" class="mt-0.5 text-xs sm:text-sm font-semibold text-gold-light/90">
              {{ $t('save_amount', { amount: saveFormatted }) }}
            </p>
          </div>
        </div>

        <!-- Live Countdown Timer -->
        <div class="flex justify-start sm:justify-end">
          <ProductDealTimer :seconds="remainingSeconds" />
        </div>
      </div>

      <!-- Urgency Progress Bar -->
      <div class="mt-4 space-y-1.5">
        <div class="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-surface/60">
          <span>{{ $t('hurry_up', 'Hurry! Deal ending soon') }}</span>
          <span class="tabular-nums text-gold-light/80">{{ formattedEndTime }}</span>
        </div>
        <div class="h-1.5 w-full rounded-pill bg-white/10 overflow-hidden">
          <div
            class="h-full rounded-pill bg-gradient-to-r from-amber-400 via-gold to-amber-500 transition-all duration-1000 ease-linear deal-progress-glow"
            :style="{ width: progressPercent + '%' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  remainingSeconds: number | null;
  saveFormatted?: string;
}>();

const { t } = useI18n();

// Compute progress percentage (estimate: assume max deal is 24h)
const progressPercent = computed(() => {
  if (!props.remainingSeconds || props.remainingSeconds <= 0) return 0;
  // Use 24h as baseline, shrinking as time runs out
  const maxSeconds = 24 * 60 * 60;
  return Math.min(100, Math.max(3, (props.remainingSeconds / maxSeconds) * 100));
});

const formattedEndTime = computed(() => {
  if (!props.remainingSeconds || props.remainingSeconds <= 0) return '';
  const h = Math.floor(props.remainingSeconds / 3600);
  const m = Math.floor((props.remainingSeconds % 3600) / 60);
  if (h > 0) return t('hours_left', { count: h }, `${h}h ${m}m left`);
  return t('minutes_left', { count: m }, `${m}m left`);
});
</script>

<style scoped>
.deal-shimmer {
  background: linear-gradient(
    110deg,
    transparent 20%,
    rgba(196, 154, 67, 0.08) 40%,
    rgba(196, 154, 67, 0.15) 50%,
    rgba(196, 154, 67, 0.08) 60%,
    transparent 80%
  );
  background-size: 200% 100%;
  animation: shimmerSlide 4s ease-in-out infinite;
}

@keyframes shimmerSlide {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.deal-progress-glow {
  box-shadow: 0 0 10px rgba(196, 154, 67, 0.5), 0 0 20px rgba(196, 154, 67, 0.2);
}
</style>
