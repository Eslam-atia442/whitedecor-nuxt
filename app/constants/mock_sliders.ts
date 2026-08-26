import type { SliderDto } from '~/types/home';

export const MOCK_SLIDERS: SliderDto[] = [
  {
    id: 'mock-summer',
    titleKey: 'summer_sale',
    subtitleKey: 'summer_sale_subtitle',
    url: '/products',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80',
    isPlaceholder: true,
    is_active: true,
  },
  {
    id: 'mock-collection',
    titleKey: 'new_collection',
    subtitleKey: 'new_collection_subtitle',
    url: '/products',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80',
    isPlaceholder: true,
    is_active: true,
  },
  {
    id: 'mock-discount',
    titleKey: 'special_discount',
    subtitleKey: 'special_discount_subtitle',
    url: '/products?offers=true',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1920&q=80',
    isPlaceholder: true,
    is_active: true,
  },
];
