// types/orders.ts
// [FLUTTER CONCEPT]: Equivalent to lib/core/models/order_model.dart, 
// cart_item_model.dart, coupon_model.dart, and country_model.dart

export type OrderStatus = 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';

export interface OrderItemAddonDto {
  id: number;
  addon_id: number;
  addon_name?: string | null;
  unit_price?: string | null;
  quantity?: number | null;
  total_price?: string | null;
}

export interface OrderProductDto {
  id: number;
  name: string;
  sku?: string | null;
  price?: string | null;
  final_price?: string | null;
  image?: string | null;
}

export interface OrderItemDto {
  id: number | string;
  product_id: number;
  product_name: string;
  unit_price: string;
  addons_total?: string | null;
  quantity: number;
  total_price: string;
  product?: OrderProductDto | null;
  addons: OrderItemAddonDto[];
}

export interface OrderCouponDto {
  id: number;
  coupon_num: string;
  discount_amount?: string | number | null;
  type?: 'percentage' | 'fixed' | string;
}

export interface OrderCountryDto {
  id: number;
  name: string;
  code?: string;
  currency?: string;
}

export interface OrderDto {
  id: number;
  order_num?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  country_id?: string | null;
  region_id?: string | null;
  city_id?: string | null;
  address?: string | null;
  notes?: string | null;
  status?: OrderStatus | string | null;
  status_label?: string | null;
  subtotal?: string | null;
  discount_amount?: string | null;
  total?: string | null;
  coupon_num?: string | null;
  created_at?: string | null;
  items?: OrderItemDto[] | null;
  coupon?: OrderCouponDto | null;
  country?: OrderCountryDto | null;
}

export interface OrdersFilterParams {
  status?: OrderStatus | 'all';
  searchKeyword?: string;
  startDate?: string;
  endDate?: string;
}

export interface OrderTimelineStep {
  key: OrderStatus;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  isCompleted: boolean;
  isCurrent: boolean;
  date?: string | null;
}

export interface OrdersApiResponse<T = OrderDto[]> {
  status: boolean | number;
  message?: string;
  data: T;
}
