export const unwrapList = <T>(raw: unknown): T[] => {
  if (Array.isArray(raw)) return raw as T[];
  const payload = raw as { data?: unknown };
  if (Array.isArray(payload?.data)) return payload.data as T[];
  const nested = payload?.data as { data?: unknown } | undefined;
  if (Array.isArray(nested?.data)) return nested.data as T[];
  return [];
};

export const stripHtml = (html: string, max = 200): string => {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
};

export const isUsableSlider = (slider: {
  image?: string | null;
}): boolean => Boolean((slider.image || '').trim());
