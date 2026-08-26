<template>
  <div class="mx-auto max-w-6xl space-y-6">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <!-- Left Column: User Summary, Stats & Navigation -->
      <div class="space-y-4 lg:col-span-4">
        <ProfileOverviewCard
          :avatar-preview="avatarPreview"
          @pick-avatar="avatarUploaderRef?.trigger()"
        />
        <ProfileStatsGrid />
        <ProfileTabNav v-model:active-tab="activeTab" />
      </div>

      <!-- Right Column: Active Tab Content & Danger Zone -->
      <div class="space-y-6 lg:col-span-8">
        <ProfileEditForm
          v-if="activeTab === 'personal'"
          :avatar-file="avatarFile"
          @saved="handleProfileSaved"
        />
        <ProfilePasswordForm v-else-if="activeTab === 'security'" />
        <ProfileAddressesList
          v-else-if="activeTab === 'addresses'"
          @add-address="openAddressModal()"
          @edit-address="openAddressModal"
        />
        <ProfilePreferencesTab v-else-if="activeTab === 'preferences'" />

        <ProfileDangerZone
          @logout-click="isLogoutModalOpen = true"
          @delete-click="isDeleteModalOpen = true"
        />
      </div>
    </div>

    <!-- Hidden Uploader & Modals -->
    <ProfileAvatarUploader
      ref="avatarUploaderRef"
      @avatar-selected="handleAvatarSelected"
    />

    <ProfileAddressModal
      v-if="isAddressModalOpen"
      :editing-address="selectedAddress"
      @close="isAddressModalOpen = false"
    />

    <ProfileConfirmModal
      :is-open="isLogoutModalOpen"
      :title="$t('logout')"
      :message="$t('logout_confirm')"
      :confirm-text="$t('logout')"
      :loading="isLoggingOut"
      @cancel="isLogoutModalOpen = false"
      @confirm="handleLogout"
    />

    <ProfileConfirmModal
      :is-open="isDeleteModalOpen"
      :title="$t('delete_account')"
      :message="$t('delete_account_confirm')"
      :confirm-text="$t('delete')"
      :is-destructive="true"
      :loading="profileStore.isLoading"
      @cancel="isDeleteModalOpen = false"
      @confirm="handleDeleteAccount"
    />
  </div>
</template>

<script setup lang="ts">
import type { AddressDto, ProfileTabId } from '~/types/profile';

definePageMeta({ middleware: 'auth' });

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const profileStore = useProfileStore();

useSeo({ title: t('profile_title'), noIndex: true });

const activeTab = ref<ProfileTabId>((route.query.tab as ProfileTabId) || 'personal');
const avatarUploaderRef = ref<{ trigger: () => void } | null>(null);
const avatarFile = ref<File | null>(null);
const avatarPreview = ref<string | null>(null);

const isAddressModalOpen = ref(false);
const selectedAddress = ref<AddressDto | null>(null);
const isLogoutModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isLoggingOut = ref(false);

watch(activeTab, (tab) => {
  router.replace({ query: { ...route.query, tab } });
});

const handleAvatarSelected = (file: File, previewUrl: string) => {
  avatarFile.value = file;
  avatarPreview.value = previewUrl;
};

const handleProfileSaved = () => {
  avatarFile.value = null;
};

const openAddressModal = (addr?: AddressDto) => {
  selectedAddress.value = addr || null;
  isAddressModalOpen.value = true;
};

const handleLogout = async () => {
  isLoggingOut.value = true;
  try {
    await authStore.logout();
  } finally {
    isLoggingOut.value = false;
    isLogoutModalOpen.value = false;
  }
};

const handleDeleteAccount = async () => {
  await profileStore.deleteAccount();
  isDeleteModalOpen.value = false;
};
</script>
