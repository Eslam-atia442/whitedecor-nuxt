<template>
  <AuthForgotPasswordForm />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' });
const { t } = useI18n();
useSeo({ title: t('forgot_password'), noIndex: true });
</script>
