export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const { localize } = useLocalizedPath();
  if (!authStore.isAuthenticated) {
    const redirect = encodeURIComponent(to.fullPath || '/');
    return navigateTo(localize(`/login?redirect=${redirect}`), { replace: true });
  }
});
