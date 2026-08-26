// stores/wishlist.ts
import { defineStore } from 'pinia';
import type { ProductDto } from '~/types/product';

export const useWishlistStore = defineStore('wishlist', () => {
  const cookieWishlist = useCookie<number[]>('wd_wishlist_ids', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  const favoriteIds = ref<Set<number>>(new Set(cookieWishlist.value || []));

  const count = computed(() => favoriteIds.value.size);

  const isFavorite = (productId: number): boolean => {
    return favoriteIds.value.has(productId);
  };

  const toggleFavorite = (product: ProductDto) => {
    const next = new Set(favoriteIds.value);
    if (next.has(product.id)) {
      next.delete(product.id);
    } else {
      next.add(product.id);
    }
    favoriteIds.value = next;
    cookieWishlist.value = Array.from(next);
  };

  return {
    favoriteIds,
    count,
    isFavorite,
    toggleFavorite,
  };
});
