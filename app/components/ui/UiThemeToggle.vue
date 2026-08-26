<template>
  <button
    type="button"
    class="group relative flex h-9 w-16 items-center rounded-pill border border-mist bg-card p-1 shadow-subtle transition-all hover:border-gold/50"
    :aria-label="$t('settings.theme_mode')"
    @click="toggleTheme"
  >
    <span
      class="absolute top-1 size-7 rounded-full gold-gradient shadow-subtle transition-all duration-300"
      :class="isDark ? 'end-1' : 'start-1'"
    />
    <span class="z-10 flex size-7 items-center justify-center text-xs select-none">
      <span class="material-symbols-rounded text-sm font-bold" :class="!isDark ? 'text-[#0A0E29]' : 'text-ink-secondary'">light_mode</span>
    </span>
    <span class="z-10 ms-auto flex size-7 items-center justify-center text-xs select-none">
      <span class="material-symbols-rounded text-sm font-bold" :class="isDark ? 'text-[#0A0E29]' : 'text-ink-secondary'">dark_mode</span>
    </span>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const settingsStore = useSettingsStore();

const isDark = computed(() => colorMode.value === 'dark');

const toggleTheme = () => {
  const next = isDark.value ? 'light' : 'dark';
  settingsStore.setTheme(next);
};
</script>
