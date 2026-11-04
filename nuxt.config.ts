/// <reference types="node" />
import tailwindcss from '@tailwindcss/vite';

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://dashboard.whitedecor.online';

const privatePage = { ssr: false, robots: 'noindex, nofollow' as const };

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  build: { transpile: ['vue-sonner'] },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],

  site: {
    url: SITE_URL,
    name: 'White Decor',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: [
      '/login',
      '/register',
      '/forgot-password',
      '/otp',
      '/cart',
      '/checkout',
      '/orders',
      '/orders/**',
      '/notifications',
      '/profile',
      '/profile/**',
      '/maintenance',
      '/search',
    ],
  },

  imports: { dirs: ['composables/**'] },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storageKey: 'wd_theme',
  },

  css: ['~/assets/css/style.css', 'vue-sonner/style.css'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },

  routeRules: {
    '/login': privatePage,
    '/register': privatePage,
    '/forgot-password': privatePage,
    '/otp': privatePage,
    '/profile': privatePage,
    '/profile/**': privatePage,
    '/cart': privatePage,
    '/checkout': privatePage,
    '/orders': privatePage,
    '/orders/**': privatePage,
    '/notifications': privatePage,
    '/maintenance': privatePage,
    '/en/login': privatePage,
    '/en/register': privatePage,
    '/en/forgot-password': privatePage,
    '/en/otp': privatePage,
    '/en/profile': privatePage,
    '/en/profile/**': privatePage,
    '/en/cart': privatePage,
    '/en/checkout': privatePage,
    '/en/orders': privatePage,
    '/en/orders/**': privatePage,
    '/en/notifications': privatePage,
    '/en/maintenance': privatePage,
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? 'https://dashboard.whitedecor.online',
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION ?? '1.0.0',
      googleSiteVerification: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY ?? '',
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID ?? '',
      firebaseVapidKey: process.env.NUXT_PUBLIC_FIREBASE_VAPID_KEY ?? '',
    },
  },

  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0',
        },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    output: {
      dir: 'build',
    },
  },

  i18n: {
    locales: [
      { code: 'ar', language: 'ar-EG', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'en', language: 'en-EG', name: 'English', file: 'en.json', dir: 'ltr' },
    ],
    defaultLocale: 'ar',
    baseUrl: SITE_URL,
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'ar',
    },
    vueI18n: './i18n/i18n.config.ts',
  },
});
