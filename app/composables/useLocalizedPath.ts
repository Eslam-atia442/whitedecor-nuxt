import type { RouteLocationRaw } from 'vue-router';

const EXTERNAL_RE = /^(https?:|mailto:|tel:|#)/;
const FALLBACK_CODES = ['ar', 'en'];

const readLocaleCodes = (): string[] => {
  try {
    const i18n = tryUseNuxtApp()?.$i18n as { localeCodes?: string[] | { value?: string[] } } | undefined;
    const raw = i18n?.localeCodes;
    const codes = Array.isArray(raw) ? raw : raw?.value;
    if (Array.isArray(codes) && codes.length) return codes;
  } catch {
    // Pinia / middleware have no vue-i18n setup instance
  }
  return FALLBACK_CODES;
};

const stripLocalePrefix = (path: string): string => {
  if (!path || EXTERNAL_RE.test(path)) return path;
  const codes = readLocaleCodes().filter(Boolean).join('|') || FALLBACK_CODES.join('|');
  const stripped = path.replace(new RegExp(`^/(${codes})(?=/|$)`), '');
  if (!stripped) return '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
};

export const useLocalizedPath = () => {
  const localePath = useLocalePath();

  const localize = (to: RouteLocationRaw): RouteLocationRaw => {
    if (typeof to === 'string') {
      if (EXTERNAL_RE.test(to)) return to;
      const hashIndex = to.indexOf('#');
      const hash = hashIndex >= 0 ? to.slice(hashIndex) : '';
      const withoutHash = hashIndex >= 0 ? to.slice(0, hashIndex) : to;
      const [pathname, search] = withoutHash.split('?');
      const localized = localePath(stripLocalePrefix(pathname || '/'));
      return `${localized}${search ? `?${search}` : ''}${hash}`;
    }
    if (to && typeof to === 'object' && 'path' in to && typeof to.path === 'string') {
      return { ...to, path: localePath(stripLocalePrefix(to.path)) as string };
    }
    return localePath(to);
  };

  const push = (to: RouteLocationRaw) => navigateTo(localize(to));

  return { localize, push, unprefix: stripLocalePrefix };
};
