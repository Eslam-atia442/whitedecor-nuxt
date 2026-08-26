<template>
  <form class="space-y-4 sm:space-y-5" @submit.prevent="onSubmit">
    <div class="space-y-1">
      <h1 class="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{{ $t('forgot_password') }}</h1>
      <p class="text-xs text-ink-secondary sm:text-sm">{{ $t('enter_phone_reset') }}</p>
    </div>

    <!-- Phone Number with Country Flag & Prefix -->
    <UiPhoneInput
      v-model="phone"
      :label="$t('phone')"
      :has-error="!!phoneError"
      :error-message="phoneError"
      required
    />

    <!-- Security Info Callout -->
    <div class="flex items-start gap-2.5 rounded-xl border border-mist bg-surface/60 p-3.5 text-xs text-ink-secondary">
      <span class="material-symbols-rounded text-base text-gold shrink-0">shield_lock</span>
      <span class="leading-relaxed">{{ $t('enter_otp') }}</span>
    </div>

    <!-- Submit CTA Button -->
    <UiButton
      type="submit"
      variant="primary"
      size="lg"
      block
      :loading="isLoading"
      :disabled="!phone"
    >
      {{ $t('send_code') }}
    </UiButton>

    <!-- Back to Login Link -->
    <div class="text-center pt-1">
      <NuxtLink
        :to="localize('/login')"
        class="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:underline"
      >
        <span class="material-symbols-rounded text-sm rtl:rotate-180">arrow_back</span>
        <span>{{ $t('sign_in') }}</span>
      </NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
const { forgotPassword, isLoading, validationErrors } = useAuthFlow();
const settingsStore = useSettingsStore();
const { t } = useI18n();
const { localize, push } = useLocalizedPath();

const phone = ref('');
const attemptedSubmit = ref(false);

const phoneError = computed(() => {
  if (attemptedSubmit.value && !phone.value.trim()) return t('validation_phone_required');
  return validationErrors.value.phone?.[0] || validationErrors.value.country_id?.[0] || '';
});

const onSubmit = async () => {
  attemptedSubmit.value = true;
  if (phoneError.value) return;
  const countryId = settingsStore.selectedCountry?.id || '66';
  const ok = await forgotPassword({ phone: phone.value, country_id: countryId });
  if (ok) {
    await push(`/otp?phone=${encodeURIComponent(phone.value)}&country_id=${countryId}&type=reset`);
  }
};
</script>
