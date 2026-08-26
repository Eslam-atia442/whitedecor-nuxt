<template>
  <span
    class="inline-flex items-center gap-1 rounded-lg border border-gold/30 bg-gold/10 px-2 py-0.5 text-[11px] font-semibold text-ink"
  >
    <span class="material-symbols-rounded text-xs text-gold">add_circle</span>
    <span class="truncate max-w-[120px]">{{ name }}</span>
    <span v-if="price && price !== '0'" class="text-gold font-bold">
      (+{{ price }} {{ $t('egp') }})
    </span>
    <span v-else class="text-success font-bold">
      ({{ $t('free') }})
    </span>
    <button
      v-if="removable"
      type="button"
      class="ms-0.5 flex size-4 items-center justify-center rounded-full hover:bg-gold/20 text-ink-secondary hover:text-ink transition-colors"
      :aria-label="`Remove ${name}`"
      @click.stop="$emit('remove')"
    >
      <span class="material-symbols-rounded text-xs">close</span>
    </button>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  price?: string | null;
  removable?: boolean;
}>();

defineEmits<{
  (e: 'remove'): void;
}>();
</script>
