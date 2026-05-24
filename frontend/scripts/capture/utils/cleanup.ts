import fs from 'fs';
import path from 'path';

export type CleanupMode = 'archive' | 'clean';

export interface CleanupRoots {
  screenshotsRoot: string;
  reportsRoot: string;
  lighthouseRoot: string;
  archiveRoot: string;
}

export interface CleanupOptions extends CleanupRoots {
  mode: CleanupMode;
  retentionDays: number;
}

const VIEWPORT_DIRS = new Set(['desktop', 'laptop', 'tablet', 'mobile']);
const SKIP_SCREENSHOT_DIRS = new Set(['baseline']);

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function timestampLabel() {
  const now = new Date();
  const iso = now.toISOString();
  const [datePart, timePart] = iso.split('T');
  return `${datePart}_${timePart.replace('Z', '').replace(/:/g, '-').replace(/\.(\d{3})$/, '-$1')}`;
}

function pruneOlderArchives(archiveRoot: string, retentionDays: number) {
  if (!fs.existsSync(archiveRoot)) return;

  const expiry = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  for (const entry of fs.readdirSync(archiveRoot)) {
    const entryPath = path.join(archiveRoot, entry);
    if (!fs.existsSync(entryPath) || !fs.statSync(entryPath).isDirectory()) continue;

    const stat = fs.statSync(entryPath);
    if (stat.mtimeMs < expiry) {
      fs.rmSync(entryPath, { recursive: true, force: true });
    }
  }
}

function moveChildren(sourceDir: string, destinationDir: string, shouldSkip?: (name: string) => boolean) {
  if (!fs.existsSync(sourceDir)) return;

  ensureDir(destinationDir);

  for (const name of fs.readdirSync(sourceDir)) {
    if (shouldSkip?.(name)) continue;

    const sourcePath = path.join(sourceDir, name);
    const targetPath = path.join(destinationDir, name);

    if (fs.existsSync(targetPath)) {
      fs.rmSync(targetPath, { recursive: true, force: true });
    }

    fs.renameSync(sourcePath, targetPath);
  }
}

function clearChildren(sourceDir: string, shouldSkip?: (name: string) => boolean) {
  if (!fs.existsSync(sourceDir)) return;

  for (const name of fs.readdirSync(sourceDir)) {
    if (shouldSkip?.(name)) continue;

    const entryPath = path.join(sourceDir, name);
    fs.rmSync(entryPath, { recursive: true, force: true });
  }
}

export function prepareArtifactRoots(options: CleanupOptions) {
  const timestamp = timestampLabel();

  ensureDir(options.screenshotsRoot);
  ensureDir(options.reportsRoot);
  ensureDir(options.lighthouseRoot);
  ensureDir(options.archiveRoot);

  if (options.mode === 'archive') {
    const archiveRunRoot = path.join(options.archiveRoot, timestamp);
    ensureDir(archiveRunRoot);

    moveChildren(options.screenshotsRoot, path.join(archiveRunRoot, 'screenshots'), (name) => SKIP_SCREENSHOT_DIRS.has(name));
    moveChildren(options.reportsRoot, path.join(archiveRunRoot, 'reports'));
    moveChildren(options.lighthouseRoot, path.join(archiveRunRoot, 'lighthouse'));

    pruneOlderArchives(options.archiveRoot, options.retentionDays);
  }

  if (options.mode === 'clean') {
    clearChildren(options.screenshotsRoot, (name) => SKIP_SCREENSHOT_DIRS.has(name));
    clearChildren(options.reportsRoot);
    clearChildren(options.lighthouseRoot);
    pruneOlderArchives(options.archiveRoot, options.retentionDays);
  }

  ensureDir(options.screenshotsRoot);
  ensureDir(options.reportsRoot);
  ensureDir(options.lighthouseRoot);
  ensureDir(options.archiveRoot);

  for (const viewport of VIEWPORT_DIRS) {
    ensureDir(path.join(options.screenshotsRoot, viewport));
  }

  ensureDir(path.join(options.screenshotsRoot, 'baseline'));
}