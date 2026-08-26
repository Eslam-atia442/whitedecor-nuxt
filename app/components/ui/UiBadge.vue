<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-md font-semibold tracking-tight transition-colors select-none',
      sizeClasses[size || 'md'],
      variantClasses[variant || 'gold']
    ]"
  >
    <!-- Solid micro-dot for green (in-stock) variant -->
    <span v-if="variant === 'green'" class="size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'gold' | 'navy' | 'coral' | 'green' | 'mist' | 'outline';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    variant: 'gold',
    size: 'md',
  }
);

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3.5 py-1.5 text-sm',
};

const variantClasses: Record<string, string> = {
  gold: 'bg-gold/10 text-gold border border-gold/25',
  navy: 'bg-navy text-surface border border-navy-light',
  coral: 'bg-coral/10 text-coral border border-coral/25',
  green: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
  mist: 'bg-surface text-ink-secondary border border-mist',
  outline: 'border border-mist text-ink bg-card',
};
</script>
