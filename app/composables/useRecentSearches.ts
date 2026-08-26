export const useRecentSearches = () => {
  const recents = useCookie<string[]>('wd_recent_searches', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 90,
  });

  const terms = computed(() => recents.value || []);

  const add = (term: string) => {
    const next = term.trim();
    if (!next) return;
    recents.value = [next, ...terms.value.filter((item) => item !== next)].slice(0, 8);
  };

  const remove = (term: string) => {
    recents.value = terms.value.filter((item) => item !== term);
  };

  const clear = () => {
    recents.value = [];
  };

  return { terms, add, remove, clear };
};
