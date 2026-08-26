export interface OrganizationSchemaOptions {
  name?: string;
  logo?: string;
  email?: string;
  telephone?: string;
  sameAs?: string[];
}

export interface WebSiteSchemaOptions {
  name?: string;
  description?: string;
  url?: string;
  inLanguage?: string;
}

export const useSchemaOrg = (schemas: Record<string, unknown>[]) => {
  useHead({
    script: schemas.map((schema, index) => ({
      type: 'application/ld+json',
      key: `schema-${index}`,
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        ...schema,
      }),
    })),
  });
};

export const defineOrganization = (options: OrganizationSchemaOptions = {}) => {
  const ids = useSchemaIds();
  return {
    '@type': 'Organization',
    name: options.name || 'White Decor',
    url: ids.siteUrl,
    logo: options.logo || `${ids.siteUrl}/icon-512.png`,
    email: options.email,
    telephone: options.telephone,
    sameAs: (options.sameAs || []).filter(Boolean),
  };
};

export const defineWebSite = (options: WebSiteSchemaOptions = {}) => {
  const ids = useSchemaIds();
  return {
    '@type': 'WebSite',
    name: options.name || 'White Decor',
    url: options.url || ids.siteUrl,
    description: options.description,
    inLanguage: options.inLanguage || 'ar-EG',
  };
};

export const defineWebPage = (options: { name: string; description?: string; type?: string }) => ({
  '@type': options.type || 'WebPage',
  name: options.name,
  description: options.description,
});

export const defineAboutPage = (options: { name: string; description?: string }) => ({
  '@type': 'AboutPage',
  name: options.name,
  description: options.description,
});
