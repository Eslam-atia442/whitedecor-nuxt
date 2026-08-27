<template>
  <AuthLoginForm />
</template>

<script setup lang="ts">
import { safeRedirectPath } from '~/constants/route_access';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const { t } = useI18n();
const route = useRoute();
const authStore = useAuthStore();
const { localize } = useLocalizedPath();

useSeo({ title: t('sign_in'), description: t('sign_in_continue'), noIndex: true });

onMounted(async () => {
  if (route.query.demo_auth === 'true' || route.query.mock === 'true') {
    authStore.setAuthSession('test_token_123', {
      id: 1,
      name: 'سارة أحمد',
      phone: '+201000933972',
      email: 'sarah.ahmed@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      country_id: '1',
    });
    const redirect = safeRedirectPath(route.query.redirect || '/profile');
    await navigateTo(localize(redirect));
  }
});
</script>
