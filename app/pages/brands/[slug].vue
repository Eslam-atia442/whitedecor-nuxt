<template>
  <div class="py-12 text-center text-sm text-ink-secondary">
    {{ $t('loading') }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { localize } = useLocalizedPath();
const brandParam = String(route.params.slug || '');

onMounted(async () => {
  await navigateTo(localize({ path: '/products', query: { search: brandParam } }), { replace: true });
});
</script>

