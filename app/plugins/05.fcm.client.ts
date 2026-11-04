import { toast } from 'vue-sonner';
import type { NotificationPathInput } from '~/types/notifications';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const authStore = useAuthStore();
  const notificationsStore = useNotificationsStore();
  const deepLink = useNotificationDeepLink();

  let unsubscribeOnMessage: (() => void) | null = null;

  const firebaseOptions = {
    apiKey: String(config.firebaseApiKey || ''),
    authDomain: String(config.firebaseAuthDomain || ''),
    projectId: String(config.firebaseProjectId || ''),
    storageBucket: String(config.firebaseStorageBucket || ''),
    messagingSenderId: String(config.firebaseMessagingSenderId || ''),
    appId: String(config.firebaseAppId || ''),
  };
  const vapidKey = String(config.firebaseVapidKey || '');

  let messaging: unknown = null;

  const registerToken = async () => {
    if (!messaging || !vapidKey) return;
    try {
      if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
      const { getToken } = await import('firebase/messaging');
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      const token = await getToken(messaging as never, { vapidKey, serviceWorkerRegistration: registration });
      if (token) await notificationsStore.registerFcmToken(token);
    } catch (error) {
      if (import.meta.dev) console.warn('[FCM] token', error);
    }
  };

  const enableWebPush = async () => {
    try {
      if (typeof Notification === 'undefined') return;
      if (Notification.permission === 'denied') return;
      if (Notification.permission === 'default') await Notification.requestPermission();
      await registerToken();
    } catch (error) {
      if (import.meta.dev) console.warn('[FCM] enable', error);
    }
  };

  const boot = async () => {
    try {
      if (!firebaseOptions.apiKey || !firebaseOptions.appId || !vapidKey) return;
      const { isSupported, getMessaging, onMessage } = await import('firebase/messaging');
      const { initializeApp, getApps } = await import('firebase/app');
      const supported = await isSupported().catch(() => false);
      if (!supported) return;

      const app = getApps()[0] ?? initializeApp(firebaseOptions);
      messaging = getMessaging(app);
      unsubscribeOnMessage = onMessage(messaging as never, (payload) => {
        const title = payload.notification?.title || payload.data?.title || '';
        const body = payload.notification?.body || payload.data?.body || '';
        if (title) toast(title, { description: body });
        if (authStore.isAuthenticated) notificationsStore.fetchUnreadCount();
      });

      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        await registerToken();
      }
    } catch (error) {
      if (import.meta.dev) console.warn('[FCM] boot', error);
    }
  };

  const onSwMessage = (event: MessageEvent) => {
    if (event.data?.type !== 'FCM_CLICK') return;
    deepLink.open((event.data.payload || {}) as NotificationPathInput);
  };

  if (import.meta.client) {
    navigator.serviceWorker?.addEventListener('message', onSwMessage);
    watch(
      () => authStore.isAuthenticated,
      (isAuth) => {
        if (isAuth) notificationsStore.fetchUnreadCount();
        else notificationsStore.clear();
        registerToken();
      },
    );
    boot();
    const onPageHide = () => {
      unsubscribeOnMessage?.();
      navigator.serviceWorker?.removeEventListener('message', onSwMessage);
      window.removeEventListener('pagehide', onPageHide);
    };
    window.addEventListener('pagehide', onPageHide);
  }

  nuxtApp.provide('enableWebPush', enableWebPush);
});
