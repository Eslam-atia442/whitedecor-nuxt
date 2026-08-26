<template>
  <div v-if="links.length" class="flex items-center gap-2.5">
    <a
      v-for="link in links"
      :key="link.icon"
      :href="link.href"
      target="_blank"
      rel="noopener noreferrer"
      class="flex size-11 items-center justify-center rounded-2xl text-white shadow-subtle transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
      :style="{ background: link.bg }"
      :aria-label="link.label"
    >
      <iconify-icon :icon="link.icon" class="text-lg" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { SOCIAL_LINKS } from '~/constants/social';

const settingsStore = useSettingsStore();

const links = computed(() => {
  const items: { icon: string; href: string; label: string; bg: string }[] = [];
  const wa = settingsStore.contactInfo?.whatsappCleanNumber;
  if (wa) {
    items.push({
      icon: 'simple-icons:whatsapp',
      href: `https://wa.me/${wa}`,
      label: 'WhatsApp',
      bg: '#25D366',
    });
  }
  if (SOCIAL_LINKS.instagram) {
    items.push({
      icon: 'simple-icons:instagram',
      href: SOCIAL_LINKS.instagram,
      label: 'Instagram',
      bg: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
    });
  }
  if (SOCIAL_LINKS.facebook) {
    items.push({
      icon: 'simple-icons:facebook',
      href: SOCIAL_LINKS.facebook,
      label: 'Facebook',
      bg: '#1877F2',
    });
  }
  return items;
});
</script>
