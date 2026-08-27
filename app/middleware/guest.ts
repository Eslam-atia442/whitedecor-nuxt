export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const { localize } = useLocalizedPath();
  if (authStore.isAuthenticated) {
    return navigateTo(localize('/'), { replace: true });
  }
});
