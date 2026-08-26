import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';
import { API_ENDPOINTS } from '~/constants/api_endpoints';
import type { UserDto } from '~/types/auth';

export const useAuthStore = defineStore('auth', () => {
  const cookieOptions = {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax' as const,
    path: '/',
    secure: import.meta.env.PROD,
  };

  const token = useCookie<string | null>('wd_auth_token', cookieOptions);
  const user = useCookie<UserDto | null>('wd_auth_user', cookieOptions);
  const cartTokenCookie = useCookie<string | null>('wd_cart_token', cookieOptions);
  const api = useApi();
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

  const isAuthenticated = computed(() => !!token.value);
  const currentUser = computed(() => user.value);
  const userName = computed(() => user.value?.name || '');
  const userPhone = computed(() => user.value?.phone || '');
  const userEmail = computed(() => user.value?.email || '');
  const userAvatar = computed(() => user.value?.avatar || '/images/default_avatar.png');
  const userCountryId = computed(() => user.value?.country_id || '1');

  const setAuthSession = (authToken: string, userData: UserDto) => {
    token.value = authToken;
    const raw = userData as unknown as Record<string, unknown>;
    const nested = raw.user;
    const unwrapped = (nested && typeof nested === 'object' ? nested : userData) as UserDto;
    user.value = unwrapped;
  };

  const updateProfile = (updatedUser: Partial<UserDto>) => {
    const raw = updatedUser as Record<string, unknown>;
    const unwrapped = (raw?.user || raw?.data || raw) as Partial<UserDto>;
    if (user.value) {
      user.value = { ...user.value, ...unwrapped };
    } else {
      user.value = unwrapped as UserDto;
    }
  };

  const fetchProfile = async () => {
    if (!token.value) return;
    try {
      const res = await api.get<{ status?: boolean; data?: { user?: UserDto } | UserDto; user?: UserDto }>(API_ENDPOINTS.PROFILE.GET);
      const raw = res as Record<string, unknown>;
      const payload = (raw?.data || raw) as Record<string, unknown>;
      const userObj = (payload?.user || payload) as UserDto;
      if (userObj && (userObj.id || userObj.name || userObj.phone)) {
        updateProfile(userObj);
      }
    } catch {
      // ignore
    }
  };

  const initAuth = async () => {
    if (token.value && import.meta.client) {
      await fetchProfile();
    }
    return {
      isAuthenticated: isAuthenticated.value,
      user: user.value,
    };
  };

  const logout = async (showToast = true, shouldRedirect = true) => {
    try {
      if (token.value) {
        await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      }
    } catch {
      // Gracefully ignore network errors on logout
    } finally {
      token.value = null;
      user.value = null;
      cartTokenCookie.value = null;

      if (showToast) {
        toast.success(getT('logout_success', 'تم تسجيل الخروج بنجاح'));
      }

      if (shouldRedirect) {
        await push('/login');
      }
    }
  };

  return {
    token,
    user,
    isAuthenticated,
    currentUser,
    userName,
    userPhone,
    userEmail,
    userAvatar,
    userCountryId,
    setAuthSession,
    updateProfile,
    fetchProfile,
    initAuth,
    logout,
  };
});
