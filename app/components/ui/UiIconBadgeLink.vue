<template>
  <NuxtLink
    :to="localize(to)"
    class="group relative flex size-10 shrink-0 items-center justify-center rounded-full border border-mist/80 bg-card text-ink shadow-subtle transition-all duration-200 hover:border-gold/50 hover:bg-gold/10 hover:text-gold active:scale-95"
    :aria-label="label"
    :title="label"
  >
    <span class="material-symbols-rounded text-xl transition-transform duration-200 group-hover:scale-105">
      {{ icon }}
    </span>
    <span
      v-if="count > 0"
      class="absolute -top-1 -end-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-black leading-none text-navy shadow-subtle ring-2 ring-card tabular-nums"
    >
      {{ count > 99 ? '99+' : count }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string;
    icon: string;
    label: string;
    count?: number;
  }>(),
  { count: 0 },
);

const { localize } = useLocalizedPath();
</script>
