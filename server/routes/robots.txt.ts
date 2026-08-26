const PRODUCTION_HOST = 'whitedecor.online';

const PRIVATE_PREFIXES = [
  '/login',
  '/register',
  '/forgot-password',
  '/otp',
  '/cart',
  '/checkout',
  '/orders',
  '/profile',
  '/maintenance',
  '/search',
];

export default defineEventHandler((event) => {
  const siteUrl = String(useRuntimeConfig().public.siteUrl || `https://${PRODUCTION_HOST}`).replace(/\/+$/, '');
  let hostname = PRODUCTION_HOST;
  try {
    hostname = new URL(siteUrl).hostname.replace(/^www\./, '');
  } catch {
    hostname = PRODUCTION_HOST;
  }

  setHeader(event, 'content-type', 'text/plain; charset=utf-8');
  setHeader(event, 'cache-control', 'public, max-age=3600');

  const isProduction = hostname === PRODUCTION_HOST;
  if (!isProduction) {
    return ['User-agent: *', 'Disallow: /', ''].join('\n');
  }

  const disallows = PRIVATE_PREFIXES.flatMap((path) => [`Disallow: ${path}`, `Disallow: /en${path}`]);

  return [
    'User-agent: *',
    'Allow: /',
    ...disallows,
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n');
});
