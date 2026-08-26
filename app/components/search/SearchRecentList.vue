<template>
  <section v-if="terms.length" class="space-y-3">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-sm font-bold text-ink">{{ $t('search_recent') }}</h2>
      <button type="button" class="text-xs font-bold text-coral hover:underline" @click="$emit('clear')">
        {{ $t('search_clear_recent') }}
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="term in terms"
        :key="term"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-pill border border-mist bg-card px-3 py-1.5 text-xs font-semibold text-ink shadow-subtle transition hover:border-gold/50 hover:text-gold"
        @click="$emit('select', term)"
      >
        <span class="material-symbols-rounded text-sm text-gold">history</span>
        <span>{{ term }}</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ terms: string[] }>();
defineEmits<{ select: [term: string]; clear: [] }>();
</script>
