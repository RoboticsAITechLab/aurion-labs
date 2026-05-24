const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'scripts', 'capture', 'screenshots');
const BASE = path.join(OUT, 'baseline');
const DIFFS = path.join(OUT, 'diffs');

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }
function readPng(file) { return new Promise((res, rej) => fs.createReadStream(file).pipe(new PNG()).on('parsed', function(){ res(this)}).on('error', rej)); }

(async ()=>{
  ensureDir(DIFFS);
  const viewports = fs.readdirSync(OUT).filter(x=>fs.statSync(path.join(OUT,x)).isDirectory() && ['desktop','laptop','tablet','mobile'].includes(x));
  const results = [];
  for (const vp of viewports) {
    const baseFolder = path.join(BASE, vp);
    const curFolder = path.join(OUT, vp);
    const outFolder = path.join(DIFFS, vp);
    ensureDir(outFolder);
    if (!fs.existsSync(curFolder)) continue;
    const files = fs.readdirSync(curFolder).filter(f=>f.endsWith('.png'));
    for (const f of files) {
      const baseFile = path.join(baseFolder, f);
      const curFile = path.join(curFolder, f);
      if (!fs.existsSync(baseFile)) {
        results.push({viewport: vp, file: f, status: 'no-baseline'});
        continue;
      }
      const img1 = await readPng(baseFile);
      const img2 = await readPng(curFile);
      if (img1.width !== img2.width || img1.height !== img2.height) {
        results.push({viewport: vp, file: f, status: 'size-mismatch'});
        continue;
      }
      const diff = new PNG({width: img1.width, height: img1.height});
      const mismatches = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.12, includeAA: true });
      const out = path.join(outFolder, `${path.basename(f, '.png')}_${vp}_diff.png`);
      diff.pack().pipe(fs.createWriteStream(out));
      results.push({viewport: vp, file: f, mismatches, diff: path.relative(OUT, out)});
    }
  }
  const outJson = path.join(DIFFS, `diff-${Date.now()}.json`);
  fs.writeFileSync(outJson, JSON.stringify(results, null, 2));
  console.log('Diff complete. Results:', outJson);
})();
