<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gold/10 text-gold shadow-subtle">
      <span class="material-symbols-rounded text-3xl">{{ icon || 'inventory_2' }}</span>
    </div>
    <h3 class="text-lg sm:text-xl font-bold text-ink mb-1.5">
      {{ title }}
    </h3>
    <p v-if="description" class="text-sm text-ink-secondary max-w-md mb-6 leading-relaxed">
      {{ description }}
    </p>
    <div v-if="$slots.action || actionLabel" class="flex items-center gap-3">
      <slot name="action">
        <UiButton v-if="actionLabel" variant="primary" size="md" @click="$emit('action')">
          {{ actionLabel }}
        </UiButton>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
}>();

defineEmits<{
  action: [];
}>();
</script>
