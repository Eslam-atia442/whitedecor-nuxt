import { chromium } from 'playwright';
import path from 'path';

const outDir = '/Users/user/.gemini/antigravity/brain/968bb036-8f21-491b-9de4-cabf31fb9381/screenshots';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'ar-EG',
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/?splash=0 on Desktop...');
  await page.goto('http://localhost:3000/?splash=0', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Take a screenshot of the deals section (full width)
  const dealsSection = page.locator('section:has-text("الحَق العرض الآن")').first();
  if (await dealsSection.count() > 0) {
    await dealsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, 'deals_full_width_bg.png') });
    console.log('Saved deals_full_width_bg.png');
  }

  // 2. Take a screenshot of the brands section (centered with dividers)
  const brandsSection = page.locator('text=ماركات الديكور المميزة').locator('xpath=ancestor::div[contains(@class, "space-y-5")]');
  if (await brandsSection.count() > 0) {
    await brandsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await brandsSection.screenshot({ path: path.join(outDir, 'brands_centered_dividers.png') });
    console.log('Saved brands_centered_dividers.png');
  }

  // 3. Test Mouse Drag on Hero Slider
  console.log('Testing mouse drag on hero slider...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const heroSlider = page.locator('section:has(.cursor-grab)').first();
  const box = await heroSlider.boundingBox();
  if (box) {
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 180, startY, { steps: 10 });
    await page.mouse.up();
    console.log('Hero slider mouse drag executed successfully!');
    await page.waitForTimeout(1000);
  }

  // 4. Test Mouse Drag on Arrivals Scroller
  console.log('Testing mouse drag on arrivals scroller...');
  const arrivalsScroller = page.locator('div.grid.grid-flow-col[style*="overflow-x"]').first();
  if (await arrivalsScroller.count() > 0) {
    const scrollerBox = await arrivalsScroller.boundingBox();
    if (scrollerBox) {
      const initialScroll = await arrivalsScroller.evaluate((el) => el.scrollLeft);
      const sX = scrollerBox.x + scrollerBox.width / 2;
      const sY = scrollerBox.y + scrollerBox.height / 2;

      await page.mouse.move(sX, sY);
      await page.mouse.down();
      await page.mouse.move(sX - 250, sY, { steps: 15 });
      await page.mouse.up();

      const newScroll = await arrivalsScroller.evaluate((el) => el.scrollLeft);
      console.log(`Arrivals scroller scrollLeft changed: ${initialScroll} -> ${newScroll}`);
    }
  }

  // 5. Test Mouse Drag on Brands Marquee
  console.log('Testing mouse drag on brand scroller...');
  const brandScroller = page.locator('div[dir="ltr"].flex.overflow-x-auto').first();
  if (await brandScroller.count() > 0) {
    const bBox = await brandScroller.boundingBox();
    if (bBox) {
      const bInitialScroll = await brandScroller.evaluate((el) => el.scrollLeft);
      const bX = bBox.x + bBox.width / 2;
      const bY = bBox.y + bBox.height / 2;

      await page.mouse.move(bX, bY);
      await page.mouse.down();
      await page.mouse.move(bX - 250, bY, { steps: 15 });
      await page.mouse.up();

      const bNewScroll = await brandScroller.evaluate((el) => el.scrollLeft);
      console.log(`Brand scroller scrollLeft changed: ${bInitialScroll} -> ${bNewScroll}`);
    }
  }

  // 6. Full Desktop Page Screenshot
  await page.screenshot({ path: path.join(outDir, 'desktop_home_full_updated.png'), fullPage: true });
  console.log('Saved desktop_home_full_updated.png');

  await browser.close();
  console.log('All tests and screenshots completed successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

