/* White Decor Web Push — public Firebase config (safe to ship in the SW). */
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAC7CQxqVSsrJgMwkASNBfUk6mPoHqX6pk',
  authDomain: 'whitedecor-dd3ba.firebaseapp.com',
  projectId: 'whitedecor-dd3ba',
  storageBucket: 'whitedecor-dd3ba.firebasestorage.app',
  messagingSenderId: '892549030739',
  appId: '1:892549030739:web:a4ff15c148388a2417f7a6',
});

const messaging = firebase.messaging();

const clean = (value) => (value == null ? '' : String(value).trim());

const notificationPath = (data) => {
  const type = clean(data && data.model_type).toLowerCase();
  if (type === 'order') {
    const id = clean(data.order_num) || clean(data.model_id);
    if (id) return `/orders/${id}`;
  }
  if (type === 'product') {
    const id = clean(data.slug) || clean(data.model_id);
    if (id) return `/products/${id}`;
  }
  if (type === 'coupon') {
    return '/checkout';
  }
  const params = new URLSearchParams();
  ['model_type', 'model_id', 'order_num', 'slug', 'id', 'notification_id'].forEach((key) => {
    const value = clean(data && data[key]);
    if (value) params.set(key, value);
  });
  const query = params.toString();
  return query ? `/notifications?${query}` : '/notifications';
};

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || '';
  const body = (payload.notification && payload.notification.body) || '';
  if (!title) return;
  self.registration.showNotification(title, {
    body,
    data: payload.data || {},
    icon: '/favicon-32x32.png',
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  const targetPath = notificationPath(data);
  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of allClients) {
        client.postMessage({ type: 'FCM_CLICK', payload: data });
        if ('focus' in client) {
          await client.focus();
          return;
        }
      }
      await clients.openWindow(targetPath);
    })(),
  );
});
