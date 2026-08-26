<template>
  <footer class="hidden border-t border-mist/30 navy-gradient text-surface lg:block">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
        <div class="space-y-5">
          <UiLogo inverted />
          <p class="max-w-xs text-sm leading-relaxed text-surface/75">{{ tagline }}</p>
          <UiSocialLinks />
          <UiStoreBadges />
        </div>

        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-gold">{{ $t('footer_shop') }}</h3>
          <nav class="space-y-2.5 text-sm text-surface/80">
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

        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-gold">{{ $t('legal.about_us') }}</h3>
          <nav class="space-y-2.5 text-sm text-surface/80">
            <NuxtLink :to="localize('/about')" class="block transition hover:text-gold">{{ $t('legal.about_us') }}</NuxtLink>
            <NuxtLink :to="localize('/sitemap')" class="block transition hover:text-gold">{{ $t('sitemap_title') }}</NuxtLink>
            <NuxtLink :to="localize('/terms')" class="block transition hover:text-gold">{{ $t('legal.terms_conditions') }}</NuxtLink>
            <NuxtLink :to="localize('/privacy')" class="block transition hover:text-gold">{{ $t('legal.privacy_policy') }}</NuxtLink>
          </nav>
        </div>

        <div class="space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-gold">{{ $t('legal.contact_us') }}</h3>
          <div class="space-y-3 text-sm text-surface/80">
            <a v-if="phone" :href="`tel:${phone}`" class="flex items-center gap-2 transition hover:text-gold" dir="ltr">
              <span class="material-symbols-rounded text-gold">call</span>
              <span>{{ phone }}</span>
            </a>
            <a
              v-if="whatsapp"
              :href="`https://wa.me/${whatsapp}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-3 py-2 font-bold text-white transition hover:brightness-110"
            >
              <iconify-icon icon="simple-icons:whatsapp" class="text-lg" />
              <span>{{ $t('whatsapp_support') }}</span>
            </a>
            <a v-if="email" :href="`mailto:${email}`" class="flex items-center gap-2 transition hover:text-gold">
              <span class="material-symbols-rounded text-gold">mail</span>
              <span>{{ email }}</span>
            </a>
          </div>
        </div>
      </div>
      <p class="mt-12 border-t border-white/10 pt-6 text-center text-xs text-surface/55">
        © {{ year }} {{ settingsStore.appName }}. {{ $t('footer_rights') }}
      </p>
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
