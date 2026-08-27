<template>
  <div class="flex items-end gap-2.5" dir="ltr">
    <div v-for="(part, i) in parts" :key="part.key" class="flex items-end gap-2.5">
      <div class="min-w-[2.25rem] text-center">
        <p class="text-xl font-semibold tabular-nums tracking-tight text-ink sm:text-2xl">
          {{ part.value }}
        </p>
        <p class="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-secondary">
          {{ $t(part.label) }}
        </p>
      </div>
      <span v-if="i < parts.length - 1" class="mb-5 text-sm font-medium text-gold/70">:</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ seconds: number }>(), { seconds: 0 });

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

const parts = computed(() => {
  const total = Math.max(0, props.seconds);
  return [
    { key: 'h', value: pad(Math.floor(total / 3600)), label: 'hours_short' },
    { key: 'm', value: pad(Math.floor((total % 3600) / 60)), label: 'mins_short' },
    { key: 's', value: pad(total % 60), label: 'secs_short' },
  ];
});
</script>
