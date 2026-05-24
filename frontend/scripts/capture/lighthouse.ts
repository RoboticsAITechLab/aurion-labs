import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import path from 'path';
import fs from 'fs';

export async function runLighthouse(url: string, lighthouseRoot: string) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
  const options = { port: chrome.port, output: 'html' as const, onlyCategories: ['performance', 'accessibility', 'seo'] };
  const runnerResult = await lighthouse(url, options);
  if (!runnerResult) {
    throw new Error(`Lighthouse returned no result for ${url}`);
  }
  const reportHtml = runnerResult.report as string;
  const fileName = `lighthouse-${encodeURIComponent(url)}-${Date.now()}.html`.replace(/[\/\:?\*"<>|]/g, '_');
  if (!fs.existsSync(lighthouseRoot)) fs.mkdirSync(lighthouseRoot, { recursive: true });
  fs.writeFileSync(path.join(lighthouseRoot, fileName), reportHtml, 'utf8');
  try {
    await chrome.kill();
  } catch {
    // Chrome Launcher can fail to remove its temp directory on Windows.
  }
  return { url, score: runnerResult.lhr.categories.performance.score };
}

