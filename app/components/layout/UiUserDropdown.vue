<template>
  <div ref="dropdownRef" class="relative">
    <button
      v-if="authStore.isAuthenticated"
      type="button"
      class="group relative flex size-10 shrink-0 items-center justify-center rounded-full border border-mist/80 bg-card text-ink shadow-subtle transition-all duration-200 hover:border-gold/50 hover:bg-gold/10 hover:text-gold active:scale-95"
      :class="isOpen ? 'border-gold ring-2 ring-gold/20 text-gold' : ''"
      :aria-label="authStore.userName || $t('profile_title')"
      :title="authStore.userName || $t('profile_title')"
      @click="isOpen = !isOpen"
    >
      <span class="material-symbols-rounded text-xl transition-transform duration-200 group-hover:scale-105">
        person
      </span>
    </button>

    <NuxtLink
      v-else
      :to="localize('/login')"
      class="group relative flex size-10 shrink-0 items-center justify-center rounded-full border border-mist/80 bg-card text-ink shadow-subtle transition-all duration-200 hover:border-gold/50 hover:bg-gold/10 hover:text-gold active:scale-95"
      :aria-label="$t('sign_in')"
      :title="$t('sign_in')"
    >
      <span class="material-symbols-rounded text-xl transition-transform duration-200 group-hover:scale-105">
        person
      </span>
    </NuxtLink>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen && authStore.isAuthenticated"
      class="absolute end-0 top-full mt-2.5 w-56 rounded-2xl border border-mist bg-card p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50"
    >
      <div class="border-b border-mist px-3 py-2.5 flex items-center gap-2.5">
        <div class="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
          <span class="material-symbols-rounded text-lg">person</span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-bold text-ink">{{ authStore.userName }}</p>
          <p class="truncate text-[11px] text-ink-secondary" dir="ltr">{{ authStore.userPhone }}</p>
        </div>
      </div>

      <nav class="mt-1 space-y-0.5">
        <NuxtLink :to="localize('/profile')" class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-ink transition hover:bg-surface hover:text-gold" @click="isOpen = false">
          <span class="material-symbols-rounded text-base text-gold">person</span>
          <span>{{ $t('profile_title') }}</span>
        </NuxtLink>

        <NuxtLink :to="localize('/orders')" class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-ink transition hover:bg-surface hover:text-gold" @click="isOpen = false">
          <span class="material-symbols-rounded text-base text-gold">local_shipping</span>
          <span>{{ $t('orders') }}</span>
        </NuxtLink>

        <NuxtLink :to="localize('/profile?tab=addresses')" class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-ink transition hover:bg-surface hover:text-gold" @click="isOpen = false">
          <span class="material-symbols-rounded text-base text-gold">location_on</span>
          <span>{{ $t('tab_addresses') }}</span>
        </NuxtLink>
      </nav>

      <div class="mt-1 border-t border-mist pt-1">
        <button
          type="button"
          class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-start text-xs font-bold text-red-500 transition hover:bg-red-500/10"
          @click="handleLogout"
        >
          <span class="material-symbols-rounded text-base">logout</span>
          <span>{{ $t('logout') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const { localize } = useLocalizedPath();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  if (import.meta.client) document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  if (import.meta.client) document.removeEventListener('click', handleClickOutside);
});

const handleLogout = async () => {
  isOpen.value = false;
  await authStore.logout();
};
</script>
