<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 lg:hidden">
      <div class="absolute inset-0 bg-navy/60 backdrop-blur-xs" @click="$emit('close')" />
      <aside class="absolute inset-y-0 start-0 flex w-80 flex-col overflow-y-auto bg-card p-6 shadow-2xl">
        <div class="mb-5 flex items-center justify-between">
          <UiLogo />
          <UiButton variant="ghost" size="icon" @click="$emit('close')">
            <span class="material-symbols-rounded text-xl">close</span>
          </UiButton>
        </div>

        <NuxtLink
          :to="localePath('/search')"
          class="mb-4 flex h-12 w-full items-center gap-2 rounded-xl border border-mist bg-card px-3 text-sm text-ink-secondary"
          @click="$emit('close')"
        >
          <span class="material-symbols-rounded text-gold">search</span>
          <span>{{ $t('search_hint') }}</span>
        </NuxtLink>

        <DrawerNavLinks @close="$emit('close')" />

        <div class="mt-auto space-y-3 border-t border-mist pt-4">
          <DrawerSettingsList />
          <UiButton
            v-if="authStore.isAuthenticated"
            variant="danger"
            size="md"
            block
            @click="handleLogout"
          >
            {{ $t('logout') }}
          </UiButton>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: [] }>();
const localePath = useLocalePath();
const authStore = useAuthStore();

const handleLogout = async () => {
  emit('close');
  await authStore.logout();
};
</script>
