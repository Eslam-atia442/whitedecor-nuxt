import { expect, test } from '@playwright/test';

test('guest visiting /notifications is sent to login', async ({ page }) => {
  await page.goto('/notifications', { waitUntil: 'networkidle' });
  await expect(page).toHaveURL(/login/, { timeout: 15_000 });
  expect(page.url()).toMatch(/redirect=/);
});

test('guest visiting /en/notifications is sent to English login', async ({ page }) => {
  await page.goto('/en/notifications', { waitUntil: 'networkidle' });
  await expect(page).toHaveURL(/\/en\/login/, { timeout: 15_000 });
});
