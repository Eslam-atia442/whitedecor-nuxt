import { expect, test } from '@playwright/test';
import { notificationPath, notificationRequiresAuth } from '../app/utils/notification_path';

test('order uses order_num then model_id', () => {
  expect(notificationPath({ model_type: 'order', order_num: 'WD-100', model_id: '9' })).toBe(
    '/orders/WD-100',
  );
  expect(notificationPath({ model_type: 'Order', model_id: 42 })).toBe('/orders/42');
  expect(notificationRequiresAuth({ model_type: 'order', model_id: '1' })).toBe(true);
});

test('product uses slug then model_id', () => {
  expect(notificationPath({ model_type: 'product', slug: 'vase', model_id: '3' })).toBe(
    '/products/vase',
  );
  expect(notificationPath({ model_type: 'product', model_id: '8' })).toBe('/products/8');
  expect(notificationRequiresAuth({ model_type: 'product', model_id: '8' })).toBe(false);
});

test('coupon opens checkout', () => {
  expect(notificationPath({ model_type: 'coupon', model_id: '4' })).toBe('/checkout');
  expect(notificationRequiresAuth({ model_type: 'coupon' })).toBe(true);
});

test('unknown or empty payload falls back to inbox', () => {
  expect(notificationPath({})).toBe('/notifications');
  expect(notificationPath({ model_type: 'general' })).toBe('/notifications');
  expect(notificationPath({ model_type: 'order' })).toBe('/notifications');
});
