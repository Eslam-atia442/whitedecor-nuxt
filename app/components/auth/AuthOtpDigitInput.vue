<template>
  <div class="flex justify-center gap-3 sm:gap-4" dir="ltr">
    <input
      v-for="(_, index) in 4"
      :key="index"
      :ref="(el) => setInputRef(el as HTMLInputElement | null, index)"
      :value="digits[index]"
      type="text"
      inputmode="numeric"
      maxlength="1"
      pattern="[0-9]*"
      autocomplete="one-time-code"
      class="size-13 rounded-2xl border text-center text-xl font-bold text-ink transition-all duration-200 outline-none select-none sm:size-14 sm:text-2xl"
      :class="[
        hasError
          ? 'animate-shake border-coral bg-coral/5 text-coral ring-2 ring-coral/20'
          : digits[index]
            ? 'border-gold bg-gold/5 ring-1 ring-gold/30'
            : 'border-mist bg-card focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/30',
      ]"
      @input="onInput(index, $event)"
      @keydown="onKeyDown(index, $event)"
      @paste="onPaste"
    >
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string;
    hasError?: boolean;
  }>(),
  {
    hasError: false,
  },
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputRefs = ref<(HTMLInputElement | null)[]>([]);

const setInputRef = (el: HTMLInputElement | null, index: number) => {
  inputRefs.value[index] = el;
};

const digits = computed(() => {
  const chars = (props.modelValue || '').padEnd(4, ' ').slice(0, 4).split('');
  return chars.map((c) => (c === ' ' ? '' : c));
});

onMounted(() => {
  nextTick(() => {
    inputRefs.value[0]?.focus();
  });
});

const updateValue = (next: string[]) => {
  emit('update:modelValue', next.join('').slice(0, 4));
};

const onInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement;
  const val = input.value.replace(/\D/g, '').slice(-1);
  const next = [...digits.value];
  next[index] = val;
  updateValue(next);

  if (val && index < 3) {
    nextTick(() => inputRefs.value[index + 1]?.focus());
  }
};

const onKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace') {
    if (!digits.value[index] && index > 0) {
      event.preventDefault();
      const next = [...digits.value];
      next[index - 1] = '';
      updateValue(next);
      nextTick(() => inputRefs.value[index - 1]?.focus());
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault();
    inputRefs.value[index - 1]?.focus();
  } else if (event.key === 'ArrowRight' && index < 3) {
    event.preventDefault();
    inputRefs.value[index + 1]?.focus();
  }
};

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pasted = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 4) || '';
  if (!pasted) return;

  const next = pasted.split('');
  updateValue(next);
  const focusIndex = Math.min(pasted.length, 3);
  nextTick(() => inputRefs.value[focusIndex]?.focus());
};
</script>
