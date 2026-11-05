// types/product.ts
// [FLUTTER CONCEPT]: Equivalent to lib/core/models/product_model.dart & lib/features/products/domain/model/product_filter_params.dart

export type { AddonDto } from './addon';
export type { BrandDto } from './brand';
export type { CategoryDto } from './category';
import type { AddonDto } from './addon';
import type { BrandDto } from './brand';
import type { CategoryDto } from './category';

export type ProductAddon = AddonDto;

export type ProductSortOption = 'DESC' | 'ASC' | 'PRICE_ASC' | 'PRICE_DESC';

export interface ProductDto {
  id: number;
  slug?: string | null;
  name?: string | null;
  sku?: string | null;
  price?: string | null;
  final_price?: string | null;
  old_price?: string | null;
  discount_amount?: string | null;
  is_discount_active?: boolean | number;
  discount_type?: string | null;
  discount?: string | null;
  max_discount?: string | null;
  discount_start_at?: string | null;
  discount_end_at?: string | null;
  discount_end_date?: string | null;
  image?: string | null;
  gallery?: string[] | null;
  in_stock?: number | boolean;
  description?: string | null;
  short_description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  barcode?: string | null;
  is_active?: number | boolean;
  created_at?: string | null;
  updated_at?: string | null;
  brand?: BrandDto | null;
  category?: CategoryDto | null;
  addons?: AddonDto[];
  reviews_avg?: number | string | null;
  reviews_count?: number | null;
}

export interface ProductFilterParams {
  page?: number;
  limit?: number;
  keyword?: string;
  category_id?: number | string;
  category_slug?: string;
  brand_id?: number | string;
  in_stock?: number;
  only_offers?: boolean;
  price_min?: number;
  price_max?: number;
  scope?: string;
  embed?: string;
  withoutRelation?: string;
  order?: ProductSortOption;
}

export interface ProductPaginationMeta {
  current_page: number;
  from?: number | null;
  last_page: number;
  per_page: number;
  to?: number | null;
  total: number;
  has_more?: boolean;
}

export interface PaginatedProductsResponse {
  data: ProductDto[];
  meta?: ProductPaginationMeta;
  links?: {
    first?: string;
    last?: string;
    prev?: string | null;
    next?: string | null;
  };
}

export interface ProductReview {
  id: number;
  reviewerName: string;
  rating: number;
  comment: string;
  isVerifiedBuyer: boolean;
  createdAt: string;
}
