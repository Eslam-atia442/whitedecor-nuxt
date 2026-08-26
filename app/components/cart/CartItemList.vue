<template>
  <div class="space-y-4">
    <TransitionGroup name="cart-list" tag="div" class="space-y-4">
      <CartItemCard
        v-for="item in store.items"
        :key="item.id"
        :item="item"
        :is-loading="Boolean(store.itemLoadingMap[item.id])"
        @increment="handleIncrement(item.id, item.quantity)"
        @decrement="handleDecrement(item.id, item.quantity)"
        @remove="handleRemoveItem(item.id)"
        @remove-addon="handleRemoveAddon(item.id, $event)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { useCartActions } from '~/composables/useCartActions';

const store = useCartStore();
const { handleIncrement, handleDecrement, handleRemoveItem, handleRemoveAddon } = useCartActions();
</script>

<style scoped>
.cart-list-enter-active,
.cart-list-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.cart-list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.cart-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
