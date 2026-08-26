<template>
  <div class="flex items-center gap-2" :class="align">
    <button
      v-for="(_, i) in count"
      :key="i"
      type="button"
      class="h-1.5 rounded-pill transition-all duration-300"
      :class="i === index ? `w-8 bg-gold` : `w-3 ${idleClass} hover:opacity-80`"
      :aria-label="`${i + 1}`"
      @click="$emit('go', i)"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    index: number;
    count: number;
    tone?: 'light' | 'dark';
    align?: string;
  }>(),
  { tone: 'dark', align: 'justify-center' },
);

defineEmits<{ go: [index: number] }>();

const idleClass = computed(() => (props.tone === 'light' ? 'bg-white/40' : 'bg-mist'));
</script>
