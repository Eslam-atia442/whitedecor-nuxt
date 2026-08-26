<template>
  <AuthOtpForm />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' });
const { t } = useI18n();
useSeo({ title: t('verify_code'), noIndex: true });
</script>
