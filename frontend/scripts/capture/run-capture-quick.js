const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.CAPTURE_BASE_URL || 'http://localhost:3001';
const OUT = path.join(process.cwd(), 'scripts', 'capture', 'quick-screenshots');
const PAGES = ['/', '/services', '/industries', '/portfolio', '/pricing', '/about', '/contact'];
const VIEWPORT = { width: 1920, height: 1080, deviceScaleFactor: 2 };

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

(async () => {
  ensureDir(OUT);
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: VIEWPORT.width, height: VIEWPORT.height }, deviceScaleFactor: VIEWPORT.deviceScaleFactor });
  const page = await context.newPage();
  const results = [];
  for (const p of PAGES) {
    const url = new URL(p, BASE).toString();
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      const name = (p === '/' ? 'home' : p.replace(/[^a-z0-9]/gi, '_'));
      const outPath = path.join(OUT, `${name}_desktop_${Date.now()}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      results.push({ page: p, path: outPath, success: true });
      console.log('Captured', url, '->', outPath);
    } catch (e) {
      results.push({ page: p, error: String(e), success: false });
      console.error('Failed', url, e?.message || e);
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, `report-${Date.now()}.json`), JSON.stringify(results, null, 2));
  console.log('Quick capture complete. Output:', OUT);
})();
