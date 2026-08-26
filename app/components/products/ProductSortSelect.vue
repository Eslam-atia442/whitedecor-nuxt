<template>
  <div ref="dropdownRef" class="relative inline-block text-start" :class="{ 'pointer-events-none opacity-60': isDisabled }">
    <button
      type="button"
      :disabled="isDisabled"
      class="flex items-center gap-2 rounded-xl border border-mist bg-card px-3.5 py-2 text-xs sm:text-sm font-bold text-ink shadow-subtle transition-all duration-200 hover:border-gold/40 focus:outline-none disabled:opacity-50"
      @click="isOpen = !isOpen"
    >
      <span class="material-symbols-rounded text-base text-gold">swap_vert</span>
      <span>{{ currentLabel }}</span>
      <span class="material-symbols-rounded text-base text-ink-secondary transition-transform duration-200" :class="{ 'rotate-180': isOpen }">
        expand_more
      </span>
    </button>

    <!-- Custom Dropdown Menu -->
    <Transition name="dropdown-scale">
      <div
        v-if="isOpen && !isDisabled"
        class="absolute end-0 mt-2 w-56 z-50 overflow-hidden rounded-2xl border border-mist bg-card p-1.5 shadow-hover backdrop-blur-xl"
      >
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          type="button"
          class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold transition-colors"
          :class="modelValue === opt.value ? 'bg-gold/15 text-gold font-bold' : 'text-ink hover:bg-surface'"
          @click="selectOption(opt.value)"
        >
          <span>{{ opt.label }}</span>
          <span v-if="modelValue === opt.value" class="material-symbols-rounded text-base text-gold">
            check
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import type { ProductSortOption } from '~/types/product';

const props = withDefaults(
  defineProps<{
    modelValue?: ProductSortOption;
    isDisabled?: boolean;
  }>(),
  {
    modelValue: 'DESC',
    isDisabled: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [val: ProductSortOption];
}>();

const { t } = useI18n();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

const sortOptions = computed<{ label: string; value: ProductSortOption }[]>(() => [
  { label: t('sort_newest'), value: 'DESC' },
  { label: t('sort_oldest'), value: 'ASC' },
  { label: t('sort_price_low_high'), value: 'PRICE_ASC' },
  { label: t('sort_price_high_low'), value: 'PRICE_DESC' },
]);

const currentLabel = computed(() => {
  const match = sortOptions.value.find((opt) => opt.value === props.modelValue);
  return match ? match.label : t('sort_by');
});

const selectOption = (val: ProductSortOption) => {
  emit('update:modelValue', val);
  isOpen.value = false;
};
</script>

<style scoped>
.dropdown-scale-enter-active,
.dropdown-scale-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-scale-enter-from,
.dropdown-scale-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
