// types/addon.ts
// [FLUTTER CONCEPT]: Equivalent to lib/core/models/addon_model.dart

export interface AddonDto {
  id: number;
  name: string;
  price: string;
  is_free: boolean | number;
  is_active: boolean | number;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface SelectedAddon {
  id: number;
  name: string;
  priceNumeric: number;
  isFree: boolean;
}
