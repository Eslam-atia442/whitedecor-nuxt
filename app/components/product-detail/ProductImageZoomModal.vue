<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 backdrop-blur-xl p-4 transition-opacity duration-300"
      @click.self="$emit('close')"
    >
      <div class="relative flex max-h-[90vh] max-w-4xl flex-col items-center justify-center">
        <!-- Close Button -->
        <button
          type="button"
          class="absolute -top-12 end-0 flex size-10 items-center justify-center rounded-full bg-white/10 text-surface hover:bg-white/20 transition-colors"
          aria-label="Close image viewer"
          @click="$emit('close')"
        >
          <span class="material-symbols-rounded text-2xl">close</span>
        </button>

        <!-- Active Large Image -->
        <NuxtImg
          v-if="currentImage"
          :src="currentImage"
          :alt="productName || 'Fullscreen Image'"
          class="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
        />

        <!-- Thumbnail Selector -->
        <div v-if="images.length > 1" class="mt-4 flex items-center gap-2 overflow-x-auto p-2 scrollbar-none">
          <button
            v-for="(img, idx) in images"
            :key="img"
            type="button"
            class="size-14 shrink-0 overflow-hidden rounded-xl border-2 transition-opacity"
            :class="activeIndex === idx ? 'border-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-80'"
            @click="$emit('update:activeIndex', idx)"
          >
            <NuxtImg :src="img" class="size-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  images: string[];
  currentImage?: string;
  activeIndex: number;
  productName?: string | null;
}>();

defineEmits<{
  close: [];
  'update:activeIndex': [idx: number];
}>();
</script>
