// composables/useCartActions.ts
import { toast } from 'vue-sonner';
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import type { ProductDto } from '~/types/product';

export const useCartActions = () => {
  const store = useCartStore();
  const authStore = useAuthStore();
  const { push, localize } = useLocalizedPath();
  const { t } = useI18n();

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
    if (!authStore.isAuthenticated) {
      toast.info(t('auth_required_checkout'));
      return navigateTo(localize('/register?redirect=/checkout'));
    }
    return push('/checkout');
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
