// types/coupon.ts
// [FLUTTER CONCEPT]: Equivalent to lib/core/models/coupon_model.dart & lib/core/models/coupon_check_result_model.dart

export interface CouponDto {
  id: number;
  coupon_num: string;
  code?: string; // Ergonomic alias for coupon_num
  type?: 'ratio' | 'fixed' | string | null;
  type_label?: string | null;
  discount?: string | number | null;
  max_discount?: string | number | null;
  start_date?: string | null;
  expire_date?: string | null;
  is_active?: number | boolean | null;
  max_use?: number | null;
  use_times?: number | null;
  min_order?: string | number | null;
}

export interface CouponCheckResultDto {
  coupon?: CouponDto | null;
  coupon_code?: string;
  is_valid: boolean;
  discount_amount: number;
  final_amount: number;
  new_total?: number; // Ergonomic alias for final_amount
  message?: string | null;
}

