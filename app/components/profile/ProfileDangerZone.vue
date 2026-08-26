<template>
  <div class="rounded-3xl border border-red-500/20 bg-card p-6 shadow-card">
    <div class="mb-4 border-b border-mist pb-3">
      <h2 class="text-base font-bold text-red-500">{{ $t('danger_zone') }}</h2>
      <p class="text-xs text-ink-secondary">{{ $t('danger_zone_desc') }}</p>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col gap-2 sm:flex-row">
        <UiButton
          variant="outline"
          size="sm"
          class="border-mist hover:border-gold/40"
          @click="$emit('logout-click')"
        >
          <span class="material-symbols-rounded text-base">logout</span>
          <span>{{ $t('logout') }}</span>
        </UiButton>

        <UiButton
          variant="outline"
          size="sm"
          class="border-red-500/30 text-red-500 hover:bg-red-500/10"
          @click="$emit('delete-click')"
        >
          <span class="material-symbols-rounded text-base">person_remove</span>
          <span>{{ $t('delete_account') }}</span>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'logout-click': [];
  'delete-click': [];
}>();
</script>
