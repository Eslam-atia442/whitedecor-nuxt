// [FLUTTER CONCEPT]: Home banner + curated collections (Cubit feed)

import type { ProductDto } from './product';

export type HomeStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SliderDto {
  id: number | string;
  name?: string | null;
  url?: string | null;
  image?: string | null;
  is_active?: boolean | number;
  titleKey?: string;
  subtitleKey?: string;
  isPlaceholder?: boolean;
}

export interface WhyUsItem {
  icon: string;
  titleKey: string;
  descKey?: string;
}

export interface TestimonialDto {
  id: string;
  nameKey: string;
  quoteKey: string;
  rating: number;
}

export interface HomeFeed {
  sliders: SliderDto[];
  newest: ProductDto[];
  discounted: ProductDto[];
  topSold: ProductDto[];
}
