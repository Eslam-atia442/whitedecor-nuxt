<template>
  <div ref="containerRef" :class="['relative', fullWidth ? 'w-full' : 'shrink-0']">
    <slot name="trigger" :handle-toggle="handleToggle" :is-open="isOpen" :selected-option="selectedOption">
      <button
        type="button"
        :disabled="disabled"
        class="group flex h-12 w-full items-center justify-between rounded-xl border border-mist bg-surface/50 px-4 text-sm text-ink outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
        :class="isOpen ? 'border-gold ring-1 ring-gold/30' : 'hover:border-gold/30'"
        @click="handleToggle"
      >
        <div class="flex min-w-0 items-center gap-3">
          <UiNetworkImage
            v-if="selectedOption?.image"
            :src="selectedOption.image"
            fallback-icon="image"
            rounded="rounded-full"
            class="size-6 shrink-0 rounded-full"
          />
          <span class="truncate">{{ selectedOption?.label || placeholder }}</span>
        </div>
        <span
          class="material-symbols-rounded text-ink-secondary transition-transform duration-300"
          :class="{ 'rotate-180': isOpen }"
        >expand_more</span>
      </button>
    </slot>

    <UiResponsiveModal
      :is-open="isOpen"
      :is-mobile="isMobile"
      :dropdown-style="dropdownStyle"
      :title="placeholder"
      @close="closeDropdown"
    >
      <button
        v-if="allowEmpty"
        type="button"
        class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-start transition hover:bg-gold/5"
        :class="{ 'bg-gold/10 text-gold font-semibold': modelValue === '' || modelValue === null }"
        @click="selectOption(null)"
      >
        <span class="truncate">{{ placeholder }}</span>
      </button>
      <button
        v-for="option in options"
        :key="String(option.value)"
        type="button"
        class="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-start transition hover:bg-gold/5"
        :class="{ 'bg-gold/10 font-semibold text-gold': String(modelValue) === String(option.value) }"
        @click="selectOption(option.value)"
      >
        <slot name="option" :option="option" :is-selected="String(modelValue) === String(option.value)">
          <UiNetworkImage
            v-if="option.image"
            :src="option.image"
            fallback-icon="image"
            rounded="rounded-full"
            class="size-8 shrink-0 rounded-full border border-mist"
          />
          <span class="flex-1 truncate">{{ option.label }}</span>
        </slot>
        <span v-if="String(modelValue) === String(option.value)" class="material-symbols-rounded shrink-0 text-gold">check</span>
      </button>
    </UiResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { useResponsiveDropdown } from '~/composables/useResponsiveDropdown';

export interface SelectOption {
  label: string;
  value: string | number;
  image?: string;
  meta?: string;
}

const props = withDefaults(defineProps<{
  modelValue?: string | number | null;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  allowEmpty?: boolean;
  fullWidth?: boolean;
}>(), {
  modelValue: '',
  options: () => [],
  placeholder: 'Select',
  disabled: false,
  allowEmpty: false,
  fullWidth: true,
});

const emit = defineEmits<{ 'update:modelValue': [value: string | number | '']; change: [value: string | number | ''] }>();

const containerRef = ref<HTMLElement | null>(null);
const { isOpen, isMobile, dropdownStyle, toggleDropdown, closeDropdown } = useResponsiveDropdown(containerRef);

const selectedOption = computed(() =>
  props.options.find((opt) => String(opt.value) === String(props.modelValue)) || null,
);

const handleToggle = () => {
  if (!props.disabled) toggleDropdown();
};

const selectOption = (val: string | number | null) => {
  const next = val === null ? '' : val;
  emit('update:modelValue', next);
  emit('change', next);
  closeDropdown();
};
</script>
