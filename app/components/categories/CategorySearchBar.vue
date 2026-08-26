<template>
  <div class="relative">
    <span class="material-symbols-rounded absolute start-3.5 top-1/2 -translate-y-1/2 text-xl text-ink-secondary">
      search
    </span>
    <input
      :value="modelValue"
      type="text"
      :placeholder="$t('categories_search_placeholder', 'Search categories...')"
      class="w-full rounded-xl border border-mist bg-card py-2.5 pe-9 ps-11 text-sm text-ink placeholder:text-ink-secondary/60 focus:border-gold focus:outline-none shadow-subtle transition-colors"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      type="button"
      class="absolute end-3 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink"
      aria-label="Clear search"
      @click="$emit('update:modelValue', '')"
    >
      <span class="material-symbols-rounded text-lg">close</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [val: string];
}>();
</script>
