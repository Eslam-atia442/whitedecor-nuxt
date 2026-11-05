<template>
  <div
    v-if="remainingSeconds && remainingSeconds > 0"
    class="pointer-events-none inline-flex items-center gap-1.5 rounded-lg bg-neutral-900/95 px-2 py-1 text-white shadow-md border border-white/10 select-none"
    dir="ltr"
  >
    <span class="size-1.5 rounded-full bg-sale animate-pulse shrink-0" />
    <span v-if="isLg" class="text-[10px] font-bold uppercase tracking-wider text-amber-400">
      {{ $t('flash_deal') }}
    </span>
    <div class="flex items-center gap-1 text-[11px] font-mono font-bold tracking-tight">
      <span class="rounded bg-white/15 px-1 py-0.5 leading-none">{{ formatted.h }}</span>
      <span class="text-white/60">:</span>
      <span class="rounded bg-white/15 px-1 py-0.5 leading-none">{{ formatted.m }}</span>
      <span class="text-white/60">:</span>
      <span class="rounded bg-white/15 px-1 py-0.5 leading-none text-amber-300">{{ formatted.s }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  endAt?: string | null;
  size?: 'sm' | 'lg';
}>(), {
  size: 'sm',
});

const isLg = computed(() => props.size === 'lg');
const remainingSeconds = ref<number | null>(null);
let timer: ReturnType<typeof setInterval> | null = null;

const calculate = () => {
  if (!props.endAt) {
    remainingSeconds.value = null;
    return;
  }
  const end = new Date(props.endAt).getTime();
  const diff = Math.floor((end - Date.now()) / 1000);
  remainingSeconds.value = diff > 0 && diff <= 30 * 86400 ? diff : null;
  if (diff <= 0 && timer) {
    clearInterval(timer);
    timer = null;
  }
};

const startTimer = () => {
  if (timer) clearInterval(timer);
  calculate();
  if (import.meta.client && remainingSeconds.value && remainingSeconds.value > 0) {
    timer = setInterval(calculate, 1000);
  }
};

onMounted(() => startTimer());
watch(() => props.endAt, () => {
  if (import.meta.client) startTimer();
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const pad2 = (n: number) => String(n).padStart(2, '0');
const formatted = computed(() => {
  const total = Math.max(0, remainingSeconds.value || 0);
  return {
    h: pad2(Math.floor(total / 3600)),
    m: pad2(Math.floor((total % 3600) / 60)),
    s: pad2(total % 60),
  };
});
</script>
