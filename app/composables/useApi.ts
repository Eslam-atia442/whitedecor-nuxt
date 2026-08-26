import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
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
  const { push } = useLocalizedPath();
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBase || 'https://dashboard.whitedecor.online';

  const tokenCookie = useCookie<string | null>('wd_auth_token');
  const cartTokenCookie = useCookie<string | null>('wd_cart_token');
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
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Accept-Language': currentLocale,
      Cookie: `lang=${currentLocale}`,
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Cairo',
      ...(options.headers as Record<string, string>),
    };

    if (tokenCookie.value) {
      headers.Authorization = `Bearer ${tokenCookie.value}`;
    }

    if (cartTokenCookie.value) {
      headers['X-Cart-Token'] = cartTokenCookie.value;
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

      if (statusCode === 401 && tokenCookie.value) {
        tokenCookie.value = null;
        const userCookie = useCookie('wd_auth_user');
        userCookie.value = null;
        push('/login');
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
