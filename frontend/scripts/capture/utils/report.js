const fs = require("fs/promises");
const path = require("path");

function scoreClass(score) {
  if (typeof score !== "number") return "unknown";
  if (score >= 0.9) return "good";
  if (score >= 0.75) return "warn";
  return "bad";
}

function renderScore(value) {
  if (typeof value !== "number") {
    return "n/a";
  }

  return `${Math.round(value * 100)}`;
}

function buildReportRows(results) {
  return results
    .map((entry) => {
      const errorCount = (entry.consoleErrors?.length || 0) + (entry.failedRequests?.length || 0) + (entry.pageErrors?.length || 0) + (entry.brokenLinks?.broken?.length || 0);
      const metadata = entry.seo || {};
      const screenshotLinks = Object.entries(entry.screenshots || {})
        .map(([viewName, filePath]) => `<a href="${path.basename(filePath)}" target="_blank" rel="noreferrer">${viewName}</a>`)
        .join(" | ");

      return `
        <tr>
          <td><strong>${entry.routeLabel}</strong><br /><span class="muted">${entry.routePath}</span></td>
          <td>${entry.viewport}</td>
          <td><span class="status ${entry.success ? "ok" : "fail"}">${entry.success ? "ok" : "failed"}</span></td>
          <td>${errorCount}</td>
          <td>${renderScore(entry.lighthouse?.categories?.performance?.score)}</td>
          <td>${metadata.title ? metadata.title : "n/a"}</td>
          <td>${screenshotLinks || "n/a"}</td>
        </tr>
      `;
    })
    .join("\n");
}

function renderLighthouseSummary(auditResults = []) {
  if (!auditResults.length) {
    return `<p class="muted">No Lighthouse audit results were captured.</p>`;
  }

  const rows = auditResults
    .map((entry) => {
      const scores = entry.categories || {};
      return `
        <div class="audit-card">
          <h3>${entry.routeLabel}</h3>
          <p class="muted">${entry.routePath}</p>
          <div class="score-grid">
            ${Object.entries(scores)
              .map(
                ([name, score]) => `
                  <div class="score ${scoreClass(score.score)}">
                    <span>${name}</span>
                    <strong>${renderScore(score.score)}</strong>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");

  return rows;
}

async function generateHtmlReport({ outputFile, startedAt, finishedAt, baseUrl, mode, results, auditResults }) {
  const html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Aurion Labs Capture Report</title>
      <style>
        :root { color-scheme: light; }
        body { font-family: Arial, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
        .shell { max-width: 1400px; margin: 0 auto; padding: 32px; }
        .hero { background: linear-gradient(135deg, #0f172a, #1d4ed8); color: white; border-radius: 24px; padding: 32px; }
        .stats { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin: 24px 0; }
        .stat { background: white; border-radius: 18px; padding: 18px; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08); }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08); }
        th, td { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; vertical-align: top; text-align: left; }
        th { background: #f1f5f9; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
        .muted { color: #64748b; }
        .status { display: inline-flex; align-items: center; border-radius: 999px; padding: 4px 10px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .status.ok { background: #dcfce7; color: #166534; }
        .status.fail { background: #fee2e2; color: #991b1b; }
        .audit-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
        .audit-card { background: white; border-radius: 18px; padding: 18px; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08); }
        .score-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
        .score { border-radius: 14px; padding: 12px; background: #f8fafc; display: flex; flex-direction: column; gap: 4px; }
        .score.good { background: #dcfce7; }
        .score.warn { background: #fef3c7; }
        .score.bad { background: #fee2e2; }
        .footer { margin-top: 24px; color: #64748b; font-size: 14px; }
        a { color: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="shell">
        <div class="hero">
          <p class="muted" style="color: rgba(255,255,255,.75); text-transform: uppercase; letter-spacing: .2em; margin: 0;">Aurion Labs</p>
          <h1 style="margin: 12px 0 8px; font-size: 40px; line-height: 1.05;">Playwright Capture Report</h1>
          <p style="margin: 0; max-width: 760px; font-size: 16px; line-height: 1.7; color: rgba(255,255,255,.85);">Automated screenshots, console diagnostics, failed request logs, broken-link checks, and optional Lighthouse audits.</p>
        </div>

        <div class="stats">
          <div class="stat"><div class="muted">Base URL</div><strong>${baseUrl}</strong></div>
          <div class="stat"><div class="muted">Mode</div><strong>${mode}</strong></div>
          <div class="stat"><div class="muted">Pages</div><strong>${new Set(results.map((item) => item.routePath)).size}</strong></div>
          <div class="stat"><div class="muted">Variants</div><strong>${results.length}</strong></div>
          <div class="stat"><div class="muted">Started</div><strong>${new Date(startedAt).toLocaleString()}</strong></div>
          <div class="stat"><div class="muted">Finished</div><strong>${new Date(finishedAt).toLocaleString()}</strong></div>
        </div>

        <h2>Capture Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>Viewport</th>
              <th>Status</th>
              <th>Issues</th>
              <th>Performance</th>
              <th>SEO Title</th>
              <th>Screenshots</th>
            </tr>
          </thead>
          <tbody>
            ${buildReportRows(results)}
          </tbody>
        </table>

        <h2 style="margin-top: 28px;">Lighthouse Audit</h2>
        <div class="audit-grid">
          ${renderLighthouseSummary(auditResults)}
        </div>

        <div class="footer">Generated by scripts/capture/capture.js</div>
      </div>
    </body>
  </html>`;

  await fs.writeFile(outputFile, html, "utf8");
}

module.exports = {
  generateHtmlReport,
};