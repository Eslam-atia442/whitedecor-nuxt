<template>
  <div
    :class="[
      'animate-pulse bg-mist/60',
      shapeClass,
      roundedClass,
    ]"
    :style="customStyle"
  />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: 'rectangle' | 'circle' | 'text';
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'full';
    width?: string;
    height?: string;
  }>(),
  {
    shape: 'rectangle',
    rounded: 'md',
  },
);

const shapeClass = computed(() => {
  if (props.shape === 'circle') return 'rounded-full shrink-0 aspect-square';
  if (props.shape === 'text') return 'h-4 w-3/4';
  return '';
});

const roundedClass = computed(() => ({
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  pill: 'rounded-pill',
  full: 'rounded-full',
}[props.rounded]));

const customStyle = computed(() => ({
  width: props.width,
  height: props.height,
}));
</script>
