import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import { API_ENDPOINTS } from '~/constants/api_endpoints';
import type {
  AddressDto,
  ChangePasswordPayload,
  ProfileValidationErrors,
  UpdateProfilePayload,
  UserDto,
} from '~/types/profile';

const extractUserDto = (rawResponse: unknown): Partial<UserDto> | null => {
  if (!rawResponse || typeof rawResponse !== 'object') return null;
  const raw = rawResponse as Record<string, unknown>;
  const data = (raw.data || raw) as Record<string, unknown>;
  if (data?.user && typeof data.user === 'object') {
    return data.user as Partial<UserDto>;
  }
  if (raw?.user && typeof raw.user === 'object') {
    return raw.user as Partial<UserDto>;
  }
  if (data?.id || data?.name || data?.phone) {
    return data as Partial<UserDto>;
  }
  return null;
};

export const useProfileStore = defineStore('profile', () => {
  const api = useApi();
  const authStore = useAuthStore();
  const { push } = useLocalizedPath();

  const getT = (key: string, fallback = '') => {
    try {
      const nuxtApp = tryUseNuxtApp();
      const t = (nuxtApp?.$i18n as { t?: (k: string) => string })?.t;
      if (t) return t(key);
    } catch {
      // fallback
    }
    return fallback || key;
  };

  const isLoading = ref(false);
  const validationErrors = ref<ProfileValidationErrors>({});
  const activeModal = ref<'logout' | 'delete' | 'address' | null>(null);
  const editingAddress = ref<AddressDto | null>(null);

  const clearErrors = () => {
    validationErrors.value = {};
  };

  const openModal = (modal: 'logout' | 'delete' | 'address', address?: AddressDto) => {
    activeModal.value = modal;
    editingAddress.value = address || null;
  };

  const closeModal = () => {
    activeModal.value = null;
    editingAddress.value = null;
  };

  const updateProfile = async (payload: UpdateProfilePayload): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();

    try {
      const formData = new FormData();
      if (payload.name) formData.append('name', payload.name);
      if (payload.email) formData.append('email', payload.email);
      if (payload.phone) formData.append('phone', payload.phone);
      if (payload.country_id) formData.append('country_id', String(payload.country_id));
      if (payload.gender) formData.append('gender', payload.gender);
      if (payload.dob) formData.append('dob', payload.dob);
      if (payload.avatar) formData.append('avatar', payload.avatar);

      const res = await api.post<{ status: boolean; message?: string; data?: UserDto }>(
        API_ENDPOINTS.PROFILE.UPDATE,
        formData,
      );

      const updatedUser = extractUserDto(res);
      if (updatedUser) {
        authStore.updateProfile(updatedUser);
      } else {
        authStore.updateProfile({
          name: payload.name,
          email: payload.email,
        });
      }

      toast.success(res?.message || getT('save_changes', 'تم الحفظ'));
      return true;
    } catch (err: unknown) {
      const error = err as { errors?: ProfileValidationErrors; firstError?: string; message?: string };
      if (error.errors) {
        validationErrors.value = error.errors;
      }
      toast.error(error.firstError || error.message || getT('error_occurred', 'حدث خطأ'));
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const changePassword = async (payload: ChangePasswordPayload): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();

    try {
      const formData = new FormData();
      formData.append('old_password', payload.old_password);
      formData.append('new_password', payload.new_password);
      formData.append('new_password_confirmation', payload.new_password_confirmation);

      const res = await api.post<{ message?: string }>(
        API_ENDPOINTS.PROFILE.CHANGE_PASSWORD,
        formData,
      );

      toast.success(res?.message || getT('password_reset_success', 'تم تغيير كلمة المرور'));
      return true;
    } catch (err: unknown) {
      const error = err as { errors?: ProfileValidationErrors; firstError?: string; message?: string };
      if (error.errors) {
        validationErrors.value = error.errors;
      }
      toast.error(error.firstError || error.message || getT('error_occurred', 'حدث خطأ'));
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    isLoading.value = true;

    try {
      const res = await api.post<{ message?: string }>(API_ENDPOINTS.PROFILE.DELETE);
      closeModal();
      await authStore.logout(false, false);
      toast.success(res?.message || getT('delete_account_success', 'تم حذف الحساب بنجاح'));
      await push('/');
      return true;
    } catch (err: unknown) {
      const error = err as { message?: string; firstError?: string };
      toast.error(error.firstError || error.message || getT('error_occurred', 'حدث خطأ'));
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    validationErrors,
    activeModal,
    editingAddress,
    clearErrors,
    openModal,
    closeModal,
    updateProfile,
    changePassword,
    deleteAccount,
  };
});
