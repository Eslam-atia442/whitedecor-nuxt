// composables/useProductDetail.ts
import { toast } from 'vue-sonner';

export const useProductDetail = () => {
  const store = useProductDetailStore();
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();
  const { t } = useI18n();

  const isZoomModalOpen = ref(false);
  const isAddonsModalOpen = ref(false);
  const isPromoModalOpen = ref(false);
  const isAddToCartConfirmModalOpen = ref(false);
  const isAddToCartSuccessModalOpen = ref(false);

  const startCountdown = () => {
    if (store.product?.discount_end_at && store.hasActiveDiscount) {
      store.startDealCountdown(store.product.discount_end_at);
    } else {
      store.stopDealCountdown();
    }
  };

  const isFavorite = computed(() => {
    return store.product ? wishlistStore.isFavorite(store.product.id) : false;
  });

  const toggleFavorite = () => {
    if (store.product) {
      wishlistStore.toggleFavorite(store.product);
      if (wishlistStore.isFavorite(store.product.id)) {
        toast.success(t('added_to_wishlist', 'Added to wishlist'));
      }
    }
  };

  const isAddingToCart = computed(() => {
    return store.product ? Boolean(cartStore.addingToCartMap[store.product.id]) : false;
  });

  const promptAddToCart = () => {
    if (!store.product) return;
    isAddToCartConfirmModalOpen.value = true;
  };

  const confirmAddToCart = async () => {
    if (!store.product) return;
    const addonIds = [...store.selectedAddonIds];
    isAddToCartConfirmModalOpen.value = false;
    const success = await cartStore.addToCart(store.product, store.quantity, addonIds, true);
    if (success) {
      isAddonsModalOpen.value = false;
      isAddToCartSuccessModalOpen.value = true;
    }
  };

  onMounted(() => {
    startCountdown();
  });

  onUnmounted(() => {
    store.stopDealCountdown();
  });

  return {
    product: computed(() => store.product),
    relatedProducts: computed(() => store.relatedProducts),
    activeImageIndex: computed({
      get: () => store.activeImageIndex,
      set: (val) => { store.activeImageIndex = val; },
    }),
    selectedAddonIds: computed(() => store.selectedAddonIds),
    quantity: computed({
      get: () => Math.min(5, store.quantity),
      set: (val) => store.setQuantity(Math.min(5, Math.max(1, val))),
    }),
    remainingSeconds: computed(() => store.remainingSeconds),
    isLoading: computed(() => store.isLoading),
    isAddingToCart,
    isError: computed(() => store.isError),
    errorMessage: computed(() => store.errorMessage),
    isInStock: computed(() => store.isInStock),
    effectivePriceNumeric: computed(() => store.effectivePriceNumeric),
    hasActiveDiscount: computed(() => store.hasActiveDiscount),
    discountPercentage: computed(() => store.discountPercentage),
    allImages: computed(() => store.allImages),
    currentImage: computed(() => store.currentImage),
    addonsTotal: computed(() => store.addonsTotal),
    grandTotal: computed(() => store.grandTotal),
    isFavorite,
    isZoomModalOpen,
    isAddonsModalOpen,
    isPromoModalOpen,
    isAddToCartConfirmModalOpen,
    isAddToCartSuccessModalOpen,
    fetchProductDetail: store.fetchProductDetail,
    toggleAddon: store.toggleAddon,
    toggleFavorite,
    promptAddToCart,
    confirmAddToCart,
  };
};
