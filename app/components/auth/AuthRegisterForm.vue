<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-1">
      <h1 class="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{{ $t('create_account') }}</h1>
      <p class="text-xs text-ink-secondary sm:text-sm">{{ $t('sign_in_continue') }}</p>
    </div>

    <UiInput v-model="name" type="text" :label="$t('name')" :placeholder="$t('name')" :has-error="!!nameError" :error-message="nameError" required autocomplete="name" />
    <UiPhoneInput v-model="phone" :label="$t('phone')" :has-error="!!phoneError" :error-message="phoneError" required />

    <div class="space-y-1.5">
      <UiInput v-model="password" type="password" :label="$t('password')" :placeholder="$t('password')" :has-error="!!passwordError" :error-message="passwordError" required autocomplete="new-password" />
      <div v-if="password" class="space-y-1">
        <div class="flex h-1 w-full overflow-hidden rounded-full bg-mist">
          <div class="transition-all duration-300 rounded-full" :class="[strengthColor, strengthWidth]" />
        </div>
        <p class="text-[10px] font-medium text-ink-secondary">{{ strengthLabel }}</p>
      </div>
    </div>

    <UiInput v-model="confirmPassword" type="password" :label="$t('confirm_password')" :placeholder="$t('confirm_password')" :has-error="!!confirmPasswordError" :error-message="confirmPasswordError" required autocomplete="new-password" />

    <UiCheckbox v-model="agreeTerms">
      <span class="text-xs text-ink-secondary">
        {{ $t('legal.agree_terms_prefix') || 'I agree to the' }}
        <NuxtLink :to="localize('/terms')" class="font-bold text-gold hover:underline">{{ $t('legal.terms_conditions') }}</NuxtLink>
      </span>
    </UiCheckbox>

    <UiButton type="submit" variant="secondary" size="lg" block :loading="isLoading" :disabled="!agreeTerms">{{ $t('register') }}</UiButton>

    <p class="pt-1 text-center text-xs text-ink-secondary sm:text-sm">
      {{ $t('already_have_account') }}
      <NuxtLink :to="localize('/login')" class="ms-1 font-bold text-gold hover:underline">{{ $t('sign_in') }}</NuxtLink>
    </p>
  </form>
</template>

<script setup lang="ts">
const { register, isLoading, validationErrors, clearFieldError } = useAuthFlow();
const settingsStore = useSettingsStore();
const { t } = useI18n();
const { localize, push } = useLocalizedPath();

const name = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeTerms = ref(true);
const attemptedSubmit = ref(false);

watch(name, () => clearFieldError('name'));
watch(phone, () => { clearFieldError('phone'); clearFieldError('country_id'); });
watch(password, () => clearFieldError('password'));
watch(confirmPassword, () => clearFieldError('password_confirmation'));

const clientNameError = computed(() => (attemptedSubmit.value && !name.value.trim() ? t('validation_name_required') : ''));
const clientPhoneError = computed(() => {
  if (attemptedSubmit.value && !phone.value.trim()) return t('validation_phone_required');
  if (attemptedSubmit.value && phone.value.trim().length < 6) return t('validation_phone_invalid');
  return '';
});
const clientPasswordError = computed(() => {
  if (attemptedSubmit.value && !password.value) return t('validation_password_required');
  if (attemptedSubmit.value && password.value.length < 6) return t('validation_password_min_length');
  return '';
});
const clientConfirmPasswordError = computed(() => {
  if (attemptedSubmit.value && !confirmPassword.value) return t('validation_confirm_password_required');
  if (confirmPassword.value && password.value !== confirmPassword.value) return t('validation_confirm_password_mismatch');
  return '';
});

const nameError = computed(() => clientNameError.value || validationErrors.value.name?.[0] || '');
const phoneError = computed(() => clientPhoneError.value || validationErrors.value.phone?.[0] || validationErrors.value.country_id?.[0] || '');
const passwordError = computed(() => clientPasswordError.value || validationErrors.value.password?.[0] || '');
const confirmPasswordError = computed(() => clientConfirmPasswordError.value || validationErrors.value.password_confirmation?.[0] || '');

const score = computed(() => {
  let s = 0;
  if (password.value.length >= 6) s++;
  if (password.value.length >= 8) s++;
  if (/[0-9]/.test(password.value)) s++;
  if (/[^A-Za-z0-9]/.test(password.value)) s++;
  return s;
});

const strengthLabel = computed(() => (score.value <= 1 ? t('strength_weak') : score.value <= 3 ? t('strength_medium') : t('strength_strong')));
const strengthColor = computed(() => (score.value <= 1 ? 'bg-coral' : score.value <= 3 ? 'bg-gold' : 'bg-green'));
const strengthWidth = computed(() => (score.value <= 1 ? 'w-1/3' : score.value <= 3 ? 'w-2/3' : 'w-full'));

const onSubmit = async () => {
  attemptedSubmit.value = true;
  if (clientNameError.value || clientPhoneError.value || clientPasswordError.value || clientConfirmPasswordError.value) return;
  const ok = await register({
    name: name.value,
    phone: phone.value,
    password: password.value,
    password_confirmation: confirmPassword.value,
    country_id: settingsStore.selectedCountry?.id || '66',
  });
  if (ok) await push('/');
};
</script>
