export default defineNuxtPlugin(async () => {
  const settingsStore = useSettingsStore();
  await settingsStore.initSettings();
});
