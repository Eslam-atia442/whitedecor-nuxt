<template>
  <button
    type="button"
    class="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-start transition hover:bg-gold/5"
    :class="selected ? 'border border-gold bg-gold/5' : 'border border-transparent'"
    @click="$emit('select')"
  >
    <img v-if="country.flag" :src="country.flag" :alt="country.name" class="size-6 rounded-full object-cover">
    <span v-else class="size-6 rounded-full bg-mist" />
    <span class="flex-1 text-sm text-ink">{{ country.name }}</span>
    <span class="text-sm font-medium text-ink-secondary">{{ country.countryCode }}</span>
  </button>
</template>

<script setup lang="ts">
import type { CountryDto } from '~/types/settings';

defineProps<{ country: CountryDto; selected: boolean }>();
defineEmits<{ select: [] }>();
</script>
