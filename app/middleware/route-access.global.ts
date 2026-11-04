import {
  AUTH_REQUIRED_PREFIXES,
  GUEST_ONLY_PREFIXES,
  pathMatchesPrefix,
} from '~/constants/route_access';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const { localize, unprefix } = useLocalizedPath();
  const path = unprefix(to.path);

  if (pathMatchesPrefix(path, AUTH_REQUIRED_PREFIXES) && !authStore.isAuthenticated) {
    const redirect = encodeURIComponent(to.fullPath || '/');
    return navigateTo(localize(`/login?redirect=${redirect}`), { replace: true });
  }

  if (pathMatchesPrefix(path, GUEST_ONLY_PREFIXES) && authStore.isAuthenticated) {
    return navigateTo(localize('/'), { replace: true });
  }
});
