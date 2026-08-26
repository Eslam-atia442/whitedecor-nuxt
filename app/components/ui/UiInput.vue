<template>
  <div class="w-full space-y-1.5" :class="[hasError ? 'animate-shake' : '']">
    <label v-if="label" class="block text-xs font-bold text-ink">
      {{ label }}
      <span v-if="required" class="text-coral">*</span>
    </label>

    <div
      class="group relative flex h-12 w-full items-center rounded-xl border bg-card px-3.5 shadow-subtle transition-all duration-200"
      :class="[
        hasError
          ? 'border-coral ring-2 ring-coral/20'
          : 'border-mist focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 hover:border-gold/40',
        disabled ? 'cursor-not-allowed opacity-60 bg-mist/20' : '',
      ]"
    >
      <div v-if="$slots.leading" class="me-2.5 flex shrink-0 items-center text-ink-secondary">
        <slot name="leading" />
      </div>

      <input
        :id="id"
        :value="modelValue"
        :type="computedType"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        class="min-w-0 flex-1 border-none bg-transparent text-sm font-medium text-ink placeholder:text-ink-secondary/50 outline-none disabled:cursor-not-allowed"
        @input="onInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      >

      <div class="ms-2 flex shrink-0 items-center gap-1.5">
        <button
          v-if="type === 'password'"
          type="button"
          tabindex="-1"
          class="flex size-7 items-center justify-center rounded-md text-ink-secondary transition hover:bg-mist/30 hover:text-ink"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          @click="showPassword = !showPassword"
        >
          <span class="material-symbols-rounded text-lg">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
        </button>

        <slot name="trailing" />
      </div>
    </div>

    <p v-if="errorMessage || hasError" class="text-xs font-medium text-coral">
      {{ errorMessage }}
    </p>
    <p v-else-if="hint" class="text-xs text-ink-secondary">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    type?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    hint?: string;
    errorMessage?: string;
    hasError?: boolean;
    required?: boolean;
    disabled?: boolean;
    autocomplete?: string;
    autofocus?: boolean;
  }>(),
  {
    modelValue: '',
    type: 'text',
    required: false,
    disabled: false,
    autofocus: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const showPassword = ref(false);

const computedType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>
