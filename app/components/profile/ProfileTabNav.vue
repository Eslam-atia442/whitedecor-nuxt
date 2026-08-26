<template>
  <div class="flex flex-row overflow-x-auto rounded-2xl border border-mist bg-card p-1.5 shadow-subtle scrollbar-none sm:flex-col sm:overflow-visible">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-start text-xs font-bold transition-all sm:text-sm"
      :class="[
        activeTab === tab.id
          ? 'bg-gold/15 text-gold shadow-subtle border border-gold/30'
          : 'text-ink-secondary hover:bg-surface hover:text-ink',
      ]"
      @click="$emit('update:activeTab', tab.id)"
    >
      <span class="material-symbols-rounded text-lg">{{ tab.icon }}</span>
      <span>{{ $t(tab.labelKey) }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ProfileTabId, ProfileTabItem } from '~/types/profile';

defineProps<{
  activeTab: ProfileTabId;
}>();

defineEmits<{
  'update:activeTab': [tab: ProfileTabId];
}>();

const tabs: ProfileTabItem[] = [
  { id: 'personal', labelKey: 'tab_personal', icon: 'person' },
  { id: 'security', labelKey: 'tab_security', icon: 'lock' },
  { id: 'addresses', labelKey: 'tab_addresses', icon: 'location_on' },
  { id: 'preferences', labelKey: 'tab_preferences', icon: 'tune' },
];
</script>
