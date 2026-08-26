<template>
  <form class="space-y-4 sm:space-y-5" @submit.prevent="onSubmit">
    <div class="space-y-1">
      <h1 class="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {{ isReset ? $t('reset_password') : $t('verify_code') }}
      </h1>
      <p class="text-xs text-ink-secondary sm:text-sm">{{ $t('enter_otp') }}</p>
    </div>

    <!-- Phone Number Badge with Edit Action -->
    <div class="flex items-center justify-between rounded-xl border border-mist bg-surface/50 px-3.5 py-2.5 text-xs">
      <div class="flex items-center gap-2">
        <span class="material-symbols-rounded text-base text-gold">phone_iphone</span>
        <span class="font-bold text-ink" dir="ltr">{{ phone }}</span>
      </div>
      <NuxtLink :to="localize(isReset ? '/forgot-password' : '/register')" class="font-bold text-gold hover:underline">
        {{ $t('edit_profile') }}
      </NuxtLink>
    </div>

    <!-- 4-Digit OTP Code Input -->
    <div class="space-y-1.5">
      <AuthOtpDigitInput v-model="otp" :has-error="!!validationErrors.code?.[0]" />
      <p v-if="validationErrors.code?.[0]" class="text-center text-xs font-medium text-coral">
        {{ validationErrors.code[0] }}
      </p>
    </div>

    <!-- Additional Password Fields for Password Reset -->
    <template v-if="isReset">
      <UiInput
        v-model="password"
        type="password"
        :label="$t('new_password')"
        :placeholder="$t('new_password')"
        :has-error="!!validationErrors.password?.[0]"
        :error-message="validationErrors.password?.[0]"
        required
      />
      <UiInput
        v-model="confirmPassword"
        type="password"
        :label="$t('confirm_password')"
        :placeholder="$t('confirm_password')"
        :has-error="!!passwordMismatchError || !!validationErrors.password_confirmation?.[0]"
        :error-message="passwordMismatchError || validationErrors.password_confirmation?.[0]"
        required
      />
    </template>

    <!-- Primary Action Button -->
    <UiButton
      type="submit"
      variant="primary"
      size="lg"
      block
      :loading="isLoading"
      :disabled="otp.length < 4"
    >
      {{ isReset ? $t('reset_password') : $t('verify') }}
    </UiButton>

    <!-- Resend Code Timer -->
    <div class="text-center text-xs">
      <span class="text-ink-secondary">{{ $t('didnt_receive_code') || "Didn't receive code?" }} </span>
      <button
        type="button"
        class="font-bold text-gold transition hover:underline disabled:cursor-not-allowed disabled:text-ink-secondary/60 disabled:no-underline"
        :disabled="isCountingDown || isLoading"
        @click="onResend"
      >
        {{ isCountingDown ? `${$t('resend_code')} (${formattedTime})` : $t('resend_code') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
const { localize, push } = useLocalizedPath();
const { verifyOtp, resetPassword, resendCode, isLoading, validationErrors } = useAuthFlow();
const { isCountingDown, formattedTime, startCountdown } = useOtpCountdown();

const otp = ref('');
const password = ref('');
const confirmPassword = ref('');

const phone = computed(() => String(route.query.phone || ''));
const countryId = computed(() => String(route.query.country_id || '66'));
const isReset = computed(() => route.query.type === 'reset');

const passwordMismatchError = computed(() =>
  confirmPassword.value && password.value !== confirmPassword.value ? t('validation_confirm_password_mismatch') : '',
);

onMounted(() => startCountdown());

const onResend = async () => {
  const ok = await resendCode({ phone: phone.value, country_id: countryId.value });
  if (ok) startCountdown();
};

const onSubmit = async () => {
  if (isReset.value) {
    if (password.value !== confirmPassword.value) return;
    const ok = await resetPassword({
      phone: phone.value,
      country_id: countryId.value,
      otp: otp.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    });
    if (ok) await push('/login');
    return;
  }
  const ok = await verifyOtp({ phone: phone.value, country_id: countryId.value, code: otp.value });
  if (ok) await push('/');
};
</script>
