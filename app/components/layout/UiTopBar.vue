<template>
  <div
    class="hidden overflow-hidden border-b border-mist bg-navy text-surface transition-all duration-300 lg:block"
    :class="isHidden ? 'max-h-0 border-transparent py-0 opacity-0' : 'max-h-12 opacity-100'"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
      <p class="font-medium">{{ $t('topbar_announcement') }}</p>
      <div class="flex items-center gap-4">
        <a
          v-if="settingsStore.contactInfo?.phone"
          :href="`tel:${settingsStore.contactInfo.phone}`"
          class="transition hover:text-gold"
          dir="ltr"
        >
          {{ settingsStore.contactInfo.phone }}
        </a>
        <a
          v-if="settingsStore.contactInfo?.whatsappCleanNumber"
          :href="`https://wa.me/${settingsStore.contactInfo.whatsappCleanNumber}`"
          target="_blank"
          rel="noopener noreferrer"
          class="transition hover:text-gold"
        >
          {{ $t('whatsapp_support') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isHidden?: boolean }>();
const settingsStore = useSettingsStore();
</script>
