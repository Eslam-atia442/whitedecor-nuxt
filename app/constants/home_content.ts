import type { TestimonialDto, WhyUsItem } from '~/types/home';

export const WHY_US_ITEMS: WhyUsItem[] = [
  { icon: 'verified', titleKey: 'why_us_quality_title', descKey: 'why_us_quality_desc' },
  { icon: 'design_services', titleKey: 'why_us_design_title', descKey: 'why_us_design_desc' },
  { icon: 'local_shipping', titleKey: 'why_us_delivery_title', descKey: 'why_us_delivery_desc' },
  { icon: 'auto_awesome', titleKey: 'why_us_authenticity_title', descKey: 'why_us_authenticity_desc' },
];

export const HOME_TESTIMONIALS: TestimonialDto[] = [
  { id: 't1', nameKey: 'sample_reviewer_name_1', quoteKey: 'sample_review_quote_1', rating: 5 },
  { id: 't2', nameKey: 'sample_reviewer_name_2', quoteKey: 'sample_review_quote_2', rating: 5 },
  { id: 't3', nameKey: 'sample_reviewer_name_3', quoteKey: 'sample_review_quote_3', rating: 5 },
];
