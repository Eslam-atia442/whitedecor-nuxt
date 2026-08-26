<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-navy/60 backdrop-blur-xs transition-opacity"
          @click="close"
        />

        <!-- Modal Panel: Bottom Sheet on Mobile, Centered Dialog on Desktop -->
        <div
          class="relative w-full max-w-lg overflow-hidden border border-mist bg-card shadow-2xl transition-all duration-300 rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col"
        >
          <!-- Drag Handle on Mobile -->
          <div class="sm:hidden pt-3 pb-1 flex justify-center">
            <div class="h-1.5 w-12 rounded-pill bg-mist" />
          </div>

          <!-- Header -->
          <div v-if="title" class="flex items-center justify-between border-b border-mist px-6 py-4">
            <h3 class="text-base sm:text-lg font-bold text-ink">{{ title }}</h3>
            <button
              type="button"
              class="flex size-8 items-center justify-center rounded-full bg-mist/50 text-ink-secondary hover:text-ink transition-colors"
              aria-label="Close modal"
              @click="close"
            >
              <span class="material-symbols-rounded text-lg">close</span>
            </button>
          </div>

          <!-- Content Slot -->
          <div class="flex-1 overflow-y-auto px-6 py-4">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    isOpen: boolean;
    title?: string;
    isMobile?: boolean;
    dropdownStyle?: Record<string, string>;
  }>(),
  {
    isMobile: true,
    title: undefined,
    dropdownStyle: undefined,
  }
);

const emit = defineEmits<{ close: [] }>();
const close = () => emit('close');
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
