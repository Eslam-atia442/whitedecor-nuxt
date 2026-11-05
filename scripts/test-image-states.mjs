import { chromium } from 'playwright';
import path from 'path';

const outDir = '/Users/user/.gemini/antigravity/brain/968bb036-8f21-491b-9de4-cabf31fb9381/screenshots';

async function testImageStates() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1000, height: 700 },
    locale: 'ar-EG',
  });

  const page = await context.newPage();

  // Route interception to slow down image requests and induce a 404 error on one test image
  await page.route('**/storage/**', async (route) => {
    const url = route.request().url();
    if (url.includes('cat-vases.jpg')) {
      // Simulate slow loading
      await new Promise((resolve) => setTimeout(resolve, 3000));
      route.continue();
    } else if (url.includes('broken-test-image')) {
      route.abort('failed');
    } else {
      route.continue();
    }
  });

  await context.addCookies([
    { name: 'wd_app_promo_seen', value: '1', domain: 'localhost', path: '/' },
    { name: 'wd_splash_session', value: 'seen', domain: 'localhost', path: '/' },
  ]);

  console.log('Navigating and capturing shimmer loading state...');
  // Navigate and immediately take screenshot during network delay to capture shimmer
  page.goto('http://localhost:3000/?splash=0');
  await page.waitForTimeout(400);

  // Screenshot showing loading shimmers
  await page.screenshot({ path: path.join(outDir, 'shimmer_loading_state.png') });
  console.log('Saved shimmer_loading_state.png');

  // Now create an isolated error test in browser
  await page.waitForLoadState('networkidle');
  const hasErrorBox = await page.evaluate(() => {
    const card = document.querySelector('.product-card');
    if (!card) return false;
    // Inject a simulated error into an image element to verify fallback widget
    const img = card.querySelector('img');
    if (img) {
      img.dispatchEvent(new Event('error'));
      return true;
    }
    return false;
  });

  if (hasErrorBox) {
    await page.waitForTimeout(300);
    const firstCard = page.locator('.product-card').first();
    await firstCard.screenshot({ path: path.join(outDir, 'image_error_fallback_state.png') });
    console.log('Saved image_error_fallback_state.png');
  }

  await browser.close();
}

testImageStates().catch((err) => {
  console.error('Error state test error:', err);
  process.exit(1);
});
