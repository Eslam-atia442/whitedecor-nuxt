<template>
  <div class="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[radial-gradient(ellipse_at_center,_#18233C_0%,_#0B111D_60%,_#05080F_100%)] px-6 py-12 select-none">
    <!-- Top Bar (Clean, no buttons) -->
    <div class="w-full max-w-md flex items-center justify-center">
      <span class="text-xs font-mono tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/25">
        🛠️ White Decor — Splash Screen Preview
      </span>
    </div>

    <!-- Center Brand Emblem & Identity -->
    <div class="relative flex flex-col items-center gap-6 text-center">
      <!-- Ambient Gold Glow Aura -->
      <div class="absolute -inset-8 bg-gradient-to-tr from-gold/25 to-amber-300/15 rounded-full blur-2xl pointer-events-none -z-10 animate-pulse" />

      <!-- Emblem Wrapper with Polished Glass Border -->
      <div class="relative group">
        <div class="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-gold/50 via-amber-200/40 to-gold/20 opacity-70 blur-xs" />
        <div class="relative">
          <SplashEmblem />
        </div>
      </div>

      <div class="space-y-2 max-w-xs">
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-wider text-white font-cairo">
          {{ settingsStore.appName }}
        </h1>
        <p class="text-xs sm:text-sm text-white/70 tracking-wide font-cairo">
          {{ $t('splash.loading_brand') }}
        </p>
      </div>

      <!-- Luxury Minimalist Animated Loader Line -->
      <div class="w-36 h-1 rounded-full bg-white/10 overflow-hidden relative mt-2">
        <div class="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-gold to-amber-200 rounded-full animate-indeterminate" />
      </div>
    </div>

    <!-- Footer: Version Badge -->
    <div class="w-full flex flex-col items-center gap-2 text-white/50 text-xs">
      <SplashVersionBadge />
      <span class="text-[11px] text-white/30 font-mono">
        This view is static and frozen for real-time UI/UX design inspection.
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const settingsStore = useSettingsStore();

onMounted(async () => {
  if (!settingsStore.appSettings) {
    await settingsStore.fetchSettings();
  }
});
</script>

<style scoped>
@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(300%);
  }
}

.animate-indeterminate {
  animation: indeterminate 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}
</style>

