<template>
  <UiCard
    variant="elevated"
    padding="lg"
    class="mx-auto max-w-3xl text-center"
    :class="active ? 'opacity-100' : 'hidden'"
  >
    <div class="flex justify-center">
      <UiRatingStars :rating="item.rating" />
    </div>
    <p class="mt-4 text-base leading-relaxed text-ink sm:text-lg">“{{ $t(item.quoteKey) }}”</p>
    <p class="mt-5 text-sm font-bold text-ink">{{ $t(item.nameKey) }}</p>
    <div class="mt-2 flex justify-center">
      <UiBadge variant="green" size="sm">
        <span class="material-symbols-rounded text-[10px]">verified</span>
        <span>{{ $t('verified_buyer') }}</span>
      </UiBadge>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import type { TestimonialDto } from '~/types/home';

defineProps<{ item: TestimonialDto; active: boolean }>();
</script>
