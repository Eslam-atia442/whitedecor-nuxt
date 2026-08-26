export const DEFAULT_SITE_URL = 'https://whitedecor.online';
export const PRICE_CURRENCY = 'EGP';
export const AREA_SERVED_COUNTRY = 'EG';
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const WEAK_SEO_TITLES = new Set([
  'متجر إلكتروني',
  'Ecommerce Store',
  'أفضل متجر إلكتروني',
  'Best ecommerce store',
]);

export const STATIC_SITEMAP_PATHS = [
  '/',
  '/products',
  '/categories',
  '/brands',
  '/about',
  '/privacy',
  '/terms',
  '/sitemap',
] as const;

export const PRIVATE_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/otp',
  '/cart',
  '/checkout',
  '/orders',
  '/profile',
  '/maintenance',
] as const;
