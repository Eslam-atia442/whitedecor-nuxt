import type { MaybeRefOrGetter } from 'vue';

export interface SeoOptions {
  title?: MaybeRefOrGetter<string | undefined>;
  description?: MaybeRefOrGetter<string | undefined>;
  image?: MaybeRefOrGetter<string | undefined>;
  url?: MaybeRefOrGetter<string | undefined>;
  type?: MaybeRefOrGetter<'website' | 'article' | 'product' | undefined>;
  keywords?: MaybeRefOrGetter<string[] | undefined>;
  noIndex?: MaybeRefOrGetter<boolean | undefined>;
}

export const useSeo = (options: SeoOptions = {}) => {
  return usePublicSeo({
    title: options.title,
    description: options.description,
    image: options.image,
    path: options.url,
    type: options.type,
    keywords: options.keywords,
    noIndex: options.noIndex,
  });
};
