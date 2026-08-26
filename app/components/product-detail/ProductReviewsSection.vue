<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between border-b border-mist pb-4">
      <div>
        <h3 class="text-base sm:text-lg font-bold text-ink">{{ $t('customer_reviews') }}</h3>
        <p class="text-xs text-ink-secondary">{{ $t('based_on_reviews', { count: 24 }) }}</p>
      </div>
      <UiRatingStars :rating="4.9" :count="24" />
    </div>

    <!-- Review Items List -->
    <div class="space-y-4">
      <div
        v-for="review in mockReviews"
        :key="review.id"
        class="rounded-2xl border border-mist bg-card p-4 shadow-subtle space-y-2"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xs sm:text-sm font-bold text-ink">{{ review.reviewerName }}</span>
            <UiBadge variant="green" size="sm">
              <span class="material-symbols-rounded text-[10px]">verified</span>
              <span>{{ $t('verified_buyer') }}</span>
            </UiBadge>
          </div>
          <span class="text-[11px] text-ink-secondary">{{ review.createdAt }}</span>
        </div>
        <UiRatingStars :rating="review.rating" />
        <p class="text-xs sm:text-sm text-ink-secondary leading-relaxed">
          {{ review.comment }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDto } from '~/types/product';

defineProps<{
  product: ProductDto;
}>();

const mockReviews = [
  {
    id: 1,
    reviewerName: 'سارة خالد',
    rating: 5,
    comment: 'القطعة ممتازة وجودة الخامات راقية جداً تفوق التوقعات والتوصيل كان في الموعد المحدد.',
    createdAt: 'منذ يومين',
  },
  {
    id: 2,
    reviewerName: 'عمر طارق',
    rating: 5,
    comment: 'تشطيب دقيق ولون متناسق تماماً مع صور الموقع، أنصح بها بشدة لإضفاء لمسة فاخرة.',
    createdAt: 'منذ أسبوع',
  },
];
</script>
