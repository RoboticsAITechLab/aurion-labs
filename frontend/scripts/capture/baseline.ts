#!/usr/bin/env -S ts-node --esm
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import config from './config/default';
import { ensureDir } from './utils/fs';

const copyFile = promisify(fs.copyFile);

function baselineDir() {
  return path.join(config.outDir, 'baseline');
}

async function generate() {
  const src = config.outDir;
  const dest = baselineDir();
  ensureDir(dest);
  for (const vp of Object.keys(config.viewports)) {
    const folder = path.join(src, vp);
    const out = path.join(dest, vp);
    ensureDir(out);
    if (!fs.existsSync(folder)) continue;
    for (const f of fs.readdirSync(folder)) {
      if (f.endsWith('.png')) {
        await copyFile(path.join(folder, f), path.join(out, f));
      }
    }
  }
  console.log('Baseline generated at', dest);
}

async function compare() {
  const dest = baselineDir();
  if (!fs.existsSync(dest)) { console.error('No baseline found. Run --generate first.'); process.exit(1); }
  const current = config.outDir;
  // delegate to diff script via child process for robust compare
  const cmd = `ts-node --esm ${path.join(__dirname,'diff.ts')}`;
  console.log('Running visual diff...');
  const { exec } = require('child_process');
  exec(cmd, (err: any, stdout: string, stderr: string) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    console.log(stdout);
  });
}

async function approve() {
  const dest = baselineDir();
  const reports = path.join(config.outDir, 'reports');
  ensureDir(dest);
  // Accept current screenshots as baseline
  for (const vp of Object.keys(config.viewports)) {
    const folder = path.join(config.outDir, vp);
    const out = path.join(dest, vp);
    ensureDir(out);
    if (!fs.existsSync(folder)) continue;
    for (const f of fs.readdirSync(folder)) {
      if (f.endsWith('.png')) {
        fs.copyFileSync(path.join(folder, f), path.join(out, f));
      }
    }
  }
  console.log('Baseline approved from current captures.');
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--generate') || argv.includes('generate')) await generate();
  else if (argv.includes('--compare') || argv.includes('compare')) await compare();
  else if (argv.includes('--approve') || argv.includes('approve')) await approve();
  else {
    console.log('Usage: baseline.ts --generate|--compare|--approve');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
