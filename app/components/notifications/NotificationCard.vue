<template>
  <button
    type="button"
    class="group w-full rounded-3xl border border-mist bg-card p-5 text-start shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl active:scale-[0.98]"
    @click="$emit('open', notification)"
  >
    <div class="flex items-start gap-3">
      <span
        class="material-symbols-rounded mt-0.5 text-2xl"
        :class="notification.is_read ? 'text-ink-secondary/50' : 'text-gold'"
      >
        {{ notification.is_read ? 'notifications' : 'notifications_active' }}
      </span>
      <div class="min-w-0 flex-1">
        <h2
          class="text-sm sm:text-base text-ink"
          :class="notification.is_read ? 'font-medium' : 'font-bold'"
        >
          {{ notification.title }}
        </h2>
        <p class="mt-1 text-xs sm:text-sm text-ink-secondary line-clamp-3">
          {{ notification.body || $t('notification_no_body') }}
        </p>
        <p v-if="notification.created_at_human" class="mt-2 text-[11px] text-ink-secondary/70">
          {{ notification.created_at_human }}
        </p>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { NotificationDto } from '~/types/notifications';

defineProps<{ notification: NotificationDto }>();
defineEmits<{ open: [notification: NotificationDto] }>();
</script>
