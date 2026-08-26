<template>
  <label
    class="inline-flex cursor-pointer select-none items-start gap-2.5 text-sm text-ink-secondary transition"
    :class="[disabled ? 'cursor-not-allowed opacity-60' : 'hover:text-ink']"
  >
    <div class="relative mt-0.5 flex size-4.5 shrink-0 items-center justify-center">
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="peer sr-only"
        @change="onChange"
      >
      <div
        class="flex size-4.5 items-center justify-center rounded-md border transition-all duration-200"
        :class="[
          modelValue
            ? 'border-gold bg-gold text-navy'
            : 'border-mist bg-card hover:border-gold/40',
          disabled ? 'opacity-50' : '',
        ]"
      >
        <svg
          v-if="modelValue"
          class="size-3 stroke-[3]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
    <div class="min-w-0 flex-1 leading-snug">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    disabled?: boolean;
  }>(),
  {
    modelValue: false,
    disabled: false,
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>
