<template>
  <nav
    v-if="!isProductDetailPage"
    class="fixed inset-x-4 bottom-4 z-40 rounded-3xl border border-mist bg-card/90 px-2 py-2 shadow-glass backdrop-blur-xl lg:hidden"
  >
    <div class="flex items-center justify-between">
      <UiBottomNavItem
        v-for="item in navItems"
        :key="item.key"
        :icon="icons[item.key] || 'circle'"
        :label="$t(item.labelKey)"
        :active="isActive(item.route)"
        :badge="item.badgeKey === 'cart' ? cartBadgeCount : item.badgeKey === 'orders' ? ordersBadgeCount : 0"
        @click="handleNavClick(item)"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { NavItemConfig } from '~/types/navigation';

const route = useRoute();
const localePath = useLocalePath();
const { handleNavClick } = useShellNavigation();
const { cartBadgeCount, ordersBadgeCount } = useAppSessionSync();

const isProductDetailPage = computed(() => {
  if (route.meta.hideMobileNav) return true;
  return String(route.name || '').includes('products-slug');
});

const isActive = (path: string) => {
  const resolved = localePath(path);
  if (path === '/') {
    return route.path === resolved || route.path === `${resolved}/`;
  }
  return route.path === resolved || route.path.startsWith(`${resolved}/`);
};

const icons: Record<string, string> = {
  home: 'home',
  products: 'chair',
  cart: 'shopping_bag',
  orders: 'package_2',
  profile: 'person',
};

const navItems: NavItemConfig[] = [
  { key: 'home', labelKey: 'home', route: '/', icon: '', activeIcon: '' },
  { key: 'products', labelKey: 'all_products', route: '/products', icon: '', activeIcon: '' },
  { key: 'cart', labelKey: 'cart', route: '/cart', icon: '', activeIcon: '', badgeKey: 'cart' },
  { key: 'orders', labelKey: 'my_orders', route: '/orders', icon: '', activeIcon: '', badgeKey: 'orders' },
  { key: 'profile', labelKey: 'profile', route: '/profile', icon: '', activeIcon: '', requiresAuth: true, authFallbackRoute: '/login?redirect=/profile' },
];
</script>
