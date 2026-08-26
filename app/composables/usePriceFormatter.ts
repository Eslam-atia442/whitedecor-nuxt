// composables/usePriceFormatter.ts
import type { ProductDto } from '~/types/product';

export const getProductPriceInfo = (product: ProductDto | null | undefined, fallbackPrice?: string | number) => {
  const priceRaw = parseFloat(String(product?.price || fallbackPrice || '0')) || 0;
  if (!product) {
    return {
      originalPrice: priceRaw,
      effectivePrice: priceRaw,
      hasDiscount: false,
      discountAmount: 0,
      discountPercent: 0,
    };
  }

  const isDiscountActive =
    product.is_discount_active === true ||
    product.is_discount_active === 1 ||
    String(product.is_discount_active) === '1';

  const discountAmount = parseFloat(String(product.discount_amount || '0')) || 0;
  const finalPriceParsed = parseFloat(String(product.final_price || '0')) || 0;

  let effective = priceRaw; 
  let hasDiscount = false;

  if (isDiscountActive) {
    if (finalPriceParsed > 0 && finalPriceParsed < priceRaw) {
      effective = finalPriceParsed;
      hasDiscount = true;
    } else if (discountAmount > 0) {
      effective = Math.max(0, priceRaw - discountAmount);
      hasDiscount = true;
    }
  }

  const diff = Math.max(0, priceRaw - effective);
  const discountPercent = priceRaw > 0 && hasDiscount ? Math.round((diff / priceRaw) * 100) : 0;

  return {
    originalPrice: priceRaw,
    effectivePrice: effective,
    hasDiscount,
    discountAmount: diff,
    discountPercent,
  };
};

export const usePriceFormatter = () => {
  const { t } = useI18n();

  const formatPrice = (price: number | string | null | undefined): string => {
    if (price === null || price === undefined) return '';
    const numeric = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numeric)) return '';
    const formattedNum = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeric);
    return `${formattedNum} ${t('egp', 'EGP')}`;
  };

  const parsePrice = (price: number | string | null | undefined): number => {
    if (price === null || price === undefined) return 0;
    const numeric = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numeric) ? 0 : numeric;
  };

  return {
    formatPrice,
    parsePrice,
    getProductPriceInfo,
  };
};
