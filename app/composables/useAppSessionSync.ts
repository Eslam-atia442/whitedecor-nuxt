export const useAppSessionSync = () => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const ordersStore = useOrdersStore();
  const notificationsStore = useNotificationsStore();

  watch(
    () => authStore.isAuthenticated,
    (isAuth) => {
      if (isAuth) {
        ordersStore.fetchOrders(true);
        cartStore.fetchCart();
        notificationsStore.fetchUnreadCount();
      } else {
        ordersStore.clearOrders();
        notificationsStore.clear();
        cartStore.fetchCart();
      }
    },
    { immediate: true },
  );

  return {
    cartBadgeCount: computed(() => cartStore.itemCount),
    ordersBadgeCount: computed(() => ordersStore.pendingOrdersCount),
    notificationsBadgeCount: computed(() => notificationsStore.unreadCount),
  };
};
