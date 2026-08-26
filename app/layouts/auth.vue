<template>
  <div class="relative flex min-h-dvh flex-col justify-between bg-surface text-ink antialiased">
    <!-- Header -->
    <header class="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6">
      <div class="flex items-center gap-3">
        <UiButton
          variant="outline"
          size="icon"
          rounded="pill"
          :aria-label="$t('back')"
          @click="goBack"
        >
          <span class="material-symbols-rounded text-xl rtl:rotate-180">arrow_back</span>
        </UiButton>
        <UiLogo />
      </div>
      <div class="flex items-center gap-3">
        <UiLanguageSwitcher />
        <UiThemeToggle />
      </div>
    </header>

    <!-- Main Auth Center Stage (Spacious Centered Card) -->
    <main class="mx-auto flex w-full max-w-xl flex-1 items-center justify-center px-4 py-6">
      <div class="w-full rounded-3xl border border-mist bg-card p-6 shadow-card sm:p-10">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="py-4 text-center text-xs text-ink-secondary">
      <div class="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 px-4">
        <span>© {{ new Date().getFullYear() }} {{ $t('app_name') }}</span>
        <NuxtLink :to="localePath('/terms')" class="transition hover:text-gold hover:underline">{{ $t('legal.terms_conditions') }}</NuxtLink>
        <NuxtLink :to="localePath('/privacy')" class="transition hover:text-gold hover:underline">{{ $t('legal.privacy_policy') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')" class="transition hover:text-gold hover:underline">{{ $t('legal.about_us') }}</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const router = useRouter();

const goBack = () => {
  if (import.meta.client && window.history.state?.back) {
    router.back();
    return;
  }
  navigateTo(localePath('/'));
};
</script>
