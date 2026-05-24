#!/usr/bin/env node

const path = require("path");
const { chromium } = require("playwright");

const config = require("./config");
const { ensureDir, timestampForFileName, buildScreenshotFileName, writeJson } = require("./utils/fs");
const { mapWithConcurrency } = require("./utils/concurrency");
const { waitForStablePage, attachPageObservers, extractSeoMetadata, detectBrokenLinks } = require("./utils/page");
const { generateHtmlReport } = require("./utils/report");
const { runLighthouseAudit } = require("./utils/audit");

function parseArgs(argv) {
  const parsed = {
    mode: config.defaultMode,
    baseUrl: config.baseUrl,
    concurrency: config.defaultConcurrency,
    retries: config.maxRetries,
    audit: config.enableLighthouseAudit,
    links: config.enableBrokenLinkCheck,
    seo: config.enableSeoExtraction,
    report: config.enableHtmlReport,
    externalLinks: config.includeExternalLinkChecks,
  };

  for (const arg of argv) {
    if (arg.startsWith("--mode=")) parsed.mode = arg.split("=")[1] || parsed.mode;
    else if (arg.startsWith("--base-url=")) parsed.baseUrl = arg.split("=")[1] || parsed.baseUrl;
    else if (arg.startsWith("--concurrency=")) parsed.concurrency = Number(arg.split("=")[1] || parsed.concurrency);
    else if (arg.startsWith("--retries=")) parsed.retries = Number(arg.split("=")[1] || parsed.retries);
    else if (arg === "--audit") parsed.audit = true;
    else if (arg === "--no-audit") parsed.audit = false;
    else if (arg === "--no-links") parsed.links = false;
    else if (arg === "--no-seo") parsed.seo = false;
    else if (arg === "--no-report") parsed.report = false;
    else if (arg === "--external-links") parsed.externalLinks = true;
  }

  return parsed;
}

function selectViewports(mode) {
  if (mode === "desktop") return ["desktop"];
  if (mode === "mobile") return ["mobile"];
  if (mode === "tablet") return ["tablet"];
  return ["desktop", "tablet", "mobile"];
}

async function retry(operation, retries, label) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await operation(attempt);
    } catch (error) {
      lastError = error;
      const isFinalAttempt = attempt >= retries;
      const delayMs = Math.min(2500, 500 * Math.pow(2, attempt));
      console.warn(`[capture] ${label} attempt ${attempt + 1} failed: ${error.message}`);

      if (isFinalAttempt) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError;
}

async function captureViewport({ browser, route, viewportName, baseUrl, timestamp, options }) {
  const viewport = config.viewports[viewportName];
  const targetUrl = new URL(route.path, baseUrl).toString();
  const screenshotDir = path.join(config.outputRoot, viewportName);
  const screenshotFile = path.join(screenshotDir, buildScreenshotFileName(route.path, viewportName, timestamp));

  await ensureDir(screenshotDir);

  return retry(async () => {
    const context = await browser.newContext({
      viewport: {
        width: viewport.width,
        height: viewport.height,
      },
      deviceScaleFactor: viewport.deviceScaleFactor,
      isMobile: viewport.isMobile,
      hasTouch: viewport.hasTouch,
      baseURL: baseUrl,
      ignoreHTTPSErrors: true,
    });

    const page = await context.newPage();
    const logger = (message) => console.log(`[capture][${viewportName}][${route.path}] ${message}`);
    const observations = attachPageObservers(page, logger);

    try {
      logger(`navigating to ${targetUrl}`);
      await page.goto(targetUrl, {
        waitUntil: "domcontentloaded",
        timeout: config.navigationTimeoutMs,
      });

      await waitForStablePage(page, {
        timeoutMs: config.stabilityTimeoutMs,
        settleMs: 1000,
      });

      await page.screenshot({
        path: screenshotFile,
        fullPage: true,
        animations: "disabled",
        caret: "hide",
      });

      const seo = options.seo ? await extractSeoMetadata(page) : null;
      const brokenLinks = options.links ? await detectBrokenLinks(page, {
        baseUrl,
        includeExternal: options.externalLinks,
        timeoutMs: config.requestTimeoutMs,
      }) : null;

      logger(`saved ${screenshotFile}`);

      return {
        success: true,
        routePath: route.path,
        routeLabel: route.label,
        viewport: viewportName,
        url: targetUrl,
        screenshot: screenshotFile,
        seo,
        brokenLinks,
        consoleErrors: observations.consoleEvents.filter((entry) => entry.type === "error"),
        failedRequests: observations.failedRequests,
        pageErrors: observations.pageErrors,
        errors: [],
      };
    } catch (error) {
      logger(`failed ${error.message}`);

      return {
        success: false,
        routePath: route.path,
        routeLabel: route.label,
        viewport: viewportName,
        url: targetUrl,
        screenshot: null,
        seo: null,
        brokenLinks: null,
        consoleErrors: observations.consoleEvents.filter((entry) => entry.type === "error"),
        failedRequests: observations.failedRequests,
        pageErrors: observations.pageErrors,
        errors: [error.message],
      };
    } finally {
      await context.close();
    }
  }, options.retries, `${route.path} / ${viewportName}`);
}

