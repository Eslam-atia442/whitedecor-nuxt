import { defineStore } from 'pinia';
import { API_ENDPOINTS } from '~/constants/api_endpoints';
import type {
  NotificationDto,
  NotificationPagination,
  NotificationsListData,
  NotificationsStatus,
} from '~/types/notifications';

const PAGE_LIMIT = 15;

const unwrapList = (raw: NotificationsListData['notifications']): NotificationDto[] => {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
};

export const useNotificationsStore = defineStore('notifications', () => {
  const api = useApi();

  const items = ref<NotificationDto[]>([]);
  const unreadCount = ref(0);
  const status = ref<NotificationsStatus>('idle');
  const errorMessage = ref<string | null>(null);
  const pagination = ref<NotificationPagination>({
    current_page: 1,
    last_page: 1,
    per_page: PAGE_LIMIT,
    total: 0,
  });
  const isLoadingMore = ref(false);
  const fcmToken = ref<string | null>(null);

  const isLoading = computed(() => status.value === 'loading' && items.value.length === 0);
  const hasMore = computed(() => pagination.value.current_page < pagination.value.last_page);

  const fetch = async (force = false) => {
    if (status.value === 'loading' && !force) return;
    status.value = 'loading';
    errorMessage.value = null;
    try {
      const res = await api.get<{ data?: NotificationsListData }>(API_ENDPOINTS.NOTIFICATIONS.LIST, {
        query: { page: 1, limit: PAGE_LIMIT },
      });
      const data = res?.data || {};
      items.value = unwrapList(data.notifications);
      unreadCount.value = Number(data.unread_count || 0);
      pagination.value = {
        current_page: data.pagination?.current_page || 1,
        last_page: data.pagination?.last_page || 1,
        per_page: data.pagination?.per_page || PAGE_LIMIT,
        total: data.pagination?.total || items.value.length,
      };
      status.value = 'success';
    } catch (err: any) {
      status.value = 'error';
      errorMessage.value = err?.firstError || err?.message || 'error_occurred';
    }
  };

  const loadMore = async () => {
    if (!hasMore.value || isLoadingMore.value || status.value !== 'success') return;
    isLoadingMore.value = true;
    const nextPage = pagination.value.current_page + 1;
    try {
      const res = await api.get<{ data?: NotificationsListData }>(API_ENDPOINTS.NOTIFICATIONS.LIST, {
        query: { page: nextPage, limit: PAGE_LIMIT },
      });
      const data = res?.data || {};
      items.value = [...items.value, ...unwrapList(data.notifications)];
      unreadCount.value = Number(data.unread_count ?? unreadCount.value);
      pagination.value = {
        current_page: data.pagination?.current_page || nextPage,
        last_page: data.pagination?.last_page || pagination.value.last_page,
        per_page: data.pagination?.per_page || PAGE_LIMIT,
        total: data.pagination?.total || pagination.value.total,
      };
    } catch {
      // keep existing list
    } finally {
      isLoadingMore.value = false;
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get<{ data?: { unread_count?: number } }>(
        API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT,
      );
      unreadCount.value = Number(res?.data?.unread_count || 0);
    } catch {
      // ignore
    }
  };

  const markRead = async (id: string) => {
    const target = items.value.find((item) => item.id === id);
    if (target && !target.is_read) {
      target.is_read = true;
      unreadCount.value = Math.max(0, unreadCount.value - 1);
    }
    try {
      await api.post(API_ENDPOINTS.NOTIFICATIONS.READ(id));
    } catch {
      if (target) target.is_read = false;
    }
  };

  const markAllRead = async () => {
    items.value = items.value.map((item) => ({ ...item, is_read: true }));
    unreadCount.value = 0;
    try {
      await api.post(API_ENDPOINTS.NOTIFICATIONS.READ_ALL);
    } catch {
      // ignore
    }
  };

  const registerFcmToken = async (token: string) => {
    fcmToken.value = token;
    try {
      await api.post(API_ENDPOINTS.DEVICES.FCM_TOKEN, {
        fcm_token: token,
        device_type: 'web',
      });
    } catch {
      // ignore token bind failures (permission / network)
    }
  };

  const clear = () => {
    items.value = [];
    unreadCount.value = 0;
    status.value = 'idle';
    errorMessage.value = null;
    pagination.value = { current_page: 1, last_page: 1, per_page: PAGE_LIMIT, total: 0 };
  };

  return {
    items,
    unreadCount,
    status,
    errorMessage,
    pagination,
    isLoadingMore,
    fcmToken,
    isLoading,
    hasMore,
    fetch,
    loadMore,
    fetchUnreadCount,
    markRead,
    markAllRead,
    registerFcmToken,
    clear,
  };
});
