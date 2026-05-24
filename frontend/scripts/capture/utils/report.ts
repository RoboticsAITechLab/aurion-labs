import fs from 'fs';
import path from 'path';

export function writeReport(reportRoot: string, reportHtml: string) {
  if (!fs.existsSync(reportRoot)) fs.mkdirSync(reportRoot, { recursive: true });
  const file = path.join(reportRoot, `report-${Date.now()}.html`);
  fs.writeFileSync(file, reportHtml, 'utf8');
  return file;
}
