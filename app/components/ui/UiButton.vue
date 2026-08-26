<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'relative inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
      variantClasses,
      sizeClasses,
      roundedClass,
      block ? 'w-full' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <span
      v-if="loading"
      class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      role="status"
      aria-label="loading"
    />
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'danger' | 'social';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'pill';
    block?: boolean;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    rounded: 'xl',
    block: false,
    loading: false,
    disabled: false,
  },
);

defineEmits<{ click: [event: MouseEvent] }>();

const variantClasses = computed(() => ({
  primary: 'bg-[#0A0E29] text-white hover:bg-[#1A2248] shadow-subtle hover:shadow-card border border-[#0A0E29]',
  secondary: 'gold-gradient text-[#0A0E29] shadow-subtle hover:shadow-card hover:brightness-105',
  gold: 'gold-gradient text-[#0A0E29] shadow-subtle hover:shadow-card hover:brightness-105',
  outline: 'border border-mist bg-card text-ink hover:border-gold/60 hover:bg-gold/5 shadow-subtle',
  ghost: 'bg-transparent text-ink hover:bg-mist/40',
  danger: 'bg-coral text-white shadow-subtle hover:brightness-110',
  social: 'border border-mist bg-card text-ink hover:border-gold/50 hover:bg-mist/20 shadow-subtle',
}[props.variant]));

const sizeClasses = computed(() => ({
  sm: 'h-9 px-3.5 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-sm sm:text-base',
  icon: 'size-11 p-0',
}[props.size]));

const roundedClass = computed(() => ({
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  pill: 'rounded-pill',
}[props.rounded]));
</script>
