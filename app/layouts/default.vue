<template>
  <div class="relative flex min-h-dvh flex-col bg-surface text-ink antialiased">
    <AmbientMeshBackdrop />
    <div class="relative z-10 flex min-h-dvh flex-col">
      <UiTopBar :is-hidden="isScrolled" />
      <UiHeader :elevated="isScrolled" @open-mobile-drawer="isDrawerOpen = true" />
      <main
        class="w-full flex-1"
        :class="isFullBleed
          ? 'pb-28 lg:pb-0'
          : 'mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:py-10 lg:pb-12'"
      >
        <slot />
      </main>
      <UiTrustBadges v-if="!isFullBleed" class="hidden lg:block" />
      <UiAppFooter />
      <UiMobileDrawer :is-open="isDrawerOpen" @close="isDrawerOpen = false" />
      <UiMobileBottomNav />
      <AppSplashOverlay />
      <AppDownloadDialog />
    </div>
  </div>
</template>

<script setup lang="ts">
const isDrawerOpen = ref(false);
const { isScrolled } = useSmartHeader();
const route = useRoute();
const isFullBleed = computed(() => Boolean(route.meta.fullBleed));

watch(() => route.fullPath, () => {
  isDrawerOpen.value = false;
});
</script>
