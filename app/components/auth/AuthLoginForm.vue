<template>
  <form class="space-y-4 sm:space-y-5" @submit.prevent="onSubmit">
    <div class="space-y-1">
      <h1 class="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{{ $t('welcome_back') }}</h1>
      <p class="text-xs text-ink-secondary sm:text-sm">{{ $t('sign_in_continue') }}</p>
    </div>

    <UiPhoneInput v-model="phone" :label="$t('phone')" :has-error="!!phoneError" :error-message="phoneError" required />
    <UiInput v-model="password" type="password" :label="$t('password')" :placeholder="$t('password')" :has-error="!!passwordError" :error-message="passwordError" required autocomplete="current-password" />

    <div class="flex items-center justify-between text-xs">
      <UiCheckbox v-model="rememberMe">
        <span class="text-xs font-medium text-ink">{{ $t('remember_me') }}</span>
      </UiCheckbox>
      <NuxtLink :to="localize('/forgot-password')" class="font-bold text-gold transition hover:underline">
        {{ $t('forgot_password') }}
      </NuxtLink>
    </div>

    <UiButton type="submit" variant="primary" size="lg" block :loading="isLoading">
      {{ $t('sign_in') }}
    </UiButton>

    <AuthSocialButtons />

    <p class="pt-1 text-center text-xs text-ink-secondary sm:text-sm">
      {{ $t('no_account_register') }}
      <NuxtLink :to="localize('/register')" class="ms-1 font-bold text-gold hover:underline">
        {{ $t('create_account') }}
      </NuxtLink>
    </p>
  </form>
</template>

<script setup lang="ts">
import { safeRedirectPath } from '~/constants/route_access';

const { login, isLoading, validationErrors, clearFieldError } = useAuthFlow();
const settingsStore = useSettingsStore();
const { t } = useI18n();
const route = useRoute();
const { localize } = useLocalizedPath();

const phone = ref('');
const password = ref('');
const rememberMe = ref(true);
const attemptedSubmit = ref(false);

watch(phone, () => {
  clearFieldError('phone');
  clearFieldError('country_id');
});
watch(password, () => clearFieldError('password'));

const clientPhoneError = computed(() => (attemptedSubmit.value && !phone.value.trim() ? t('validation_phone_required') : ''));
const clientPasswordError = computed(() => (attemptedSubmit.value && !password.value ? t('validation_password_required') : ''));

const phoneError = computed(() => clientPhoneError.value || validationErrors.value.phone?.[0] || validationErrors.value.country_id?.[0] || '');
const passwordError = computed(() => clientPasswordError.value || validationErrors.value.password?.[0] || '');

const onSubmit = async () => {
  attemptedSubmit.value = true;
  if (clientPhoneError.value || clientPasswordError.value) return;
  const ok = await login({
    phone: phone.value,
    password: password.value,
    country_id: settingsStore.selectedCountry?.id || '66',
  });
  if (ok) {
    const redirect = safeRedirectPath(route.query.redirect);
    await navigateTo(localize(redirect));
  }
};
</script>
