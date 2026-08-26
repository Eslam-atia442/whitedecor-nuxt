// types/cart.ts
// [FLUTTER CONCEPT]: Equivalent to lib/core/models/cart_model.dart & cart_item_model.dart
import type { AddonDto, ProductDto } from '~/types/product';

export interface CartItemAddonDto {
  id: number;
  addon_id: number;
  addon_name?: string | null;
  unit_price?: string | null;
  quantity?: number | null;
  total_price?: string | null;
  addon?: AddonDto | null;
}

export interface CartItemDto {
  id: number | string;
  product_id: number;
  product_name: string;
  unit_price: string;
  addons_total?: string | null;
  quantity: number;
  total_price: string;
  cart_token?: string | null;
  product?: ProductDto | null;
  addons: CartItemAddonDto[];
}

export interface CartDto {
  items: CartItemDto[];
  subtotal: string;
  items_count: number;
  cart_token?: string | null;
}

export interface AddToCartPayload {
  product_id: string | number;
  quantity: string | number;
  addons?: number[];
  unit_price?: string | number;
}

export interface UpdateCartItemPayload {
  quantity: string | number;
  addons?: number[];
}

export interface CartApiResponse<T = CartDto> {
  status: boolean | number;
  message?: string;
  data: T;
  cart_token?: string;
}
