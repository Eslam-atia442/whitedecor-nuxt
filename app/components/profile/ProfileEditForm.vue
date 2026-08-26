<template>
  <div class="rounded-3xl border border-mist bg-card p-6 shadow-card">
    <div class="mb-6 flex items-center justify-between border-b border-mist pb-4">
      <div>
        <h2 class="text-fluid-h3 font-bold text-ink">{{ $t('tab_personal') }}</h2>
        <p class="text-xs text-ink-secondary">{{ $t('edit_profile') }}</p>
      </div>
    </div>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <UiInput
        v-model="form.name"
        :label="$t('name')"
        :placeholder="$t('name')"
        :error="profileStore.validationErrors.name?.[0]"
        required
      />

      <div>
        <label class="mb-1.5 block text-xs font-bold text-ink">{{ $t('phone') }}</label>
        <div class="flex items-center justify-between rounded-xl border border-mist bg-surface/50 px-3.5 py-2.5 opacity-80 cursor-not-allowed">
          <div class="flex items-center gap-2">
            <span class="material-symbols-rounded text-sm text-gold">lock</span>
            <span class="text-sm font-semibold text-ink" dir="ltr">{{ authStore.userPhone }}</span>
          </div>
          <span class="text-[11px] text-ink-muted">{{ $t('phone_locked_hint') }}</span>
        </div>
      </div>

      <UiInput
        v-model="form.email"
        type="email"
        :label="$t('email')"
        :placeholder="$t('email')"
        :error="profileStore.validationErrors.email?.[0]"
      />

      <div class="pt-2">
        <UiButton
          type="submit"
          variant="primary"
          class="w-full sm:w-auto min-w-40"
          :loading="profileStore.isLoading"
        >
          <span class="material-symbols-rounded text-lg">save</span>
          <span>{{ $t('save_changes') }}</span>
        </UiButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

const props = defineProps<{
  avatarFile?: File | null;
}>();

const emit = defineEmits<{
  'saved': [];
}>();

const { t } = useI18n();
const authStore = useAuthStore();
const profileStore = useProfileStore();

const form = reactive({
  name: authStore.userName || '',
  email: authStore.userEmail || '',
});

watch(
  () => [authStore.userName, authStore.userEmail],
  ([name, email]) => {
    form.name = name || '';
    form.email = email || '';
  },
);

const handleSubmit = async () => {
  if (!form.name.trim()) {
    toast.error(t('validation_name_required'));
    return;
  }

  const isNameSame = form.name.trim() === (authStore.userName || '');
  const isEmailSame = form.email.trim() === (authStore.userEmail || '');
  if (isNameSame && isEmailSame && !props.avatarFile) {
    toast.info(t('no_changes_made'));
    return;
  }

  const success = await profileStore.updateProfile({
    name: form.name.trim(),
    email: form.email.trim(),
    avatar: props.avatarFile,
  });

  if (success) {
    emit('saved');
  }
};
</script>
