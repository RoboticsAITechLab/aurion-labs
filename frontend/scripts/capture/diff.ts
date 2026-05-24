#!/usr/bin/env -S ts-node --esm
import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import config from './config/default.ts';
import { ensureDir } from './utils/fs.ts';

function readPng(file: string) {
  return new Promise<PNG>((resolve, reject) => {
    const png = new PNG();
    fs.createReadStream(file).pipe(png as any).on('parsed', function (this: PNG) { resolve(this); }).on('error', reject);
  });
}

async function runDiff() {
  const base = path.join(config.screenshotsRoot || config.outDir, 'baseline');
  const current = config.screenshotsRoot || config.outDir;
  const diffDir = path.join(config.reportsRoot || path.join(config.outDir, 'reports'), 'diffs');
  ensureDir(diffDir);
  const results: any[] = [];

  for (const vp of Object.keys(config.viewports)) {
    const baseFolder = path.join(base, vp);
    const curFolder = path.join(current, vp);
    if (!fs.existsSync(baseFolder) || !fs.existsSync(curFolder)) continue;
    for (const f of fs.readdirSync(curFolder)) {
      if (!f.endsWith('.png')) continue;
      const baseFile = path.join(baseFolder, f);
      const curFile = path.join(curFolder, f);
      if (!fs.existsSync(baseFile)) {
        results.push({ file: f, viewport: vp, status: 'no-baseline' });
        continue;
      }
      const img1 = await readPng(baseFile);
      const img2 = await readPng(curFile);
      if (img1.width !== img2.width || img1.height !== img2.height) {
        results.push({ file: f, viewport: vp, status: 'size-mismatch' });
        continue;
      }
      const diff = new PNG({ width: img1.width, height: img1.height });
      const mismatches = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.12, includeAA: true });
      const out = path.join(diffDir, `${path.basename(f, '.png')}_${vp}_diff.png`);
      diff.pack().pipe(fs.createWriteStream(out));
      results.push({ file: f, viewport: vp, mismatches });
    }
  }
  const outJson = path.join(diffDir, `diff-${Date.now()}.json`);
  fs.writeFileSync(outJson, JSON.stringify(results, null, 2));
  console.log('Diff complete. Results:', outJson);
}

runDiff().catch((e) => { console.error(e); process.exit(1); });
