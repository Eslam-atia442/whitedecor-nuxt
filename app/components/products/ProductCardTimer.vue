<template>
  <div
    v-if="remainingSeconds && remainingSeconds > 0"
    class="flash-timer-card flex items-center gap-2 bg-gradient-to-r from-navy/95 via-navy to-navy/95 border-t border-gold/20 px-3 py-2 text-surface backdrop-blur-md select-none"
  >
    <!-- Fire Icon -->
    <span class="material-symbols-rounded text-sm text-amber-400 animate-pulse drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]">
      local_fire_department
    </span>

    <!-- Flash Sale Label -->
    <span class="text-[10px] sm:text-[11px] font-extrabold text-gold tracking-wider uppercase">
      {{ $t('flash_deal', 'Flash') }}
    </span>

    <!-- Timer Digits -->
    <div class="flex items-center gap-0.5 ms-auto">
      <!-- Hours -->
      <div class="timer-digit-box">
        <span class="timer-digit">{{ hh[0] }}</span>
      </div>
      <div class="timer-digit-box">
        <span class="timer-digit">{{ hh[1] }}</span>
      </div>

      <span class="text-gold/80 font-black text-[10px] animate-pulse mx-0.5">:</span>

      <!-- Minutes -->
      <div class="timer-digit-box">
        <span class="timer-digit">{{ mm[0] }}</span>
      </div>
      <div class="timer-digit-box">
        <span class="timer-digit">{{ mm[1] }}</span>
      </div>

      <span class="text-gold/80 font-black text-[10px] animate-pulse mx-0.5">:</span>

      <!-- Seconds -->
      <div class="timer-digit-box">
        <span class="timer-digit" :key="'s0-' + ss[0]">{{ ss[0] }}</span>
      </div>
      <div class="timer-digit-box">
        <span class="timer-digit timer-digit--tick" :key="'s1-' + ss[1]">{{ ss[1] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  endAt?: string | null;
}>();

const remainingSeconds = ref<number | null>(null);
let timer: ReturnType<typeof setInterval> | null = null;

const calculate = () => {
  if (!props.endAt) {
    remainingSeconds.value = null;
    return;
  }
  try {
    const end = new Date(props.endAt).getTime();
    const diff = Math.floor((end - Date.now()) / 1000);
    if (diff <= 0) {
      remainingSeconds.value = 0;
      if (timer) clearInterval(timer);
    } else {
      remainingSeconds.value = diff;
    }
  } catch {
    remainingSeconds.value = null;
  }
};

const startTimer = () => {
  if (timer) clearInterval(timer);
  calculate();
  if (import.meta.client && remainingSeconds.value && remainingSeconds.value > 0) {
    timer = setInterval(calculate, 1000);
  }
};

onMounted(() => {
  startTimer();
});

watch(() => props.endAt, () => {
  if (import.meta.client) {
    startTimer();
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const pad2 = (n: number) => String(n).padStart(2, '0');

const hh = computed(() => {
  if (!remainingSeconds.value || remainingSeconds.value <= 0) return '00';
  return pad2(Math.floor(remainingSeconds.value / 3600));
});

const mm = computed(() => {
  if (!remainingSeconds.value || remainingSeconds.value <= 0) return '00';
  return pad2(Math.floor((remainingSeconds.value % 3600) / 60));
});

const ss = computed(() => {
  if (!remainingSeconds.value || remainingSeconds.value <= 0) return '00';
  return pad2(remainingSeconds.value % 60);
});
</script>

<style scoped>
.timer-digit-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 22px;
  border-radius: 5px;
  background: rgba(196, 154, 67, 0.12);
  border: 1px solid rgba(196, 154, 67, 0.25);
}

.timer-digit {
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', ui-monospace, monospace;
  font-size: 11px;
  font-weight: 800;
  color: white;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.timer-digit--tick {
  animation: digitTick 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes digitTick {
  0% {
    transform: translateY(-40%);
    opacity: 0;
  }
  50% {
    transform: translateY(2px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
