<template>
  <AuthRegisterForm />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' });
const { t } = useI18n();
useSeo({ title: t('create_account'), noIndex: true });
</script>
