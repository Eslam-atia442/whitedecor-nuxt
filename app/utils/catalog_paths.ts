export const productPath = (product: { slug?: string | null; id: number | string }) =>
  `/products/${product.slug || product.id}`;

export const categoryPath = (slug: string) => `/categories/${slug}`;

export const brandPath = (brand: { slug?: string | null; id: number | string }) =>
  `/brands/${brand.slug || brand.id}`;

export const isNumericParam = (value: string) => /^\d+$/.test(value);

export const splitKeywords = (value?: string | null): string[] => {
  if (!value) return [];
  return value
    .split(/[,،]/)
    .map((part) => part.trim())
    .filter(Boolean);
};
