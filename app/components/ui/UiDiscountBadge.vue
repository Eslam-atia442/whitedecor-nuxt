<template>
  <div
    class="inline-flex items-center rounded-md font-extrabold uppercase tracking-tight select-none shadow-sm transition-all"
    :class="[sizeClasses, variantClasses]"
  >
    <span class="tabular-nums">{{ percent > 0 ? `-${percent}%` : $t('sale', 'Sale') }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    percent: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'navy' | 'coral' | 'gold' | 'glass';
  }>(),
  {
    size: 'sm',
    variant: 'coral',
  }
);

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'px-3 py-1 text-xs sm:text-sm font-black';
    case 'md':
      return 'px-2.5 py-0.5 text-xs font-bold';
    default:
      return 'px-2 py-0.5 text-[11px] font-bold';
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'navy':
      return 'bg-navy text-white dark:bg-gold dark:text-navy';
    case 'gold':
      return 'bg-gold text-navy font-black';
    case 'glass':
      return 'bg-card/90 text-coral border border-coral/30 shadow-subtle';
    default:
      return 'bg-coral text-white shadow-subtle';
  }
});
</script>
