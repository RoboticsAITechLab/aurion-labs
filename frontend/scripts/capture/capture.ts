#!/usr/bin/env -S ts-node --esm
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import path from 'path';
import fs from 'fs';
import pLimit from 'p-limit';
import config from './config/default.ts';
import { ensureDir } from './utils/fs.ts';
import { prepareArtifactRoots } from './utils/cleanup.ts';
import { writeReport } from './utils/report.ts';

type Result = {
  page: string;
  viewport: string;
  path: string;
  success: boolean;
  error?: string;
  durationMs: number;
  consoleMessages: string[];
  failedRequests: string[];
};

async function waitForFonts(page: Page) {
  try {
    await page.evaluate(async () => {
      // @ts-ignore
      if (document['fonts'] && document['fonts'].ready) await document['fonts'].ready;
    });
  } catch (e) {
    // ignore
  }
}

async function disableAnimations(page: Page) {
  await page.addStyleTag({ content: `* { transition-duration: 0s !important; animation-duration: 0s !important; animation-delay: -0.0001s !important; }` });
}

async function smoothScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise((res) => {
      const total = document.body.scrollHeight;
      const step = Math.max(200, Math.floor(total / 10));
      let pos = 0;
      const id = setInterval(() => {
        pos += step;
        window.scrollTo({ top: pos, behavior: 'smooth' as ScrollBehavior });
        if (pos >= total) {
          clearInterval(id);
          setTimeout(res, 120);
        }
      }, 120);
    });
  });
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function safeName(urlPath: string) {
  return urlPath === '/' ? 'home' : urlPath.replace(/[^a-z0-9\-]/gi, '_').replace(/^_+/, '');
}

async function capturePage(browser: Browser, pagePath: string, viewportName: string, vp: any, outDir: string, retry = 0): Promise<Result> {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.deviceScaleFactor });
  const url = new URL(pagePath, config.baseUrl).toString();
  const start = Date.now();
  const consoleMessages: string[] = [];
  const failedRequests: string[] = [];

  page.on('console', (m) => {
    consoleMessages.push(`${m.type()}: ${m.text()}`);
  });
  page.on('requestfailed', (r) => {
    failedRequests.push(`${r.url()} -> ${r.failure()?.errorText || 'failed'}`);
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await waitForFonts(page);
    await disableAnimations(page);
    // ensure images lazy-load
    await smoothScroll(page);
    // extra wait for lazy content
    await page.waitForTimeout(config.waitAfterLoadMs || 800);

    // final stability: wait until no new network requests for 300ms
    await page.waitForLoadState('networkidle');

    const folder = path.join(outDir, viewportName);
    ensureDir(folder);

    const fileName = `${safeName(pagePath)}_${viewportName}_${timestamp()}.png`;
    const outPath = path.join(folder, fileName);

    // full page screenshot with high quality
    await page.screenshot({ path: outPath, fullPage: true, type: 'png' });

    await page.close();
    return { page: pagePath, viewport: viewportName, path: outPath, success: true, durationMs: Date.now() - start, consoleMessages, failedRequests };
  } catch (err: any) {
    await page.close();
    if (retry < config.retryCount) {
      return capturePage(browser, pagePath, viewportName, vp, outDir, retry + 1);
    }
    return { page: pagePath, viewport: viewportName, path: '', success: false, error: String(err?.message || err), durationMs: Date.now() - start, consoleMessages, failedRequests };
  }
}

