<template>
  <div
    v-if="remainingSeconds && remainingSeconds > 0"
    class="pointer-events-none flex items-center select-none border border-white/40 bg-card/45 shadow-glass backdrop-blur-xl"
    :class="isLg
      ? 'gap-2 rounded-2xl px-2.5 py-2'
      : 'gap-1 rounded-xl px-1.5 py-1'"
  >
    <UiSalePulseIcon :size="isLg ? 'md' : 'xs'" />
    <span
      v-if="isLg"
      class="text-[11px] font-bold uppercase tracking-wide text-coral"
    >
      {{ $t('flash_deal') }}
    </span>
    <div class="ms-auto flex items-center" :class="isLg ? 'gap-0.5 items-end' : 'gap-px'" dir="ltr">
      <div v-for="(part, i) in parts" :key="part.key" class="flex items-end" :class="isLg ? 'gap-0.5' : 'gap-px'">
        <div
          class="text-center shadow-subtle bg-card/80"
          :class="isLg
            ? 'min-w-[2rem] rounded-xl px-1.5 py-1 sm:min-w-[2.35rem]'
            : 'min-w-[1.2rem] rounded-md px-0.5 py-0.5'"
        >
          <p
            class="font-bold tabular-nums leading-none text-ink"
            :class="isLg ? 'text-base sm:text-lg' : 'text-[10px]'"
          >{{ part.value }}</p>
          <p
            v-if="isLg"
            class="mt-0.5 text-[8px] font-medium uppercase tracking-wider text-ink-secondary"
          >
            {{ $t(part.label) }}
          </p>
        </div>
        <span
          v-if="i < parts.length - 1"
          class="font-bold text-gold"
          :class="isLg ? 'mb-2.5 text-sm' : 'mb-px text-[10px]'"
        >:</span>
      </div>
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
  remainingSeconds.value = diff > 0 ? diff : 0;
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
const parts = computed(() => {
  const total = Math.max(0, remainingSeconds.value || 0);
  return [
    { key: 'h', value: pad2(Math.floor(total / 3600)), label: 'hours_short' },
    { key: 'm', value: pad2(Math.floor((total % 3600) / 60)), label: 'mins_short' },
    { key: 's', value: pad2(total % 60), label: 'secs_short' },
  ];
});
</script>
