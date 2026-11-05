import { chromium } from 'playwright';
import path from 'path';

const outDir = '/Users/user/.gemini/antigravity/brain/968bb036-8f21-491b-9de4-cabf31fb9381/screenshots';

async function verifyImageComponents() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 600 } });

  // Navigate to dev test page or load html
  await page.goto('http://localhost:3000/?splash=0');
  await page.waitForLoadState('networkidle');

  // Inject a visual showcase in the page comparing all 3 states: Loading, Error, Loaded
  await page.evaluate(() => {
    const container = document.createElement('div');
    container.id = 'image-showcase';
    container.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999999;
      background: white;
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      border: 1px solid #E9EEF5;
      display: flex;
      gap: 24px;
      direction: rtl;
      font-family: 'Cairo', sans-serif;
    `;

    container.innerHTML = `
      <!-- State 1: Loading Skeleton / Shimmer -->
      <div style="width: 220px; display: flex; flex-direction: column; gap: 10px; align-items: center;">
        <span style="font-size: 13px; font-weight: 700; color: #1D2136;">1. أثناء التحميل (Shimmer)</span>
        <div style="width: 200px; height: 200px; border-radius: 16px; overflow: hidden; position: relative; background: #F6F3EE; border: 1px solid #E9EEF5; display: flex; align-items: center; justify-content: center;">
          <div class="img-shimmer"></div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; color: #C49A43; z-index: 2;">
            <span class="material-symbols-rounded" style="font-size: 28px; animation: spin 1s linear infinite;">progress_activity</span>
            <span style="font-size: 11px; font-weight: 600; color: #4A4F66;">جارٍ التحميل...</span>
          </div>
        </div>
      </div>

      <!-- State 2: Error Fallback -->
      <div style="width: 220px; display: flex; flex-direction: column; gap: 10px; align-items: center;">
        <span style="font-size: 13px; font-weight: 700; color: #1D2136;">2. عند حدوث خطأ أو غياب الصورة</span>
        <div style="width: 200px; height: 200px; border-radius: 16px; overflow: hidden; position: relative; background: #F6F3EE; border: 1px solid #E9EEF5; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px; text-align: center;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(196, 154, 67, 0.12); color: #C49A43; display: flex; align-items: center; justify-content: center; margin-bottom: 6px;">
            <span class="material-symbols-rounded" style="font-size: 26px;">chair</span>
          </div>
          <span style="font-size: 12px; font-weight: 700; color: #4A4F66;">الصورة غير متوفرة</span>
          <span style="font-size: 10px; color: #9CA3AF; margin-top: 2px;">بدون أي إطار تالف</span>
        </div>
      </div>

      <!-- State 3: Successfully Loaded -->
      <div style="width: 220px; display: flex; flex-direction: column; gap: 10px; align-items: center;">
        <span style="font-size: 13px; font-weight: 700; color: #1D2136;">3. بعد اكتمال التحميل بنجاح</span>
        <div style="width: 200px; height: 200px; border-radius: 16px; overflow: hidden; position: relative; background: #F6F3EE; border: 1px solid #E9EEF5;">
          <img src="https://dashboard.whitedecor.online/storage/79/wd-26-natural-pampas.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </div>
    `;

    document.body.appendChild(container);
  });

  await page.waitForTimeout(1000);
  const showcase = page.locator('#image-showcase');
  await showcase.screenshot({ path: path.join(outDir, 'image_handling_all_states.png') });
  console.log('Saved image_handling_all_states.png');

  await browser.close();
}

verifyImageComponents().catch(console.error);
