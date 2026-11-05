<template>
  <template v-if="images && images.length > 1">
    <button
      type="button"
      class="absolute start-2 sm:start-3 top-1/2 -translate-y-1/2 flex size-9 sm:size-10 items-center justify-center rounded-full bg-card/85 text-ink shadow-card backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-card hover:text-gold active:scale-90 opacity-85 sm:opacity-0 sm:group-hover:opacity-100 border border-mist z-10"
      aria-label="Previous image"
      @click.stop="$emit('prev')"
    >
      <span class="material-symbols-rounded text-xl sm:text-2xl rtl:rotate-180">chevron_left</span>
    </button>

    <button
      type="button"
      class="absolute end-2 sm:end-3 top-1/2 -translate-y-1/2 flex size-9 sm:size-10 items-center justify-center rounded-full bg-card/85 text-ink shadow-card backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-card hover:text-gold active:scale-90 opacity-85 sm:opacity-0 sm:group-hover:opacity-100 border border-mist z-10"
      aria-label="Next image"
      @click.stop="$emit('next')"
    >
      <span class="material-symbols-rounded text-xl sm:text-2xl rtl:rotate-180">chevron_right</span>
    </button>

    <div class="absolute bottom-3 inset-x-0 flex justify-center z-10 pointer-events-none">
      <div class="inline-flex items-center gap-1.5 rounded-full bg-navy/75 text-white text-[11px] font-bold px-3 py-1 shadow-card backdrop-blur-md border border-white/10 tabular-nums">
        <span>{{ activeIndex + 1 }}</span>
        <span class="opacity-50">/</span>
        <span>{{ images.length }}</span>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
defineProps<{
  images: string[];
  activeIndex: number;
}>();

defineEmits<{
  (e: 'prev'): void;
  (e: 'next'): void;
}>();
</script>

