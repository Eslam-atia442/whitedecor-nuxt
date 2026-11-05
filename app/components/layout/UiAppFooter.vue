<template>
  <footer class="hidden border-t border-white/10 navy-gradient text-surface py-16 lg:block">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <!-- Brand & Vision -->
        <div class="space-y-4">
          <UiLogo inverted />
          <p class="max-w-sm text-sm leading-relaxed text-surface/75 font-cairo">
            {{ tagline }}
          </p>
          <UiSocialLinks class="pt-1" />
          <div class="pt-2">
            <UiStoreBadges />
          </div>
        </div>

        <!-- Shop Navigation -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-[0.18em] text-gold font-cairo">
            {{ $t('footer_shop') }}
          </h3>
          <nav class="space-y-2.5 text-sm text-surface/80 font-cairo">
            <NuxtLink :to="localize('/products')" class="block transition hover:text-gold">{{ $t('all_products') }}</NuxtLink>
            <NuxtLink :to="localize('/categories')" class="block transition hover:text-gold">{{ $t('all_categories') }}</NuxtLink>
            <NuxtLink :to="localize('/brands')" class="block transition hover:text-gold">{{ $t('brands') }}</NuxtLink>
            <NuxtLink
              v-for="category in shopCategories"
              :key="category.id"
              :to="localize(`/categories/${category.slug}`)"
              class="block transition hover:text-gold"
            >
              {{ category.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- About & Legal -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-[0.18em] text-gold font-cairo">
            {{ $t('legal.about_us') }}
          </h3>
          <nav class="space-y-2.5 text-sm text-surface/80 font-cairo">
            <NuxtLink :to="localize('/about')" class="block transition hover:text-gold">{{ $t('legal.about_us') }}</NuxtLink>
            <NuxtLink :to="localize('/sitemap')" class="block transition hover:text-gold">{{ $t('sitemap_title') }}</NuxtLink>
            <NuxtLink :to="localize('/terms')" class="block transition hover:text-gold">{{ $t('legal.terms_conditions') }}</NuxtLink>
            <NuxtLink :to="localize('/privacy')" class="block transition hover:text-gold">{{ $t('legal.privacy_policy') }}</NuxtLink>
          </nav>
        </div>

        <!-- Contact & Support -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-[0.18em] text-gold font-cairo">
            {{ $t('legal.contact_us') }}
          </h3>
          <div class="space-y-3 text-sm text-surface/80 font-cairo">
            <a v-if="phone" :href="`tel:${phone}`" class="flex items-center gap-2.5 transition hover:text-gold">
              <span class="material-symbols-rounded text-gold shrink-0">call</span>
              <span dir="ltr" class="tabular-nums font-semibold">{{ phone }}</span>
            </a>
            <a
              v-if="whatsapp"
              :href="`https://wa.me/${whatsapp}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-3.5 py-2 font-bold text-white shadow-xs transition hover:brightness-110 active:scale-95"
            >
              <iconify-icon icon="simple-icons:whatsapp" class="text-lg" />
              <span>{{ $t('whatsapp_support') }}</span>
            </a>
            <a v-if="email" :href="`mailto:${email}`" class="flex items-center gap-2.5 transition hover:text-gold">
              <span class="material-symbols-rounded text-gold shrink-0">mail</span>
              <span dir="ltr" class="font-medium">{{ email }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-surface/55 sm:flex-row font-cairo">
        <p>© {{ year }} {{ settingsStore.appName }}. {{ $t('footer_rights') }}</p>
        <p class="text-surface/40">صُنع بحب في مصر 🇪🇬</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { stripHtml } from '~/utils/unwrap_list';

const { t } = useI18n();
const { localize } = useLocalizedPath();
const settingsStore = useSettingsStore();
const categoriesStore = useCategoriesStore();
const year = new Date().getFullYear();
const phone = computed(() => settingsStore.contactInfo?.phone);
const whatsapp = computed(() => settingsStore.contactInfo?.whatsappCleanNumber);
const email = computed(() => settingsStore.contactInfo?.email);
const shopCategories = computed(() => categoriesStore.rootCategories.slice(0, 5));
const tagline = computed(() => stripHtml(settingsStore.aboutHtml || '', 140) || t('footer_tagline'));
</script>
