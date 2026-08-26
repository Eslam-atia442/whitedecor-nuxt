/** Catalog screens to cache. Product details, checkout, and auth stay uncached. */
export const CATALOG_KEEPALIVE = {
  max: 8,
  include: /^(index|categories|categories-slug|products|brands|search)(___.*)?$/,
};
