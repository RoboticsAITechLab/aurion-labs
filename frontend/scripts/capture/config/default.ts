import type { CaptureConfig } from "../types.ts";
import path from "path";

const root = path.resolve(process.cwd());
const captureRoot = path.join(root, "scripts", "capture");

const screenshotsRoot = path.join(captureRoot, "screenshots");
const reportsRoot = path.join(captureRoot, "reports");
const lighthouseRoot = path.join(captureRoot, "lighthouse");
const archiveRoot = path.join(captureRoot, "archive");

const config: CaptureConfig & {
  captureRoot: string;
  screenshotsRoot: string;
  reportsRoot: string;
  lighthouseRoot: string;
  archiveRoot: string;
  retentionDays: number;
  cleanupMode: "archive" | "clean" | "none";
} = {
  baseUrl: process.env.CAPTURE_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  outDir: screenshotsRoot,
  captureRoot,
  screenshotsRoot,
  reportsRoot,
  lighthouseRoot,
  archiveRoot,
  retentionDays: Number(process.env.CAPTURE_RETENTION_DAYS || 30),
  cleanupMode: (process.env.CAPTURE_MODE as "archive" | "clean" | "none" | undefined) || "none",
  viewports: {
    desktop: { width: 1920, height: 1080, deviceScaleFactor: 2 },
    laptop: { width: 1440, height: 900, deviceScaleFactor: 2 },
    tablet: { width: 768, height: 1024, deviceScaleFactor: 2 },
    mobile: { width: 390, height: 844, deviceScaleFactor: 3 },
  },
  pages: ["/", "/services", "/industries", "/portfolio", "/pricing", "/about", "/contact"],
  concurrency: Number(process.env.CAPTURE_CONCURRENCY || 2),
  retryCount: Number(process.env.CAPTURE_RETRY || 2),
  waitAfterLoadMs: Number(process.env.CAPTURE_WAIT_MS || 800),
};

export default config;
