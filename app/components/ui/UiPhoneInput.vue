<template>
  <div class="w-full space-y-1.5" :class="[hasError ? 'animate-shake' : '']">
    <label v-if="label" class="block text-xs font-bold text-ink">
      {{ label }}
      <span v-if="required" class="text-coral">*</span>
    </label>

    <div
      class="group relative flex h-12 w-full items-center rounded-xl border bg-card shadow-subtle transition-all duration-200"
      :class="[
        hasError
          ? 'border-coral ring-2 ring-coral/20'
          : 'border-mist focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 hover:border-gold/40',
        disabled ? 'cursor-not-allowed opacity-60 bg-mist/20' : '',
      ]"
    >
      <!-- Country Flag & Dial Code Prefix -->
      <AuthCountryPicker class="shrink-0" />

      <!-- Vertical Divider -->
      <div class="h-6 w-px bg-mist shrink-0" />

      <!-- Sanitized Phone Number Input -->
      <input
        :value="modelValue"
        type="tel"
        inputmode="numeric"
        :placeholder="placeholder || '010 1234 5678'"
        :disabled="disabled"
        class="min-w-0 flex-1 border-none bg-transparent px-3 text-start text-sm font-medium text-ink placeholder:text-ink-secondary/40 outline-none disabled:cursor-not-allowed"
        @input="onInput"
      >
    </div>

    <p v-if="errorMessage || hasError" class="text-xs font-medium text-coral">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    hasError?: boolean;
    required?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: '',
    required: false,
    disabled: false,
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const sanitized = target.value.replace(/\D/g, '');
  emit('update:modelValue', sanitized);
};
</script>
