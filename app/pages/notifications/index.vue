<template>
  <div class="space-y-6">
    <UiBreadcrumbs :items="breadcrumbs" />
    <NotificationListHeader @enable-push="enablePush" />

    <div
      v-if="store.isLoading"
      class="grid grid-cols-1 gap-4"
    >
      <div
        v-for="n in 4"
        :key="n"
        class="h-28 rounded-3xl border border-mist bg-mist/30 animate-pulse"
      />
    </div>

    <NotificationEmptyState v-else-if="store.items.length === 0" />

    <div v-else class="grid grid-cols-1 gap-4">
      <NotificationCard
        v-for="item in store.items"
        :key="item.id"
        :notification="item"
        @open="openItem"
      />
      <div class="flex justify-center pt-2">
        <UiButton
          v-if="store.hasMore"
          variant="outline"
          size="md"
          rounded="pill"
          :loading="store.isLoadingMore"
          @click="store.loadMore()"
        >
          {{ $t('notifications_load_more') }}
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NotificationDto } from '~/types/notifications';

definePageMeta({ middleware: ['auth'] });

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const store = useNotificationsStore();
const deepLink = useNotificationDeepLink();

useSeo({ title: t('notifications'), noIndex: true });

const breadcrumbs = computed(() => [
  { label: t('home'), to: localePath('/') },
  { label: t('notifications'), to: localePath('/notifications') },
]);

const openItem = (item: NotificationDto) => {
  deepLink.open({
    ...item,
    notification_id: item.id,
  });
};

const enablePush = async () => {
  const nuxtApp = useNuxtApp();
  await (nuxtApp.$enableWebPush as (() => Promise<void>) | undefined)?.();
};

onMounted(async () => {
  await store.fetch(true);
  await deepLink.flush({
    model_type: route.query.model_type as string | undefined,
    model_id: route.query.model_id as string | undefined,
    order_num: route.query.order_num as string | undefined,
    slug: route.query.slug as string | undefined,
    id: route.query.id as string | undefined,
  });
});
</script>
