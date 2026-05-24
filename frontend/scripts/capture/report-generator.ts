import fs from 'fs';
import path from 'path';

export function generateHtmlSummary(reportJsonPath: string) {
  const outDir = path.dirname(reportJsonPath);
  const raw = fs.readFileSync(reportJsonPath, 'utf8');
  const results = JSON.parse(raw);

  const rows = results
    .map((r: any) => `
      <tr>
        <td>${r.page}</td>
        <td>${r.viewport}</td>
        <td>${r.success ? 'OK' : 'FAIL'}</td>
        <td>${(r.durationMs / 1000).toFixed(2)}s</td>
        <td>${r.path ? `<a href="${path.relative(outDir, r.path)}">${path.basename(r.path)}</a>` : ''}</td>
        <td>${r.consoleMessages?.length || 0}</td>
        <td>${r.failedRequests?.length || 0}</td>
        <td>${r.error || ''}</td>
      </tr>
    `)
    .join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Capture Summary</title></head><body><h1>Capture Summary</h1><table border="1"><thead><tr><th>Page</th><th>Viewport</th><th>Status</th><th>Duration</th><th>File</th><th>Console</th><th>FailedReq</th><th>Error</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;

  const out = path.join(outDir, 'summary.html');
  fs.writeFileSync(out, html, 'utf8');
  return out;
}
