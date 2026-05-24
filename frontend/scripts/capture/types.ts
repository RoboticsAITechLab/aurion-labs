export type ViewportName = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export interface CaptureConfig {
  baseUrl: string;
  outDir: string;
  captureRoot?: string;
  screenshotsRoot?: string;
  reportsRoot?: string;
  lighthouseRoot?: string;
  archiveRoot?: string;
  retentionDays?: number;
  cleanupMode?: "archive" | "clean" | "none";
  viewports: Record<ViewportName, { width: number; height: number; deviceScaleFactor: number }>;
  pages: string[];
  concurrency: number;
  retryCount: number;
  waitAfterLoadMs: number;
}
