export const useAppSessionSync = () => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const ordersStore = useOrdersStore();

  watch(
    () => authStore.isAuthenticated,
    (isAuth) => {
      if (isAuth) {
        ordersStore.fetchOrders(true);
        cartStore.fetchCart();
      } else {
        ordersStore.clearOrders();
        cartStore.fetchCart();
      }
    },
    { immediate: true },
  );

  return {
    cartBadgeCount: computed(() => cartStore.itemCount),
    ordersBadgeCount: computed(() => ordersStore.pendingOrdersCount),
  };
};
