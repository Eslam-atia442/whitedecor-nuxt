<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" @click="$emit('cancel')" />

      <div class="relative w-full max-w-md rounded-3xl border border-mist bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div class="mb-3 flex items-center gap-3">
          <div
            class="flex size-10 items-center justify-center rounded-2xl"
            :class="isDestructive ? 'bg-red-500/10 text-red-500' : 'bg-gold/10 text-gold'"
          >
            <span class="material-symbols-rounded text-2xl">{{ icon || (isDestructive ? 'warning' : 'info') }}</span>
          </div>
          <h3 class="text-base font-bold text-ink">{{ title }}</h3>
        </div>

        <p class="text-xs leading-relaxed text-ink-secondary">{{ message }}</p>

        <div class="mt-6 flex justify-end gap-2">
          <UiButton type="button" variant="outline" size="sm" :disabled="loading" @click="$emit('cancel')">
            {{ $t('cancel') }}
          </UiButton>
          <UiButton
            type="button"
            :variant="isDestructive ? 'danger' : 'primary'"
            size="sm"
            :loading="loading"
            @click="$emit('confirm')"
          >
            {{ confirmText }}
          </UiButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  isDestructive?: boolean;
  loading?: boolean;
  icon?: string;
}>();

defineEmits<{
  'cancel': [];
  'confirm': [];
}>();
</script>
