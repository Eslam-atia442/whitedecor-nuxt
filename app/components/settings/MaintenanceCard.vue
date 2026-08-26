<template>
  <div class="mx-auto max-w-lg rounded-2xl border border-mist bg-card p-8 text-center shadow-card">
    <UiLogo class="mb-6 justify-center" />
    <h1 class="text-fluid-h2 font-bold text-ink">{{ $t('maintenance.title') }}</h1>
    <p class="mt-3 text-ink-secondary">{{ $t('maintenance.subtitle') }}</p>
    <div v-if="killScreenHtml" class="mt-6 rounded-lg bg-mist/30 p-4 text-start text-sm">
      <PolicyContentRenderer :html="killScreenHtml" />
    </div>
    <p class="mt-4 text-sm text-ink-secondary">{{ $t('maintenance.need_assistance') }}</p>
    <MaintenanceChannels :contact-info="contactInfo" class="mt-6" />
    <UiButton class="mt-6 w-full" :loading="checking" @click="onCheck">
      {{ $t('maintenance.check_status_btn') }}
    </UiButton>
    <p class="mt-3 text-xs text-ink-secondary">
      {{ $t('maintenance.auto_retry_countdown', { seconds: retrySeconds }) }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { retrySeconds, contactInfo, killScreenHtml, checkStatus } = useMaintenanceMode();
const checking = ref(false);

const onCheck = async () => {
  checking.value = true;
  await checkStatus();
  checking.value = false;
};
</script>
