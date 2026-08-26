// composables/useOrderTracking.ts
import type { OrderDto, OrderStatus, OrderTimelineStep } from '~/types/orders';

export const useOrderTracking = () => {
  const { t } = useI18n();

  const buildTimelineSteps = (order: OrderDto): OrderTimelineStep[] => {
    const s = (order.status || 'pending').trim().toLowerCase() as OrderStatus;
    const isCancelled = s === 'cancelled';

    return [
      {
        key: 'pending',
        titleKey: 'timeline_placed',
        descriptionKey: 'timeline_placed_desc',
        icon: 'receipt_long',
        isCompleted: true,
        isCurrent: s === 'pending',
        date: order.created_at || null,
      },
      {
        key: 'processing',
        titleKey: 'timeline_confirmed',
        descriptionKey: 'timeline_confirmed_desc',
        icon: 'inventory_2',
        isCompleted: s === 'processing' || s === 'shipping' || s === 'delivered',
        isCurrent: s === 'processing',
      },
      {
        key: 'shipping',
        titleKey: 'timeline_shipped',
        descriptionKey: 'timeline_shipped_desc',
        icon: 'local_shipping',
        isCompleted: s === 'shipping' || s === 'delivered',
        isCurrent: s === 'shipping',
      },
      {
        key: 'delivered',
        titleKey: isCancelled ? 'timeline_cancelled' : 'timeline_delivered',
        descriptionKey: isCancelled ? 'timeline_cancelled_desc' : 'timeline_delivered_desc',
        icon: isCancelled ? 'cancel' : 'home_pin',
        isCompleted: s === 'delivered',
        isCurrent: s === 'delivered' || isCancelled,
      },
    ];
  };

  const getProgressPercent = (order: OrderDto): number => {
    const s = (order.status || 'pending').trim().toLowerCase();
    if (s === 'delivered') return 100;
    if (s === 'shipping') return 66;
    if (s === 'processing') return 33;
    if (s === 'cancelled') return 100;
    return 10;
  };

  const printInvoice = (): void => {
    if (import.meta.client) {
      window.print();
    }
  };

  const getWhatsAppSupportLink = (order: OrderDto): string => {
    const orderNum = order.order_num || order.id;
    const message = encodeURIComponent(
      `مرحباً وايت ديكور، أود الاستفسار بخصوص الطلب رقم #${orderNum}`,
    );
    return `https://wa.me/201000933972?text=${message}`;
  };

  return {
    buildTimelineSteps,
    getProgressPercent,
    printInvoice,
    getWhatsAppSupportLink,
  };
};
