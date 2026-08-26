<template>
  <section :class="embedded ? 'space-y-8' : 'border-t border-mist bg-card/60 py-10 backdrop-blur-sm'">
    <div :class="embedded ? '' : 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'">
      <UiSectionHeader
        v-if="heading"
        class="mb-8"
        :title="heading"
        :subtitle="subheading"
      />
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <UiCard
          v-for="item in displayItems"
          :key="item.titleKey"
          variant="default"
          padding="md"
          interactive
          class="flex flex-col items-center text-center"
        >
          <div class="mb-3 flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <span class="material-symbols-rounded text-2xl">{{ item.icon }}</span>
          </div>
          <p class="text-xs font-bold text-ink">{{ $t(item.titleKey) }}</p>
          <p v-if="item.descKey" class="mt-1.5 text-xs leading-relaxed text-ink-secondary">
            {{ $t(item.descKey) }}
          </p>
        </UiCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { WhyUsItem } from '~/types/home';

const props = withDefaults(
  defineProps<{
    items?: WhyUsItem[];
    heading?: string;
    subheading?: string;
    embedded?: boolean;
  }>(),
  { items: undefined, embedded: false },
);

const defaultItems: WhyUsItem[] = [
  { icon: 'local_shipping', titleKey: 'fast_delivery' },
  { icon: 'verified', titleKey: 'guaranteed_quality' },
  { icon: 'published_with_changes', titleKey: 'easy_returns' },
  { icon: 'lock', titleKey: 'secure_payment' },
];

const displayItems = computed(() => props.items?.length ? props.items : defaultItems);
</script>
