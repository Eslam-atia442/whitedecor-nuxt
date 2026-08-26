<template>
  <form class="w-full" @submit.prevent="$emit('submit', String(modelValue || '').trim())">
    <UiInput
      :id="id"
      :model-value="modelValue"
      type="search"
      :placeholder="placeholder || $t('search_hint')"
      :autofocus="autofocus"
      autocomplete="off"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template #leading>
        <span class="material-symbols-rounded text-lg text-gold">search</span>
      </template>
      <template #trailing>
        <button
          v-if="modelValue"
          type="button"
          class="flex size-7 items-center justify-center rounded-md text-ink-secondary transition hover:bg-mist/30 hover:text-ink"
          :aria-label="$t('clear')"
          @click="$emit('update:modelValue', '')"
        >
          <span class="material-symbols-rounded text-lg">close</span>
        </button>
      </template>
    </UiInput>
  </form>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    placeholder?: string;
    autofocus?: boolean;
  }>(),
  { modelValue: '', autofocus: false },
);

defineEmits<{
  'update:modelValue': [value: string];
  submit: [value: string];
}>();
</script>
