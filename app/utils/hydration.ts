import type { NuxtApp } from '#app';

/** Reuse SSR payload on hydrate. Return undefined on client nav so the handler runs. */
export const reuseHydrationPayload = <T = unknown>(
  key: string,
  nuxtApp: NuxtApp,
): T | undefined => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key] as T | undefined;
  }
  return undefined;
};
