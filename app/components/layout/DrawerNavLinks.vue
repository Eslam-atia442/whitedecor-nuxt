<template>
  <nav class="space-y-1">
    <NuxtLink v-for="item in items" :key="item.to" :to="item.to" class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-ink transition hover:bg-gold/5" @click="$emit('close')">
      <span class="material-symbols-rounded text-lg text-gold">{{ item.icon }}</span>
      <span>{{ $t(item.label) }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const localePath = useLocalePath();

defineEmits<{ close: [] }>();

const items = computed(() => {
  const links = [
    { to: localePath('/'), icon: 'home', label: 'home' },
    { to: localePath('/products'), icon: 'chair', label: 'all_products' },
    { to: localePath('/categories'), icon: 'grid_view', label: 'categories' },
    { to: localePath('/brands'), icon: 'verified', label: 'brands' },
    { to: localePath('/sitemap'), icon: 'map', label: 'sitemap_title' },
    { to: localePath('/cart'), icon: 'shopping_bag', label: 'cart_title' },
  ];
  if (authStore.isAuthenticated) {
    links.push(
      { to: localePath('/orders'), icon: 'package_2', label: 'my_orders' },
      { to: localePath('/profile'), icon: 'person', label: 'profile_title' },
    );
  } else {
    links.push({ to: localePath('/login'), icon: 'login', label: 'sign_in' });
  }
  links.push({ to: localePath('/about'), icon: 'info', label: 'about_us' });
  return links;
});
</script>
