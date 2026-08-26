// types/brand.ts
// [FLUTTER CONCEPT]: Equivalent to lib/core/models/brand_model.dart

export interface BrandDto {
  id: number;
  slug?: string | null;
  name?: string | null;
  image?: string | null;
  is_active?: number | boolean;
  created_at?: string | null;
  updated_at?: string | null;
  products_count?: number;
}
