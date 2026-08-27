<template>
  <div
    class="inline-flex items-center rounded-md font-black uppercase tracking-tight select-none shadow-sm"
    :class="[sizeClasses, variantClasses]"
  >
    <span class="tabular-nums leading-none">{{ percent > 0 ? `-${percent}%` : $t('sale', 'Sale') }}</span>
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
    size: 'md',
    variant: 'coral',
  }
);

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'px-3.5 py-2 text-base sm:text-lg';
    case 'sm':
      return 'px-2.5 py-1 text-xs';
    default:
      return 'px-3 py-1.5 text-sm';
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'navy':
      return 'bg-navy text-white dark:bg-gold dark:text-navy';
    case 'gold':
      return 'bg-gold text-navy';
    case 'glass':
      return 'bg-card/90 text-sale border border-sale/30 shadow-subtle';
    default:
      return 'bg-sale text-white';
  }
});
</script>
