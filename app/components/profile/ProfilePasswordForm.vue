<template>
  <div class="rounded-3xl border border-mist bg-card p-6 shadow-card">
    <div class="mb-6 border-b border-mist pb-4">
      <h2 class="text-fluid-h3 font-bold text-ink">{{ $t('tab_security') }}</h2>
      <p class="text-xs text-ink-secondary">{{ $t('change_password') }}</p>
    </div>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <UiInput
        v-model="form.oldPassword"
        type="password"
        :label="$t('old_password')"
        :placeholder="$t('old_password')"
        :error="profileStore.validationErrors.old_password?.[0]"
        required
      />

      <UiInput
        v-model="form.newPassword"
        type="password"
        :label="$t('new_password')"
        :placeholder="$t('new_password')"
        :error="profileStore.validationErrors.new_password?.[0]"
        required
      />

      <!-- Password Strength Indicator -->
      <div v-if="form.newPassword" class="space-y-1.5">
        <div class="flex h-1.5 gap-1.5 overflow-hidden rounded-full bg-surface">
          <div class="h-full flex-1 rounded-full transition-all duration-300" :class="strengthClass(1)" />
          <div class="h-full flex-1 rounded-full transition-all duration-300" :class="strengthClass(2)" />
          <div class="h-full flex-1 rounded-full transition-all duration-300" :class="strengthClass(3)" />
        </div>
        <p class="text-[11px] font-semibold" :class="strengthTextClass">{{ strengthLabel }}</p>
      </div>

      <UiInput
        v-model="form.confirmPassword"
        type="password"
        :label="$t('confirm_password')"
        :placeholder="$t('confirm_password')"
        :error="confirmError || profileStore.validationErrors.new_password_confirmation?.[0]"
        required
      />

      <div class="pt-2">
        <UiButton
          type="submit"
          variant="primary"
          class="w-full sm:w-auto min-w-40"
          :loading="profileStore.isLoading"
        >
          <span class="material-symbols-rounded text-lg">lock_reset</span>
          <span>{{ $t('save_changes') }}</span>
        </UiButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

const { t } = useI18n();
const profileStore = useProfileStore();

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const confirmError = computed(() => {
  if (form.confirmPassword && form.newPassword !== form.confirmPassword) {
    return t('validation_confirm_password_mismatch');
  }
  return '';
});

const strengthScore = computed(() => {
  const p = form.newPassword;
  if (!p) return 0;
  let score = 0;
  if (p.length >= 6) score++;
  if (p.length >= 8 && /[A-Z]/.test(p) && /[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score;
});

const strengthLabel = computed(() => {
  if (strengthScore.value <= 1) return t('strength_weak');
  if (strengthScore.value === 2) return t('strength_medium');
  return t('strength_strong');
});

const strengthTextClass = computed(() => {
  if (strengthScore.value <= 1) return 'text-red-500';
  if (strengthScore.value === 2) return 'text-amber-500';
  return 'text-emerald-500';
});

const strengthClass = (step: number) => {
  if (strengthScore.value >= step) {
    if (strengthScore.value === 1) return 'bg-red-500';
    if (strengthScore.value === 2) return 'bg-amber-500';
    return 'bg-emerald-500';
  }
  return 'bg-mist';
};

const handleSubmit = async () => {
  if (!form.oldPassword || !form.newPassword) {
    toast.error(t('validation_password_required'));
    return;
  }
  if (form.newPassword.length < 6) {
    toast.error(t('validation_password_min_length'));
    return;
  }
  if (form.newPassword !== form.confirmPassword) {
    toast.error(t('validation_confirm_password_mismatch'));
    return;
  }

  const success = await profileStore.changePassword({
    old_password: form.oldPassword,
    new_password: form.newPassword,
    new_password_confirmation: form.confirmPassword,
  });

  if (success) {
    form.oldPassword = '';
    form.newPassword = '';
    form.confirmPassword = '';
  }
};
</script>
