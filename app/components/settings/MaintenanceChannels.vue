<template>
  <div class="flex flex-wrap justify-center gap-3">
    <a
      :href="`https://wa.me/${contactInfo.whatsappCleanNumber}`"
      target="_blank"
      rel="noopener"
      class="inline-flex items-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-medium text-surface"
    >
      💬 {{ $t('maintenance.whatsapp_btn') }}
    </a>
    <a
      :href="`tel:${contactInfo.phone}`"
      class="inline-flex items-center gap-2 rounded-lg border border-mist bg-card px-4 py-2.5 text-sm font-medium text-ink"
    >
      📞 {{ $t('maintenance.call_btn') }}
    </a>
  </div>
</template>

<script setup lang="ts">
import type { ContactInfo } from '~/types/settings';
defineProps<{ contactInfo: ContactInfo }>();
</script>
