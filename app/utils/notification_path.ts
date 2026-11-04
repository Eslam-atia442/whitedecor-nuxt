const clean = (value?: string | number | null): string => {
  if (value == null) return '';
  return String(value).trim();
};

export const notificationPath = (
  input: {
    model_type?: string | number | null;
    model_id?: string | number | null;
    order_num?: string | number | null;
    slug?: string | number | null;
  } = {},
): string => {
  const type = clean(input.model_type).toLowerCase();

  if (type === 'order') {
    const id = clean(input.order_num) || clean(input.model_id);
    if (id) return `/orders/${id}`;
  }

  if (type === 'product') {
    const id = clean(input.slug) || clean(input.model_id);
    if (id) return `/products/${id}`;
  }

  if (type === 'coupon') {
    return '/checkout';
  }

  return '/notifications';
};

export const notificationRequiresAuth = (
  input: { model_type?: string | number | null } = {},
): boolean => {
  const type = clean(input.model_type).toLowerCase();
  return type === 'order' || type === 'coupon';
};

export const PENDING_NOTIFICATION_KEY = 'wd_pending_notification';
