<template>
  <header
    class="sticky top-0 z-40 glass-header transition-shadow duration-300"
    :class="elevated ? 'shadow-subtle' : ''"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
      <div class="flex min-w-0 items-center gap-3">
        <UiButton
          variant="outline"
          size="icon"
          rounded="pill"
          class="lg:hidden"
          :aria-label="$t('home')"
          @click="$emit('open-mobile-drawer')"
        >
          <span class="material-symbols-rounded text-xl">menu</span>
        </UiButton>
        <UiLogo />
      </div>

      <HeaderDesktopNav />

      <div class="flex shrink-0 items-center gap-2">
        <HeaderSearch />
        <UiIconBadgeLink
          to="/search"
          icon="search"
          :label="$t('search_hint')"
          class="lg:hidden"
        />
        <UiLanguageSwitcher />
        <UiWishlistIndicator />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ elevated?: boolean }>();
defineEmits<{ 'open-mobile-drawer': [] }>();
</script>
