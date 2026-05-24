import fs from 'fs';
import path from 'path';

export function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

export function cleanOldCaptures(dir: string, keepDays = 14) {
  if (!fs.existsSync(dir)) return;
  const expiry = Date.now() - keepDays * 24 * 60 * 60 * 1000;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.mtimeMs < expiry) {
      if (stat.isDirectory()) fs.rmSync(full, { recursive: true, force: true });
      else fs.unlinkSync(full);
    }
  }
}
