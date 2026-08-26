<template>
  <button
    type="button"
    class="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 text-[11px] font-medium transition-all select-none"
    :class="active ? 'bg-gold/15 text-gold font-bold' : 'text-ink-secondary hover:text-ink'"
    @click="$emit('click')"
  >
    <div class="relative flex size-6 items-center justify-center">
      <span class="material-symbols-rounded text-xl" :class="active ? 'font-fill' : ''">{{ icon }}</span>
      <span
        v-if="badge"
        class="absolute -top-1 -end-2 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-navy shadow-subtle"
      >
        {{ badge }}
      </span>
    </div>
    <span class="truncate">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ icon: string; label: string; active?: boolean; badge?: number }>();
defineEmits<{ click: [] }>();
</script>
