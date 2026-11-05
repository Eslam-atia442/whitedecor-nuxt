// types/checkout.ts
// [FLUTTER CONCEPT]: Equivalent to lib/core/models/checkout_request_model.dart, order_model.dart & coupon_model.dart
import type { CartItemDto } from '~/types/cart';

export interface CouponDto {
  id: number;
  coupon_num: string;
  type?: string;
  type_label?: string;
  discount?: string;
  max_discount?: string;
  start_date?: string;
  expire_date?: string;
  is_active?: number | boolean;
}

export interface OrderDto {
  id: number;
  order_num?: string;
  name?: string;
  email?: string;
  phone?: string;
  country_id?: string;
  region_id?: string;
  city_id?: string;
  address?: string;
  notes?: string;
  status?: string;
  status_label?: string;
  subtotal?: string;
  original_subtotal?: string;
  offer_savings?: string;
  discount_amount?: string;
  total?: string;
  coupon_num?: string;
  created_at?: string;
  items?: CartItemDto[];
  coupon?: CouponDto | null;
}

export type DeliveryMethodType = 'white_glove' | 'express' | 'showroom';
export type PaymentMethodType = 'cod' | 'card' | 'installments';

export interface DeliveryOption {
  id: DeliveryMethodType;
  titleKey: string;
  descriptionKey: string;
  cost: number;
  badgeKey?: string;
  icon: string;
}

export interface PaymentOption {
  id: PaymentMethodType;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  badge?: string;
}

export interface CheckoutFormState {
  name: string;
  phone: string;
  countryId: string;
  governorate?: string;
  city?: string;
  address: string;
  building?: string;
  apartment?: string;
  notes?: string;
  couponNum?: string;
  deliveryMethod: DeliveryMethodType;
  paymentMethod: PaymentMethodType;
}

export type CheckoutFieldErrors = Partial<Record<keyof CheckoutFormState, string[]>>;

export interface CheckoutApiResponse {
  status: boolean | number;
  message?: string;
  data: {
    order?: OrderDto;
    [key: string]: unknown;
  };
}
