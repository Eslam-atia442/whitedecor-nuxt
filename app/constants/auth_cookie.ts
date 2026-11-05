export const AUTH_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  sameSite: 'lax' as const,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
};
