<template>
  <div class="flex items-end justify-between gap-4">
    <div class="space-y-1">
      <p v-if="eyebrow" class="text-[11px] font-bold uppercase tracking-widest text-gold">
        {{ eyebrow }}
      </p>
      <h2 class="text-fluid-h2 font-extrabold" :class="titleClass">{{ title }}</h2>
      <p v-if="subtitle" class="text-sm" :class="subtitleClass">{{ subtitle }}</p>
    </div>
    <NuxtLink
      v-if="localizedTo"
      :to="localizedTo"
      class="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-gold transition hover:underline"
    >
      <span>{{ linkLabel || $t('see_all') }}</span>
      <span class="material-symbols-rounded text-sm">{{ forwardIcon }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    eyebrow?: string;
    to?: string;
    linkLabel?: string;
    tone?: 'ink' | 'surface';
  }>(),
  { tone: 'ink' },
);

const { locale } = useI18n();
const { localize } = useLocalizedPath();
const localizedTo = computed(() => (props.to ? localize(props.to) : undefined));
const forwardIcon = computed(() => (locale.value === 'ar' ? 'arrow_back' : 'arrow_forward'));
const titleClass = computed(() => (props.tone === 'surface' ? 'text-surface' : 'text-ink'));
const subtitleClass = computed(() => (props.tone === 'surface' ? 'text-surface/70' : 'text-ink-secondary'));
</script>
