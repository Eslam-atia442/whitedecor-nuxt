<template>
  <UiIconBadgeLink
    to="/cart"
    icon="shopping_bag"
    :label="$t('cart_title')"
    :count="count"
  />
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const count = computed(() => cartStore.itemCount || 0);
</script>
