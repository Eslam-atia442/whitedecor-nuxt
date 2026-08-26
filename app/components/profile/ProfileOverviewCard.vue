<template>
  <div class="relative overflow-hidden rounded-3xl border border-mist bg-card p-6 shadow-card transition-all duration-300">
    <div class="absolute -top-12 -end-12 size-40 rounded-full bg-gold/5 blur-2xl pointer-events-none" />
    
    <div class="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
      <div class="relative group">
        <div class="relative size-24 overflow-hidden rounded-full border-2 border-gold/40 shadow-gold transition group-hover:border-gold">
          <img
            :src="avatarPreview || authStore.userAvatar"
            :alt="authStore.userName"
            class="size-full object-cover"
          >
        </div>
        <button
          type="button"
          class="absolute bottom-0 end-0 flex size-8 items-center justify-center rounded-full bg-gold text-navy shadow-subtle transition transform active:scale-95 hover:scale-105"
          :title="$t('change_avatar')"
          @click="$emit('pick-avatar')"
        >
          <span class="material-symbols-rounded text-base">photo_camera</span>
        </button>
      </div>

      <div class="flex-1 text-center sm:text-start">
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <h1 class="text-fluid-h2 font-bold text-ink">{{ authStore.userName || $t('profile') }}</h1>
          <span class="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-bold text-gold">
            <span class="material-symbols-rounded text-xs">verified</span>
            <span>{{ $t('verified_account') }}</span>
          </span>
        </div>

        <p class="mt-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-ink-secondary">
          <span class="material-symbols-rounded text-sm text-gold">call</span>
          <span dir="ltr">{{ authStore.userPhone }}</span>
        </p>

        <p v-if="authStore.userEmail" class="mt-0.5 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-ink-secondary">
          <span class="material-symbols-rounded text-sm text-gold">mail</span>
          <span>{{ authStore.userEmail }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  avatarPreview?: string | null;
}>();

defineEmits<{
  'pick-avatar': [];
}>();

const authStore = useAuthStore();
</script>
