// composables/useCartActions.ts
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import type { ProductDto } from '~/types/product';

export const useCartActions = () => {
  const store = useCartStore();
  const authStore = useAuthStore();
  const { push } = useLocalizedPath();

  const isClearModalOpen = ref(false);

  const handleAddToCart = async (product: ProductDto, qty = 1, addons: number[] = []) => {
    return await store.addToCart(product, qty, addons);
  };

  const handleIncrement = (itemId: string | number, currentQty: number, addons?: number[]) => {
    store.updateQuantity(itemId, currentQty + 1, addons);
  };

  const handleDecrement = (itemId: string | number, currentQty: number, addons?: number[]) => {
    store.updateQuantity(itemId, currentQty - 1, addons);
  };

  const handleRemoveItem = (itemId: string | number) => {
    store.removeFromCart(itemId);
  };

  const handleRemoveAddon = (itemId: string | number, addonIdToRemove: number) => {
    store.removeAddon(itemId, addonIdToRemove);
  };

  const promptClearCart = () => {
    isClearModalOpen.value = true;
  };

  const confirmClearCart = async () => {
    isClearModalOpen.value = false;
    await store.clearCart();
  };

  const proceedToCheckout = () => {
    push('/checkout');
  };

  return {
    store,
    isClearModalOpen,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleRemoveItem,
    handleRemoveAddon,
    promptClearCart,
    confirmClearCart,
    proceedToCheckout,
  };
};
