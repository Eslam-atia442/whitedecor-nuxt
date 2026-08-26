export default defineNuxtRouteMiddleware((to) => {
  const settingsStore = useSettingsStore();
  const { localize } = useLocalizedPath();
  const isMaintenance = settingsStore.isMaintenanceMode;
  const maintenancePath = String(localize('/maintenance'));

  if (isMaintenance && to.path !== maintenancePath) {
    return navigateTo(maintenancePath);
  }

  if (!isMaintenance && to.path === maintenancePath) {
    return navigateTo(localize('/'));
  }
});
