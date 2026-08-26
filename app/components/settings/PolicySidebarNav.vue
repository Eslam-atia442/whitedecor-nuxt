<template>
  <aside class="hidden lg:block">
    <nav class="sticky top-24 space-y-2 rounded-xl border border-mist bg-card p-4">
      <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-secondary">
        {{ $t('legal.table_of_contents') }}
      </h3>
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="localize(item.to)"
        class="block rounded-lg px-3 py-2 text-sm transition hover:bg-gold/5"
        :class="route.path === localize(item.to) ? 'bg-gold/10 text-gold font-medium' : 'text-ink'"
      >
        {{ $t(item.label) }}
      </NuxtLink>
      <div class="mt-4 rounded-lg bg-mist/30 p-3 text-sm">
        <p class="font-medium text-ink">{{ $t('legal.need_help') }}</p>
        <p class="mt-1 text-ink-secondary">{{ $t('legal.contact_support') }}</p>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute();
const { localize } = useLocalizedPath();
const items = [
  { to: '/about', label: 'legal.about_us' },
  { to: '/terms', label: 'legal.terms_conditions' },
  { to: '/privacy', label: 'legal.privacy_policy' },
];
</script>
