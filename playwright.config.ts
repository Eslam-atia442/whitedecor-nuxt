import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'unit', testMatch: /notification-path\.spec\.ts/ },
    {
      name: 'chromium',
      testMatch: /notifications-guest\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.PW_SKIP_WEBSERVER
    ? undefined
    : {
        command: 'npm run dev -- --port 3000 --host 127.0.0.1',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
