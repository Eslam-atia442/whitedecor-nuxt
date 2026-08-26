<template>
  <div
    :class="[
      'rounded-2xl transition-all duration-200',
      variantClasses,
      paddingClasses,
      interactive ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-hover' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'elevated' | 'glass' | 'outlined' | 'navy';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    interactive?: boolean;
  }>(),
  {
    variant: 'default',
    padding: 'md',
    interactive: false,
  },
);

defineEmits<{ click: [event: MouseEvent] }>();

const variantClasses = computed(() => ({
  default: 'border border-mist bg-card shadow-subtle',
  elevated: 'border border-mist bg-card shadow-card',
  glass: 'glass-card shadow-card',
  outlined: 'border border-mist bg-transparent',
  navy: 'navy-gradient border border-mist/20 text-surface shadow-card',
}[props.variant]));

const paddingClasses = computed(() => ({
  none: '',
  sm: 'p-3 sm:p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-10',
}[props.padding]));
</script>
