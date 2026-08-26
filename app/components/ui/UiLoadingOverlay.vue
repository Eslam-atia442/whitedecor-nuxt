<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[80] flex items-center justify-center bg-navy/40 backdrop-blur-sm"
        role="alertdialog"
        aria-busy="true"
        aria-live="polite"
      >
        <div class="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-navy/80 px-10 py-8 shadow-glass">
          <span
            class="size-12 animate-spin rounded-full border-3 border-gold/30 border-t-gold"
            aria-hidden="true"
          />
          <p class="text-sm font-semibold text-surface">{{ $t('loading_wait') }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
</script>