async function captureRoute(browser, route, viewports, baseUrl, timestamp, options) {
  const viewportResults = [];
  const screenshots = {};

  for (const viewportName of viewports) {
    const result = await captureViewport({ browser, route, viewportName, baseUrl, timestamp, options });
    viewportResults.push(result);

    if (result.success && result.screenshot) {
      screenshots[viewportName] = result.screenshot;
    }
  }

  const desktopResult = viewportResults.find((entry) => entry.viewport === "desktop") || viewportResults[0];

  return {
    routePath: route.path,
    routeLabel: route.label,
    success: viewportResults.every((entry) => entry.success),
    screenshots,
    seo: desktopResult?.seo || null,
    brokenLinks: desktopResult?.brokenLinks || null,
    consoleErrors: viewportResults.flatMap((entry) => entry.consoleErrors || []),
    failedRequests: viewportResults.flatMap((entry) => entry.failedRequests || []),
    pageErrors: viewportResults.flatMap((entry) => entry.pageErrors || []),
    errors: viewportResults.flatMap((entry) => entry.errors || []),
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const timestamp = timestampForFileName();
  const selectedViewports = selectViewports(options.mode);
  const startedAt = new Date().toISOString();

  await ensureDir(config.outputRoot);
  await ensureDir(config.reportRoot);
  for (const viewportName of selectedViewports) {
    await ensureDir(path.join(config.outputRoot, viewportName));
  }

  console.log(`[capture] baseUrl=${options.baseUrl}`);
  console.log(`[capture] mode=${options.mode}`);
  console.log(`[capture] viewports=${selectedViewports.join(", ")}`);
  console.log(`[capture] concurrency=${options.concurrency}`);

  const browser = await chromium.launch({
    headless: true,
  });

  const routeResults = [];
  const auditResults = [];

  try {
    await mapWithConcurrency(config.routes, options.concurrency, async (route) => {
      console.log(`[capture] starting ${route.path}`);
      const captureResult = await captureRoute(browser, route, selectedViewports, options.baseUrl, timestamp, options);

      for (const viewportName of selectedViewports) {
        const viewportCapture = captureResult.screenshots[viewportName];
        routeResults.push({
          routePath: captureResult.routePath,
          routeLabel: captureResult.routeLabel,
          viewport: viewportName,
          success: Boolean(viewportCapture),
          screenshots: captureResult.screenshots,
          seo: captureResult.seo,
          brokenLinks: captureResult.brokenLinks,
          consoleErrors: captureResult.consoleErrors,
          failedRequests: captureResult.failedRequests,
          pageErrors: captureResult.pageErrors,
          errors: captureResult.errors,
        });
      }

      if (options.audit && selectedViewports.includes("desktop")) {
        const desktopUrl = new URL(route.path, options.baseUrl).toString();
        const auditFile = path.join(config.reportRoot, `${route.name}-lighthouse-${timestamp}.json`);
        const auditResult = await runLighthouseAudit(desktopUrl, {
          chromePath: chromium.executablePath(),
          outputFile: auditFile,
        });

        auditResults.push({
          routePath: route.path,
          routeLabel: route.label,
          ...auditResult,
        });

        if (!auditResult.skipped) {
          console.log(`[capture] lighthouse saved ${auditFile}`);
        } else {
          console.log(`[capture] lighthouse skipped for ${route.path}: ${auditResult.reason}`);
        }
      }
    });

    const finishedAt = new Date().toISOString();
    const summaryFile = path.join(config.reportRoot, `capture-summary-${timestamp}.json`);
    const reportFile = path.join(config.reportRoot, `capture-summary-${timestamp}.html`);

    const summary = {
      baseUrl: options.baseUrl,
      mode: options.mode,
      startedAt,
      finishedAt,
      selectedViewports,
      results: routeResults,
      auditResults,
    };

    await writeJson(summaryFile, summary);

    if (options.report) {
      await generateHtmlReport({
        outputFile: reportFile,
        startedAt,
        finishedAt,
        baseUrl: options.baseUrl,
        mode: options.mode,
        results: routeResults,
        auditResults,
      });
      console.log(`[capture] report saved ${reportFile}`);
    }

    console.log(`[capture] summary saved ${summaryFile}`);
    console.log(`[capture] completed ${routeResults.filter((entry) => entry.success).length}/${routeResults.length} captures`);

    const hasFailures = routeResults.some((entry) => !entry.success);
    if (hasFailures) {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("[capture] fatal error", error);
  process.exitCode = 1;
});