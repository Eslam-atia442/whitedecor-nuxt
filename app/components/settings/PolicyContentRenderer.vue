<template>
  <div class="prose prose-sm max-w-none text-ink-secondary" v-html="html" />
</template>

<script setup lang="ts">
defineProps<{ html: string }>();
</script>

<style scoped>
:deep(h1), :deep(h2), :deep(h3) {
  color: rgb(var(--color-ink-rgb));
  font-weight: 700;
}
:deep(p) { margin-bottom: 1rem; line-height: 1.7; }
:deep(a) { color: rgb(var(--color-gold-rgb)); }
</style>
