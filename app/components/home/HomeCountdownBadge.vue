<template>
  <div
    v-if="remaining > 0"
    class="inline-flex items-center gap-1.5 rounded-pill border border-gold/40 bg-navy/10 px-2.5 py-1 text-navy backdrop-blur-md dark:bg-card/40 dark:text-gold"
    dir="ltr"
  >
    <span class="material-symbols-rounded text-sm text-gold">schedule</span>
    <span class="rounded bg-gold/20 px-1 py-0.5 text-[11px] font-bold tabular-nums">{{ hours }}</span>
    <span class="text-[11px] font-bold text-navy dark:text-gold">:</span>
    <span class="rounded bg-gold/20 px-1 py-0.5 text-[11px] font-bold tabular-nums">{{ minutes }}</span>
    <span class="text-[11px] font-bold text-navy dark:text-gold">:</span>
    <span class="rounded bg-gold/20 px-1 py-0.5 text-[11px] font-bold tabular-nums">{{ seconds }}</span>
  </div>
</template>

<script setup lang="ts">
// [FLUTTER CONCEPT]: Equivalent to Flutter's HomeCountdownBadge (pill with HH:MM:SS)
const props = withDefaults(defineProps<{
  secondsLeft?: number;
  endDate?: string | null;
}>(), { secondsLeft: 7200 });

const remaining = ref(props.secondsLeft);
let timer: ReturnType<typeof setInterval> | null = null;

const syncRemaining = () => {
  if (props.endDate) {
    const diff = Math.floor((new Date(props.endDate).getTime() - Date.now()) / 1000);
    remaining.value = Math.max(0, diff);
  } else if (typeof props.secondsLeft === 'number') {
    remaining.value = Math.max(0, props.secondsLeft);
  }
};

onMounted(() => {
  syncRemaining();
  if (remaining.value > 0) {
    timer = setInterval(() => {
      if (remaining.value > 0) remaining.value--;
      else if (timer) clearInterval(timer);
    }, 1000);
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const pad = (n: number) => String(n).padStart(2, '0');
const hours = computed(() => pad(Math.floor(remaining.value / 3600)));
const minutes = computed(() => pad(Math.floor((remaining.value % 3600) / 60)));
const seconds = computed(() => pad(remaining.value % 60));
</script>

