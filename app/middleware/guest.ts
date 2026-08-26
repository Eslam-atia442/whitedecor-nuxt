export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const localePath = useLocalePath();
  if (authStore.isAuthenticated) {
    return navigateTo(localePath('/'));
  }
});
