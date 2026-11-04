import {
  notificationPath,
  notificationRequiresAuth,
  PENDING_NOTIFICATION_KEY,
} from '~/utils/notification_path';
import type { NotificationPathInput } from '~/types/notifications';

const readPending = (): NotificationPathInput | null => {
  if (!import.meta.client) return null;
  try {
    const raw = sessionStorage.getItem(PENDING_NOTIFICATION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as NotificationPathInput;
  } catch {
    return null;
  }
};

export const useNotificationDeepLink = () => {
  const authStore = useAuthStore();
  const notificationsStore = useNotificationsStore();
  const { push } = useLocalizedPath();

  const stash = (input: NotificationPathInput) => {
    if (!import.meta.client) return;
    sessionStorage.setItem(PENDING_NOTIFICATION_KEY, JSON.stringify(input));
  };

  const take = (): NotificationPathInput | null => {
    const pending = readPending();
    if (import.meta.client) sessionStorage.removeItem(PENDING_NOTIFICATION_KEY);
    return pending;
  };

  const open = async (input: NotificationPathInput) => {
    const path = notificationPath(input);
    const notificationId = input.notification_id || input.id;

    if (notificationRequiresAuth(input) && !authStore.isAuthenticated) {
      stash(input);
      await push(`/login?redirect=${encodeURIComponent(path)}`);
      return;
    }

    if (notificationId && authStore.isAuthenticated) {
      await notificationsStore.markRead(String(notificationId));
    }

    await push(path);
  };

  const flush = async (fromQuery?: NotificationPathInput | null) => {
    const queryHasTarget = Boolean(
      fromQuery &&
        (fromQuery.model_type || fromQuery.model_id || fromQuery.order_num || fromQuery.slug),
    );
    const pending = queryHasTarget ? fromQuery : take();
    if (!pending) return;
    await open(pending);
  };

  return { open, flush, stash, take };
};
