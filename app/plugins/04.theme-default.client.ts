export default defineNuxtPlugin(() => {
  const colorMode = useColorMode();
  if (colorMode.preference === 'system') {
    colorMode.preference = 'light';
  }
});
