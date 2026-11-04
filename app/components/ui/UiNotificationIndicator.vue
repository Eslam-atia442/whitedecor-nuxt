<template>
  <UiIconBadgeLink
    to="/notifications"
    icon="notifications"
    :label="$t('notifications')"
    :count="count"
  />
</template>

<script setup lang="ts">
const notificationsStore = useNotificationsStore();
const count = computed(() => notificationsStore.unreadCount);
</script>
