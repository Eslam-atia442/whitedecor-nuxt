<template>
  <details class="group rounded-2xl border border-mist bg-card px-4 py-3">
    <summary class="cursor-pointer list-none text-sm font-bold text-ink">
      {{ item.question }}
    </summary>
    <p class="mt-2 text-sm leading-relaxed text-ink-secondary">{{ item.answer }}</p>
  </details>
</template>

<script setup lang="ts">
defineProps<{ item: { question: string; answer: string } }>();
</script>
