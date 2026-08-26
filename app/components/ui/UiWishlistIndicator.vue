<template>
  <UiIconBadgeLink
    to="/"
    icon="favorite"
    :label="$t('wishlist')"
    :count="count"
  />
</template>

<script setup lang="ts">
const wishlistStore = useWishlistStore();
const count = computed(() => wishlistStore.count);
</script>
