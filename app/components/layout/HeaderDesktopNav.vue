<template>
  <nav class="hidden max-w-full items-center gap-3 overflow-x-auto scrollbar-none lg:flex xl:gap-4">
    <NuxtLink
      v-for="item in links"
      :key="item.to"
      :to="item.to"
      class="shrink-0 text-xs font-semibold text-ink transition hover:text-gold xl:text-sm"
      active-class="text-gold"
    >
      {{ $t(item.label) }}
    </NuxtLink>
    <div class="flex shrink-0 items-center gap-1 rounded-full bg-navy/5 px-1.5 py-1 ring-1 ring-mist dark:bg-surface/15">
      <NuxtLink
        :to="localePath('/cart')"
        class="relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-ink transition hover:text-gold xl:text-sm"
        active-class="bg-card text-gold shadow-subtle"
      >
        <span class="material-symbols-rounded text-[18px] text-gold">shopping_bag</span>
        <span>{{ $t('cart_title') }}</span>
        <span
          v-if="cartCount > 0"
          class="inline-flex min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-black text-navy"
        >
          {{ cartCount }}
        </span>
      </NuxtLink>
      <NuxtLink
        :to="localePath('/orders')"
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-ink transition hover:text-gold xl:text-sm"
        active-class="bg-card text-gold shadow-subtle"
      >
        <span class="material-symbols-rounded text-[18px] text-gold">package_2</span>
        <span>{{ $t('my_orders') }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const authStore = useAuthStore();
const cartStore = useCartStore();
const cartCount = computed(() => cartStore.itemCount || 0);

const links = computed(() => [
  { to: localePath('/'), label: 'home' },
  { to: localePath('/products'), label: 'all_products' },
  { to: localePath('/categories'), label: 'categories' },
  { to: localePath('/brands'), label: 'brands' },
  { to: localePath('/about'), label: 'about_us' },
  {
    to: localePath(authStore.isAuthenticated ? '/profile' : '/login'),
    label: authStore.isAuthenticated ? 'profile_title' : 'sign_in',
  },
]);
</script>
