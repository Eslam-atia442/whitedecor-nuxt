<template>
  <UiResponsiveModal
    :is-open="isOpen"
    :title="$t('clear_cart')"
    @close="$emit('close')"
  >
    <div class="space-y-6 pt-2">
      <div class="flex items-center gap-4 text-ink">
        <span class="flex size-12 items-center justify-center rounded-2xl bg-error/10 text-error shrink-0">
          <span class="material-symbols-rounded text-2xl">delete_forever</span>
        </span>
        <p class="text-sm text-ink-secondary leading-relaxed">
          {{ $t('clear_cart_confirm') }}
        </p>
      </div>

      <div class="flex items-center justify-end gap-3 pt-4 border-t border-mist">
        <UiButton variant="outline" size="sm" @click="$emit('close')">
          {{ $t('cancel') }}
        </UiButton>
        <UiButton variant="primary" size="sm" class="bg-error hover:bg-error/90" @click="$emit('confirm')">
          {{ $t('clear_cart') }}
        </UiButton>
      </div>
    </div>
  </UiResponsiveModal>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();
</script>
