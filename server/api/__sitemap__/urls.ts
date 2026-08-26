const STATIC_SITEMAP_PATHS = [
  '/',
  '/products',
  '/categories',
  '/brands',
  '/about',
  '/privacy',
  '/terms',
  '/sitemap',
] as const;

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
};

type CategoryNode = {
  slug?: string;
  children?: CategoryNode[] | null;
};

const unwrap = <T>(raw: unknown): T[] => {
  if (Array.isArray(raw)) return raw as T[];
  const payload = raw as { data?: unknown };
  if (Array.isArray(payload?.data)) return payload.data as T[];
  return [];
};

const flattenCategories = (nodes: CategoryNode[], acc: string[] = []): string[] => {
  for (const node of nodes) {
    if (node.slug) acc.push(node.slug);
    if (node.children?.length) flattenCategories(node.children, acc);
  }
  return acc;
};

const fetchPages = async <T>(apiBase: string, path: string): Promise<T[]> => {
  const items: T[] = [];
  let page = 1;
  let lastPage = 1;
  do {
    const raw = await $fetch<unknown>(`${apiBase}${path}`, {
      query: { page, limit: 100, scope: 'mini' },
      headers: { Accept: 'application/json', 'accept-language': 'ar' },
    });
    items.push(...unwrap<T>(raw));
    const meta = (raw as { meta?: { last_page?: number } })?.meta;
    lastPage = meta?.last_page || 1;
    page += 1;
  } while (page <= lastPage && page <= 50);
  return items;
};

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiBase = String(config.public.apiBase || 'https://dashboard.whitedecor.online').replace(/\/+$/, '');
  const entries: SitemapEntry[] = STATIC_SITEMAP_PATHS.map((loc, index) => ({
    loc,
    changefreq: loc === '/' ? 'daily' : 'weekly',
    priority: loc === '/' ? 1 : index < 4 ? 0.8 : 0.5,
  }));

  try {
    const categories = unwrap<CategoryNode>(
      await $fetch(`${apiBase}/api/v1/categories`, {
        query: { roots: 1, embed: 'children' },
        headers: { Accept: 'application/json', 'accept-language': 'ar' },
      }),
    );
    for (const slug of flattenCategories(categories)) {
      entries.push({ loc: `/categories/${slug}`, changefreq: 'weekly', priority: 0.8 });
    }
  } catch {
    // sitemap still emits static routes if the catalog API is down
  }

  try {
    const products = await fetchPages<{ slug?: string; id?: number; updated_at?: string }>(
      apiBase,
      '/api/v1/products',
    );
    for (const product of products) {
      const loc = product.slug ? `/products/${product.slug}` : product.id ? `/products/${product.id}` : '';
      if (!loc) continue;
      entries.push({
        loc,
        lastmod: product.updated_at,
        changefreq: 'weekly',
        priority: 0.7,
      });
    }
  } catch {
    // ignore
  }

  return entries;
});
