<template>
  <input
    :value="modelValue"
    type="search"
    :placeholder="$t('settings.search_country_hint')"
    class="w-full rounded-lg border border-mist bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>