function renderReport(results: Result[], outDir: string) {
  const ok = results.filter((r) => r.success).length;
  const fail = results.length - ok;
  const rows = results
    .map((r) => `
      <tr>
        <td>${r.page}</td>
        <td>${r.viewport}</td>
        <td>${r.success ? 'OK' : 'FAIL'}</td>
        <td>${(r.durationMs / 1000).toFixed(2)}s</td>
        <td>${r.path ? `<a href="${path.relative(outDir, r.path)}">${path.basename(r.path)}</a>` : ''}</td>
        <td>${r.consoleMessages.length}</td>
        <td>${r.failedRequests.length}</td>
        <td>${r.error || ''}</td>
      </tr>
    `)
    .join('\n');

  return `<!doctype html><html><head><meta charset="utf-8"><title>Capture Report</title><style>body{font-family:Inter,system-ui,Arial}table{width:100%;border-collapse:collapse}td,th{padding:8px;border:1px solid #eee}</style></head><body><h1>Capture Report</h1><p>Generated: ${new Date().toISOString()}</p><p>Success: ${ok} / ${results.length}</p><table><thead><tr><th>Page</th><th>Viewport</th><th>Status</th><th>Duration</th><th>File</th><th>Console</th><th>FailedReq</th><th>Error</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
}

async function main() {
  const argv = process.argv.slice(2);
  const modeArg = argv.find((a) => a.startsWith('--mode='));
  const mode = modeArg ? modeArg.split('=')[1] : process.env.CAPTURE_MODE || 'all';
  const audit = argv.includes('--audit');
  const viewportsArg = argv.find((a) => a.startsWith('--viewports='));
  const requestedViewports = (viewportsArg ? viewportsArg.split('=')[1] : process.env.CAPTURE_VIEWPORTS || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean) as Array<keyof typeof config.viewports>;
  const cleanupArg = argv.find((a) => a.startsWith('--cleanup='));
  const cleanupMode = cleanupArg ? cleanupArg.split('=')[1] : config.cleanupMode || 'none';

  if (cleanupMode === 'archive' || cleanupMode === 'clean') {
    prepareArtifactRoots({
      mode: cleanupMode,
      retentionDays: config.retentionDays || 30,
      screenshotsRoot: config.screenshotsRoot || config.outDir,
      reportsRoot: config.reportsRoot || path.join(config.outDir, 'reports'),
      lighthouseRoot: config.lighthouseRoot || path.join(config.outDir, 'lighthouse'),
      archiveRoot: config.archiveRoot || path.join(path.dirname(config.outDir), 'archive'),
    });
  }

  const screenshotsRoot = config.screenshotsRoot || config.outDir;
  const reportsRoot = config.reportsRoot || path.join(config.outDir, 'reports');
  const lighthouseRoot = config.lighthouseRoot || path.join(config.outDir, 'lighthouse');

  ensureDir(screenshotsRoot);
  ensureDir(reportsRoot);
  ensureDir(lighthouseRoot);

  const pages = config.pages;
  let viewports = Object.keys(config.viewports) as Array<keyof typeof config.viewports>;
  if (mode === 'desktop') viewports = ['desktop'];
  else if (mode === 'mobile') viewports = ['mobile'];
  else if (mode === 'tablet') viewports = ['tablet'];
  else if (mode === 'all') viewports = Object.keys(config.viewports) as any;

  if (requestedViewports.length > 0) {
    viewports = requestedViewports.filter((vp) => Boolean(config.viewports[vp]));
  }

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const limit = pLimit(config.concurrency || 2);
  const results: Result[] = [];

  for (const vpName of viewports) {
    const vp = config.viewports[vpName as keyof typeof config.viewports];
    // create folder
    ensureDir(path.join(screenshotsRoot, vpName));

    const tasks = pages.map((p) =>
      limit(() => capturePage(browser, p, vpName, vp, screenshotsRoot).then((r) => results.push(r)))
    );
    await Promise.all(tasks);
  }

  await browser.close();

  const reportHtml = renderReport(results, reportsRoot);
  const reportFile = writeReport(reportsRoot, reportHtml);
  console.log('Report written to', reportFile);

  // write summary JSON
  fs.writeFileSync(path.join(reportsRoot, `report-${Date.now()}.json`), JSON.stringify(results, null, 2));

  if (audit) {
    // Run Lighthouse audits for each page (desktop + mobile)
    try {
      const { runLighthouse } = await import('./lighthouse.ts');
      for (const p of pages) {
        await runLighthouse(new URL(p, config.baseUrl).toString(), lighthouseRoot);
      }
    } catch (e) {
      console.warn('Lighthouse audit failed to run:', e);
    }
  }

  const failedDir = path.join(reportsRoot, 'failed');
  ensureDir(failedDir);
  for (const r of results.filter((x) => !x.success)) {
    const metaFile = path.join(failedDir, `${safeName(r.page)}_${r.viewport}_${timestamp()}.json`);
    fs.writeFileSync(metaFile, JSON.stringify(r, null, 2));
  }

  const failedCount = results.filter((r) => !r.success).length;
  if (failedCount > 0) process.exitCode = 2;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
