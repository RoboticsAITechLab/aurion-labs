async function runLighthouseAudit(url, { chromePath, outputFile, categories = ["performance", "accessibility", "best-practices", "seo"] } = {}) {
  let lighthouseModule;
  let chromeLauncherModule;

  try {
    lighthouseModule = await import("lighthouse");
    chromeLauncherModule = await import("chrome-launcher");
  } catch {
    return {
      skipped: true,
      reason: "Install lighthouse and chrome-launcher to enable audits.",
    };
  }

  const lighthouse = lighthouseModule.default || lighthouseModule;
  const chromeLauncher = chromeLauncherModule.default || chromeLauncherModule;

  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"],
  });

  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      onlyCategories: categories,
      logLevel: "info",
    });

    const report = result.report;
    if (outputFile) {
      const fs = require("fs/promises");
      await fs.writeFile(outputFile, typeof report === "string" ? report : JSON.stringify(report, null, 2), "utf8");
    }

    return {
      skipped: false,
      categories: result.lhr.categories,
      report,
    };
  } finally {
    await chrome.kill();
  }
}

module.exports = {
  runLighthouseAudit,
};