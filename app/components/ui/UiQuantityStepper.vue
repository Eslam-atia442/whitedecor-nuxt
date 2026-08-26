<template>
  <div class="inline-flex items-center rounded-xl border border-mist bg-card p-1 shadow-subtle">
    <button
      type="button"
      :disabled="modelValue <= min"
      class="flex size-8 items-center justify-center rounded-lg text-ink transition-colors hover:bg-mist/50 disabled:opacity-40 disabled:cursor-not-allowed"
      aria-label="Decrease quantity"
      @click="decrement"
    >
      <span class="material-symbols-rounded text-base">remove</span>
    </button>
    <span class="w-10 text-center text-sm font-bold text-ink select-none">
      {{ modelValue }}
    </span>
    <button
      type="button"
      :disabled="modelValue >= max"
      class="flex size-8 items-center justify-center rounded-lg text-ink transition-colors hover:bg-mist/50 disabled:opacity-40 disabled:cursor-not-allowed"
      aria-label="Increase quantity"
      @click="increment"
    >
      <span class="material-symbols-rounded text-base">add</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number;
    min?: number;
    max?: number;
  }>(),
  {
    min: 1,
    max: 5,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const decrement = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1);  
  }
};

const increment = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1);
  }
};
</script>
