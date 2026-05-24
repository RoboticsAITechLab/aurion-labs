const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const BASE = process.env.CAPTURE_BASE_URL || 'http://localhost:3000';
const ROOT = process.cwd();
const OUT = path.join(ROOT, 'scripts', 'capture', 'screenshots');
const REPORTS = path.join(ROOT, 'scripts', 'capture', 'reports');

const DATE = new Date().toISOString().slice(0,10); // YYYY-MM-DD

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080, deviceScaleFactor: 2, formFactor: 'desktop' },
  laptop: { width: 1440, height: 900, deviceScaleFactor: 2, formFactor: 'desktop' },
  tablet: { width: 768, height: 1024, deviceScaleFactor: 2, formFactor: 'mobile' },
  mobile: { width: 390, height: 844, deviceScaleFactor: 3, formFactor: 'mobile' },
};

const PAGES = ['/', '/services', '/industries', '/portfolio', '/pricing', '/about', '/contact'];

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }
function safeName(p) { return p === '/' ? 'home' : p.replace(/[^a-z0-9]/gi,'_').replace(/^_+/,''); }

async function runLighthouse(url, outDir, formFactor) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
  const options = { port: chrome.port, output: 'html', onlyCategories: ['performance','accessibility','seo'], emulatedFormFactor: formFactor };
  const runnerResult = await lighthouse(url, options);
  const reportHtml = runnerResult.report;
  ensureDir(outDir);
  const fileName = `lighthouse-${formFactor}-${Date.now()}.html`;
  fs.writeFileSync(path.join(outDir, fileName), reportHtml);
  await chrome.kill();
}

(async () => {
  ensureDir(OUT);
  ensureDir(REPORTS);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const summary = [];

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const vpOut = path.join(OUT, vpName);
    const vpReport = path.join(REPORTS, vpName);
    ensureDir(vpOut);
    ensureDir(vpReport);

    const rows = [];
    for (const p of PAGES) {
      const url = new URL(p, BASE).toString();
      try {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        const start = Date.now();
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(800);
        // disable animations
        await page.addStyleTag({ content: `* { transition-duration: 0s !important; animation-duration: 0s !important; animation-delay: -0.0001s !important; }` });
        // smooth scroll
        await page.evaluate(async ()=>{await new Promise(res=>{const total=document.body.scrollHeight;const step=Math.max(200,Math.floor(total/10));let pos=0;const id=setInterval(()=>{pos+=step;window.scrollTo({top:pos,behavior:'smooth'}); if(pos>=total){clearInterval(id);setTimeout(res,120)}},120)})});
        await page.waitForTimeout(500);
        const name = safeName(p);
        const fileName = `${name}-${vpName}-${DATE}.png`;
        const outPath = path.join(vpOut, fileName);
        await page.screenshot({ path: outPath, fullPage: true });
        rows.push({ page: p, file: fileName, url, durationMs: Date.now() - start, success: true });
        console.log(`[${vpName}] Captured ${url} -> ${fileName}`);
      } catch (e) {
        rows.push({ page: p, file: '', url, success: false, error: String(e) });
        console.error(`[${vpName}] Failed ${url}:`, e?.message || e);
      }
    }

    // per-viewport HTML report
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Report - ${vpName}</title><style>body{font-family:Inter,system-ui,Arial}img{max-width:100%;height:auto;border:1px solid #ddd;margin:8px 0}table{width:100%;border-collapse:collapse}td,th{padding:8px;border:1px solid #eee}</style></head><body><h1>Viewport: ${vpName}</h1><p>Generated: ${new Date().toISOString()}</p><table><thead><tr><th>Page</th><th>Preview</th><th>File</th><th>Duration</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r.page}</td><td>${r.file?`<img src="../screenshots/${vpName}/${r.file}" style="max-width:360px">`:'-'} </td><td>${r.file? r.file : ''}</td><td>${r.durationMs? (r.durationMs/1000).toFixed(2)+'s':''}</td></tr>`).join('')}</tbody></table></body></html>`;
    fs.writeFileSync(path.join(vpReport, `report-${vpName}-${DATE}.html`), html);
    summary.push({ viewport: vpName, pages: rows, report: path.relative(REPORTS, path.join(vpReport, `report-${vpName}-${DATE}.html`)) });

    // run lighthouse per-viewport where possible
    try {
      console.log(`Running Lighthouse for ${vpName}...`);
      await runLighthouse(BASE, path.join(vpReport, 'lighthouse'), vp.formFactor);
    } catch (e) {
      console.warn('Lighthouse failed:', e?.message || e);
    }
  }

  // combined index report
  const indexHtml = `<!doctype html><html><head><meta charset="utf-8"><title>Capture Reports</title><style>body{font-family:Inter,system-ui,Arial}table{width:100%;border-collapse:collapse}td,th{padding:8px;border:1px solid #eee}</style></head><body><h1>Capture Reports</h1><p>Generated: ${new Date().toISOString()}</p><table><thead><tr><th>Viewport</th><th>Report</th><th>Pages</th></tr></thead><tbody>${summary.map(s=>`<tr><td>${s.viewport}</td><td><a href="${s.report}">Report</a></td><td>${s.pages.length}</td></tr>`).join('')}</tbody></table></body></html>`;
  fs.writeFileSync(path.join(REPORTS, `index-${DATE}.html`), indexHtml);

  await browser.close();
  console.log('Multi-viewport capture complete. Screenshots:', OUT, 'Reports:', REPORTS);
})();
