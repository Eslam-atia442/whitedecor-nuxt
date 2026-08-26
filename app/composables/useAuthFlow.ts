import { toast } from 'vue-sonner';
import { API_ENDPOINTS } from '~/constants/api_endpoints';
import type {
  AuthResponseDto,
  ForgotPasswordRequestDto,
  LoginRequestDto,
  RegisterRequestDto,
  ResetPasswordRequestDto,
  ResendCodeRequestDto,
  SocialLoginRequestDto,
  SocialRegisterRequestDto,
  ValidationErrorsDto,
  VerifyOtpRequestDto,
  UserDto,
} from '~/types/auth';

export const useAuthFlow = () => {
  const api = useApi();
  const authStore = useAuthStore();
  const { t } = useI18n();

  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);
  const validationErrors = ref<ValidationErrorsDto>({});

  const clearErrors = () => {
    errorMessage.value = null;
    validationErrors.value = {};
  };

  const clearFieldError = (field: string) => {
    if (validationErrors.value[field]) {
      delete validationErrors.value[field];
    }
  };

  const extractSession = (res: AuthResponseDto): { user: UserDto | null; token: string | null } => {
    const raw = res as unknown as Record<string, unknown>;

    // Reject if status is false or 0
    if (raw.status === false || raw.status === 0 || raw.status === '0' || raw.status === 'false') {
      const msg = (raw.message as string) || (raw.msg as string) || t('error_occurred');
      throw new Error(msg);
    }

    const payload = (raw?.data || raw) as Record<string, unknown>;
    let userObj: Record<string, unknown> | null = null;
    let tokenStr: string | null = null;

    if (payload && typeof payload === 'object') {
      if (payload.user && typeof payload.user === 'object') {
        userObj = { ...(payload.user as Record<string, unknown>) };
      } else if (payload.id || payload.name || payload.phone) {
        userObj = { ...payload };
      }

      tokenStr = (payload.access_token ||
        payload.accessToken ||
        payload.token ||
        payload.bearer_token ||
        raw.access_token ||
        raw.accessToken ||
        raw.token ||
        raw.bearer_token ||
        userObj?.access_token ||
        userObj?.accessToken ||
        userObj?.token ||
        userObj?.bearer_token) as string | null;
    }

    if (!tokenStr && userObj) {
      tokenStr = (userObj.access_token || userObj.accessToken || userObj.token || userObj.bearer_token) as string | null;
    }

    if (userObj && tokenStr) {
      userObj.access_token = tokenStr;
    }

    return {
      user: userObj as UserDto | null,
      token: tokenStr,
    };
  };

  const handleApiError = (err: { errors?: ValidationErrorsDto; firstError?: string; message?: string }) => {
    if (err.errors && Object.keys(err.errors).length > 0) {
      validationErrors.value = { ...err.errors };
    }
    const msg = err.firstError || err.message || t('error_occurred');
    errorMessage.value = msg;
    toast.error(msg);
  };

  const login = async (payload: LoginRequestDto): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();
    try {
      const formData = new FormData();
      formData.append('phone', payload.phone);
      formData.append('password', payload.password);
      formData.append('country_id', String(payload.country_id || '66'));
      formData.append('device_type', payload.device_type || 'web');
      formData.append('device_id', payload.device_id || 'web_browser');

      const res = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.LOGIN, formData);
      const { user, token } = extractSession(res);

      if (token && user) {
        authStore.setAuthSession(token, user);
        const msg = res?.message || t('welcome_back') || 'مرحباً بعودتك';
        toast.success(msg);
        return true;
      } else {
        const errorMsg = res?.message || t('error_occurred') || 'فشل تسجيل الدخول';
        toast.error(errorMsg);
        errorMessage.value = errorMsg;
        return false;
      }
    } catch (err) {
      handleApiError(err as never);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (payload: RegisterRequestDto): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();
    try {
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('phone', payload.phone);
      formData.append('password', payload.password);
      formData.append('password_confirmation', payload.password_confirmation);
      formData.append('country_id', String(payload.country_id || '66'));
      formData.append('device_type', payload.device_type || 'web');
      formData.append('device_id', payload.device_id || 'web_browser');
      if (payload.email) formData.append('email', payload.email);
      if (payload.gender) formData.append('gender', payload.gender);
      if (payload.dob) formData.append('dob', payload.dob);

      const res = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.REGISTER, formData);
      const { user, token } = extractSession(res);

      if (token && user) {
        authStore.setAuthSession(token, user);
      } else {
        // If registration succeeded on backend without returning token directly, auto-login
        const loginOk = await login({
          phone: payload.phone,
          password: payload.password,
          country_id: payload.country_id,
        });
        if (loginOk) return true;
      }

      const msg = res?.message || t('register_success') || t('welcome_back');
      toast.success(msg);
      return true;
    } catch (err) {
      handleApiError(err as never);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const forgotPassword = async (payload: ForgotPasswordRequestDto): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();
    try {
      const formData = new FormData();
      formData.append('phone', payload.phone);
      formData.append('country_id', String(payload.country_id || '66'));

      const res = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, formData);
      const msg = res?.message || t('code_sent_success') || t('enter_otp');
      toast.success(msg);
      return true;
    } catch (err) {
      handleApiError(err as never);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const resetPassword = async (payload: ResetPasswordRequestDto): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();
    try {
      const formData = new FormData();
      formData.append('phone', payload.phone);
      formData.append('country_id', String(payload.country_id || '66'));
      formData.append('otp', payload.otp);
      formData.append('password', payload.password);
      formData.append('password_confirmation', payload.password_confirmation);

      const res = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.RESET_PASSWORD, formData);
      const msg = res?.message || t('password_reset_success') || t('sign_in');
      toast.success(msg);
      return true;
    } catch (err) {
      handleApiError(err as never);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const verifyOtp = async (payload: VerifyOtpRequestDto): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();
    try {
      const formData = new FormData();
      formData.append('phone', payload.phone);
      formData.append('country_id', String(payload.country_id || '66'));
      formData.append('otp', payload.code);

      const res = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.CHECK_OTP, formData);
      const { user, token } = extractSession(res);
      if (token && user) {
        authStore.setAuthSession(token, user);
      }
      const msg = res?.message || t('verify_success') || t('welcome_back');
      toast.success(msg);
      return true;
    } catch (err) {
      handleApiError(err as never);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const resendCode = async (payload: ResendCodeRequestDto): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();
    try {
      const formData = new FormData();
      formData.append('phone', payload.phone);
      formData.append('country_id', String(payload.country_id || '66'));

      const res = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.RESEND_CODE, formData);
      const msg = res?.message || t('resend_success') || t('resend_code');
      toast.success(msg);
      return true;
    } catch (err) {
      handleApiError(err as never);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const loginWithSocial = async (payload: SocialLoginRequestDto): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();
    try {
      const formData = new FormData();
      formData.append('social_type', payload.social_type);
      formData.append('social_token', payload.social_token);
      formData.append('email', payload.email);

      const res = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, formData);
      const { user, token } = extractSession(res);
      if (token && user) {
        authStore.setAuthSession(token, user);
        toast.success(res?.message || t('welcome_back'));
        return true;
      }
      return false;
    } catch (err: unknown) {
      const error = err as { statusCode?: number };
      if (error.statusCode === 400) return false;
      handleApiError(err as never);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const registerWithSocial = async (payload: SocialRegisterRequestDto): Promise<boolean> => {
    isLoading.value = true;
    clearErrors();
    try {
      const formData = new FormData();
      formData.append('social_type', payload.social_type);
      formData.append('social_token', payload.social_token);
      formData.append('email', payload.email);
      formData.append('name', payload.name);
      if (payload.country_id) formData.append('country_id', String(payload.country_id));
      if (payload.gender) formData.append('gender', payload.gender);
      if (payload.dob) formData.append('dob', payload.dob);

      const res = await api.post<AuthResponseDto>(API_ENDPOINTS.AUTH.SOCIAL_REGISTER, formData);
      const { user, token } = extractSession(res);
      if (token && user) {
        authStore.setAuthSession(token, user);
        toast.success(res?.message || t('welcome_back'));
        return true;
      }
      return false;
    } catch (err) {
      handleApiError(err as never);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    errorMessage,
    validationErrors,
    clearErrors,
    clearFieldError,
    login,
    register,
    forgotPassword,
    resetPassword,
    verifyOtp,
    resendCode,
    loginWithSocial,
    registerWithSocial,
  };
};
