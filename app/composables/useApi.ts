import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { AUTH_COOKIE_OPTIONS } from '~/constants/auth_cookie';
import type { ApiErrorResponse } from '~/types/api';

const formatBodyForDebug = (body: unknown): unknown => {
  if (!body) return null;
  if (typeof FormData !== 'undefined' && body instanceof FormData) {
    const obj: Record<string, unknown> = {};
    body.forEach((value, key) => {
      if (typeof File !== 'undefined' && value instanceof File) {
        obj[key] = `[File: ${value.name}, size: ${(value.size / 1024).toFixed(1)} KB]`;
      } else {
        obj[key] = value;
      }
    });
    return obj;
  }
  return body;
};

export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBase || 'https://dashboard.whitedecor.online';

  const langCookie = useCookie<string | null>('lang');

  const getLocale = (): string => {
    try {
      const nuxtApp = tryUseNuxtApp();
      const i18n = (nuxtApp as unknown as { $i18n?: { locale?: { value?: string } | string } })?.$i18n;
      if (i18n?.locale) {
        return typeof i18n.locale === 'string' ? i18n.locale : i18n.locale.value || 'ar';
      }
    } catch {
      // fallback
    }
    return langCookie.value || 'ar';
  };

  const fetchClient = async <T = unknown>(
    endpoint: NitroFetchRequest,
    options: NitroFetchOptions<NitroFetchRequest> = {},
  ): Promise<T> => {
    const currentLocale = getLocale();
    const token = useCookie<string | null>('wd_auth_token', AUTH_COOKIE_OPTIONS).value;
    const cartToken = useCookie<string | null>('wd_cart_token', AUTH_COOKIE_OPTIONS).value;

    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Accept-Language': currentLocale,
      Cookie: `lang=${currentLocale}`,
      Timezone: 'Africa/Cairo',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (cartToken) {
      headers['X-Cart-Token'] = cartToken;
    }

    const method = (options.method || 'GET').toUpperCase();
    const fullUrl = `${apiBaseUrl}${endpoint}`;

    // Debug Request Logger (Development Only)
    if (import.meta.dev) {
      // eslint-disable-next-line no-console
      console.groupCollapsed(`%c🌐 [API REQ] ${method} ${endpoint}`, 'color: #D4AF37; font-weight: bold;');
      // eslint-disable-next-line no-console
      console.log('Full URL:', fullUrl);
      // eslint-disable-next-line no-console
      console.log('Headers:', headers);
      if (options.body) {
        // eslint-disable-next-line no-console
        console.log('Request Body:', formatBodyForDebug(options.body));
      }
      if (options.query || options.params) {
        // eslint-disable-next-line no-console
        console.log('Query Params:', options.query || options.params);
      }
      // eslint-disable-next-line no-console
      console.groupEnd();
    }

    try {
      const response = await $fetch<T>(endpoint, {
        baseURL: apiBaseUrl,
        timeout: 8000,
        ...options,
        headers,
      });

      // Debug Response Logger (Development Only)
      if (import.meta.dev) {
        // eslint-disable-next-line no-console
        console.groupCollapsed(`%c✅ [API RES] ${method} ${endpoint}`, 'color: #10B981; font-weight: bold;');
        // eslint-disable-next-line no-console
        console.log('Response Data:', response);
        // eslint-disable-next-line no-console
        console.groupEnd();
      }

      return response as T;
    } catch (err: unknown) {
      const error = err as {
        response?: { status?: number };
        statusCode?: number;
        data?: { message?: string; errors?: Record<string, string[]> };
        message?: string;
      };
      const statusCode = error.response?.status || error.statusCode || 500;
      const errorData = error.data || {};
      const rawErrors = errorData.errors || {};
      const firstErrorMessage =
        (Object.values(rawErrors).flat()[0] as string | undefined) ||
        errorData.message ||
        error.message ||
        'An error occurred';

      // Debug Error Logger (Development Only)
      if (import.meta.dev) {
        // eslint-disable-next-line no-console
        console.groupCollapsed(`%c❌ [API ERR ${statusCode}] ${method} ${endpoint}`, 'color: #EF4444; font-weight: bold;');
        // eslint-disable-next-line no-console
        console.error('Error Details:', errorData);
        // eslint-disable-next-line no-console
        console.error('Raw Error:', err);
        // eslint-disable-next-line no-console
        console.groupEnd();
      }

      // Safe 401 handling:
      // Only logout if this was an authenticated request (sent with Bearer token)
      // and NOT an auth route (login/register) or an optional background poll
      const endpointStr = String(endpoint || '');
      const isAuthRoute =
        endpointStr.includes('/login') ||
        endpointStr.includes('/register') ||
        endpointStr.includes('/forgot-password') ||
        endpointStr.includes('/reset-password');
      const isOptionalRoute = endpointStr.includes('/notifications/unread-count');
      const wasAuthRequest = Boolean(headers.Authorization);

      if (statusCode === 401 && wasAuthRequest && !isAuthRoute && !isOptionalRoute) {
        try {
          const authStore = useAuthStore();
          if (authStore.isAuthenticated) {
            authStore.logout(false, true);
          }
        } catch {
          // ignore cleanup errors
        }
      }

      const normalizedError: ApiErrorResponse = {
        message: errorData.message || firstErrorMessage,
        errors: rawErrors,
        firstError: firstErrorMessage,
        statusCode,
      };

      throw normalizedError;
    }
  };

  return {
    get: <T = unknown>(url: string, opts?: NitroFetchOptions<NitroFetchRequest>) =>
      fetchClient<T>(url, { method: 'GET', ...opts }),
    post: <T = unknown>(url: string, body?: unknown, opts?: NitroFetchOptions<NitroFetchRequest>) =>
      fetchClient<T>(url, { method: 'POST', body: body as NitroFetchOptions<NitroFetchRequest>['body'], ...opts }),
    put: <T = unknown>(url: string, body?: unknown, opts?: NitroFetchOptions<NitroFetchRequest>) =>
      fetchClient<T>(url, { method: 'PUT', body: body as NitroFetchOptions<NitroFetchRequest>['body'], ...opts }),
    delete: <T = unknown>(url: string, opts?: NitroFetchOptions<NitroFetchRequest>) =>
      fetchClient<T>(url, { method: 'DELETE', ...opts }),
  };
};
