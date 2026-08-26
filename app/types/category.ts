// types/category.ts
// [FLUTTER CONCEPT]: Equivalent to lib/core/models/category_model.dart

export interface CategoryDto {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  is_active: boolean | number;
  created_at?: string | null;
  updated_at?: string | null;
  parent_id?: number | null;
  parent?: CategoryDto | null;
  children?: CategoryDto[] | null;
  products_count?: number;
  description?: string | null;
  icon?: string | null;
}

export interface CategoryQueryParams {
  keyword?: string;
  parent_slug?: string;
  roots?: number;
  scope?: string;
  embed?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export interface CategoryTreeNode extends CategoryDto {
  level: number;
  hasChildren: boolean;
  children?: CategoryTreeNode[];
}

export interface CategoryBreadcrumb {
  label: string;
  to: string;
  isCurrent?: boolean;
}

export interface CategoryFilterOption {
  id: number | string;
  name: string;
  slug: string;
  count?: number;
  isSelected?: boolean;
}
