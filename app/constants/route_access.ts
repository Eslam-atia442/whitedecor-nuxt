export const AUTH_REQUIRED_PREFIXES = ['/checkout', '/profile', '/orders', '/notifications'] as const;
export const GUEST_ONLY_PREFIXES = ['/login', '/register', '/forgot-password', '/otp'] as const;

export const pathMatchesPrefix = (path: string, prefixes: readonly string[]) =>
  prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));

export const safeRedirectPath = (raw: unknown): string => {
  if (typeof raw !== 'string') return '/';
  const path = raw.trim();
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('://')) return '/';
  const bare = path.split('?')[0] || '/';
  if (pathMatchesPrefix(bare, GUEST_ONLY_PREFIXES)) return '/';
  return path;
};
