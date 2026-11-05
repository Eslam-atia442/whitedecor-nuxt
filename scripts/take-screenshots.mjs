import { chromium } from 'playwright';
import path from 'path';

const outDir = '/Users/user/.gemini/antigravity/brain/968bb036-8f21-491b-9de4-cabf31fb9381/screenshots';

async function main() {
  const browser = await chromium.launch({ headless: true });

  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'ar-EG',
  });
  await desktopCtx.addCookies([
    { name: 'wd_splash_session', value: 'seen', domain: 'localhost', path: '/' },
    { name: 'wd_app_promo_seen', value: '1', domain: 'localhost', path: '/' },
  ]);

  const page = await desktopCtx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('wd_splash_seen', 'true');
    localStorage.setItem('wd_app_promo_seen', '1');
  });

  console.log('Navigating desktop...');
  await page.goto('http://localhost:3000/?splash=0', { waitUntil: 'commit', timeout: 20000 });
  
  // Wait for hero title to be visible
  try {
    await page.waitForSelector('h1', { timeout: 8000 });
  } catch {}
  await page.waitForTimeout(1500);

  // Close dialog if any
  try {
    const btn = await page.$('button[aria-label="Close dialog"], button:has-text("متابعة تصفح الموقع")');
    if (btn) await btn.click();
  } catch {}
  await page.waitForTimeout(500);

  // Capture desktop hero before scrolling
  await page.screenshot({ path: path.join(outDir, 'desktop_home_hero.png'), fullPage: false });
  console.log('Captured desktop_home_hero.png');

  // Trigger all scroll reveals
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    for (let pos = 400; pos < totalHeight; pos += 600) {
      window.scrollTo({ top: pos, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 150));
    }
    await new Promise(r => setTimeout(r, 500));
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: path.join(outDir, 'desktop_home_full.png'), fullPage: true });
  console.log('Captured desktop_home_full.png');

  // Mobile
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: 'ar-EG',
  });
  await mobileCtx.addCookies([
    { name: 'wd_splash_session', value: 'seen', domain: 'localhost', path: '/' },
    { name: 'wd_app_promo_seen', value: '1', domain: 'localhost', path: '/' },
  ]);
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.addInitScript(() => {
    localStorage.setItem('wd_splash_seen', 'true');
    localStorage.setItem('wd_app_promo_seen', '1');
  });

  console.log('Navigating mobile...');
  await mobilePage.goto('http://localhost:3000/?splash=0', { waitUntil: 'commit', timeout: 20000 });
  try {
    await mobilePage.waitForSelector('h1', { timeout: 8000 });
  } catch {}
  await mobilePage.waitForTimeout(1500);

  try {
    const btn = await mobilePage.$('button[aria-label="Close dialog"], button:has-text("متابعة تصفح الموقع")');
    if (btn) await btn.click();
  } catch {}
  await mobilePage.waitForTimeout(500);

  await mobilePage.screenshot({ path: path.join(outDir, 'mobile_home_top.png'), fullPage: false });
  console.log('Captured mobile_home_top.png');

  // Scroll mobile
  await mobilePage.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    for (let pos = 400; pos < totalHeight; pos += 600) {
      window.scrollTo({ top: pos, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 150));
    }
    await new Promise(r => setTimeout(r, 500));
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await mobilePage.waitForTimeout(1000);

  await mobilePage.screenshot({ path: path.join(outDir, 'mobile_home_full.png'), fullPage: true });
  console.log('Captured mobile_home_full.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
