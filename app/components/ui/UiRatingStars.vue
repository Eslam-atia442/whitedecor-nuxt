<template>
  <div class="flex items-center gap-1">
    <div class="flex items-center text-gold">
      <span
        v-for="star in 5"
        :key="star"
        class="material-symbols-rounded text-sm"
        :class="star <= Math.round(rating) ? 'font-fill text-gold' : 'text-mist'"
      >
        star
      </span>
    </div>
    <span v-if="rating" class="text-xs font-bold text-ink ms-1">
      {{ rating.toFixed(1) }}
    </span>
    <span v-if="count !== undefined" class="text-xs text-ink-secondary">
      ({{ count }})
    </span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    rating?: number;
    count?: number;
  }>(),
  {
    rating: 5,
    count: undefined,
  }
);
</script>
