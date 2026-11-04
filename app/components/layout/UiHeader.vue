<template>
  <header
    class="sticky top-0 z-40 glass-header transition-shadow duration-300"
    :class="elevated ? 'shadow-subtle' : ''"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
      <div class="flex min-w-0 items-center gap-3">
        <UiButton
          v-if="showMobileBack"
          variant="outline"
          size="icon"
          rounded="pill"
          class="lg:hidden"
          :aria-label="$t('back')"
          @click="goBack"
        >
          <span class="material-symbols-rounded text-xl">{{ backIcon }}</span>
        </UiButton>
        <UiButton
          v-else
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
        <UiNotificationIndicator v-if="authStore.isAuthenticated" />
        <UiWishlistIndicator />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{ elevated?: boolean }>();
defineEmits<{ 'open-mobile-drawer': [] }>();

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { locale } = useI18n();
const authStore = useAuthStore();

const showMobileBack = computed(() => Boolean(route.meta.mobileBack));
const backIcon = computed(() => (locale.value === 'ar' ? 'arrow_forward' : 'arrow_back'));

const goBack = () => {
  if (router.options.history.state.back != null) {
    router.back();
    return;
  }
  router.push(localePath('/products'));
};
</script>
