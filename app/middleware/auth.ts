export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const localePath = useLocalePath();
  if (!authStore.isAuthenticated) {
    return navigateTo(`${localePath('/login')}?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
