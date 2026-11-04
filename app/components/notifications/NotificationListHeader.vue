<template>
  <div class="relative overflow-hidden rounded-3xl border border-mist bg-card p-6 shadow-card sm:p-8">
    <div class="absolute -end-10 -top-10 size-40 rounded-full bg-gold/5 blur-2xl pointer-events-none" />
    <div class="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex items-start gap-4 sm:items-center">
        <div class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold shadow-subtle">
          <span class="material-symbols-rounded text-3xl">notifications</span>
        </div>
        <div>
          <h1 class="text-2xl font-black text-ink sm:text-3xl">{{ $t('notifications') }}</h1>
          <p class="mt-1 max-w-xl text-xs leading-relaxed text-ink-secondary sm:text-sm">
            {{ $t('notifications_subtitle') }}
          </p>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <UiButton v-if="showPushCta" variant="outline" size="sm" rounded="pill" @click="$emit('enable-push')">
          {{ $t('notifications_enable') }}
        </UiButton>
        <UiButton
          v-if="store.unreadCount > 0"
          variant="gold"
          size="sm"
          rounded="pill"
          @click="store.markAllRead()"
        >
          {{ $t('notifications_mark_all_read') }}
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ 'enable-push': [] }>();

const store = useNotificationsStore();
const showPushCta = ref(false);

onMounted(() => {
  if (!import.meta.client || typeof Notification === 'undefined') return;
  showPushCta.value = Notification.permission === 'default';
});
</script>
