const { URL } = require("url");

async function waitForStablePage(page, { timeoutMs, settleMs } = {}) {
  const maxTimeout = timeoutMs ?? 25000;
  const settleDelay = settleMs ?? 750;

  try {
    await page.waitForLoadState("domcontentloaded", { timeout: maxTimeout });
  } catch {
    // Some pages remain interactive before the load state resolves; we still continue.
  }

  try {
    await page.waitForLoadState("networkidle", { timeout: maxTimeout });
  } catch {
    // Fallback to a small settle window so late layout shifts have time to finish.
  }

  try {
    await page.waitForFunction(() => document.readyState === "complete" || document.readyState === "interactive", null, {
      timeout: Math.max(5000, Math.min(maxTimeout, 10000)),
    });
  } catch {
    // Ignore readiness probe failures and rely on the screenshot retry path.
  }

  await page.waitForTimeout(settleDelay);
}

function attachPageObservers(page, logger) {
  const consoleEvents = [];
  const failedRequests = [];
  const pageErrors = [];

  page.on("console", (message) => {
    const entry = {
      type: message.type(),
      text: message.text(),
    };

    consoleEvents.push(entry);

    if (message.type() === "error") {
      logger(`console:error ${message.text()}`);
    } else if (message.type() === "warning") {
      logger(`console:warn ${message.text()}`);
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
    logger(`pageerror ${error.message}`);
  });

  page.on("requestfailed", (request) => {
    const failure = request.failure();
    const entry = {
      url: request.url(),
      method: request.method(),
      failure: failure ? failure.errorText : "unknown",
    };

    failedRequests.push(entry);
    logger(`requestfailed ${entry.method} ${entry.url} :: ${entry.failure}`);
  });

  return {
    consoleEvents,
    failedRequests,
    pageErrors,
  };
}

async function extractSeoMetadata(page) {
  return page.evaluate(() => {
    const readMeta = (selector) => document.querySelector(selector)?.getAttribute("content") || null;
    const readLink = (selector) => document.querySelector(selector)?.getAttribute("href") || null;
    const h1Texts = Array.from(document.querySelectorAll("h1")).map((node) => node.textContent?.trim() || "").filter(Boolean);

    return {
      title: document.title || null,
      description: readMeta('meta[name="description"]'),
      canonical: readLink('link[rel="canonical"]'),
      robots: readMeta('meta[name="robots"]'),
      openGraph: {
        title: readMeta('meta[property="og:title"]'),
        description: readMeta('meta[property="og:description"]'),
        image: readMeta('meta[property="og:image"]'),
        type: readMeta('meta[property="og:type"]'),
      },
      twitter: {
        card: readMeta('meta[name="twitter:card"]'),
        title: readMeta('meta[name="twitter:title"]'),
        description: readMeta('meta[name="twitter:description"]'),
      },
      headingCount: h1Texts.length,
      h1Texts,
    };
  });
}

async function detectBrokenLinks(page, { baseUrl, includeExternal = false, timeoutMs = 8000 } = {}) {
  const discoveredLinks = await page.$$eval("a[href]", (anchors) =>
    anchors.map((anchor) => ({
      href: anchor.getAttribute("href"),
      text: (anchor.textContent || "").trim(),
    }))
  );

  const currentUrl = new URL(page.url());
  const baseOrigin = new URL(baseUrl).origin;
  const seen = new Set();
  const broken = [];
  const checked = [];

  for (const link of discoveredLinks) {
    if (!link.href || link.href.startsWith("javascript:") || link.href.startsWith("mailto:") || link.href.startsWith("tel:") || link.href.startsWith("#")) {
      continue;
    }

    let resolvedUrl;
    try {
      resolvedUrl = new URL(link.href, currentUrl);
    } catch {
      continue;
    }

    const isExternal = resolvedUrl.origin !== currentUrl.origin && resolvedUrl.origin !== baseOrigin;
    if (isExternal && !includeExternal) {
      continue;
    }

    const cacheKey = resolvedUrl.toString();
    if (seen.has(cacheKey)) {
      continue;
    }
    seen.add(cacheKey);

    checked.push(cacheKey);

    const result = await probeUrl(cacheKey, timeoutMs);
    if (!result.ok) {
      broken.push({
        url: cacheKey,
        status: result.status,
        reason: result.reason,
        text: link.text || null,
      });
    }
  }

  return {
    checkedCount: checked.length,
    broken,
  };
}

async function probeUrl(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headResponse = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });

    if (headResponse.ok) {
      return { ok: true, status: headResponse.status };
    }

    if (headResponse.status === 405 || headResponse.status === 501) {
      const getResponse = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });

      return {
        ok: getResponse.ok,
        status: getResponse.status,
        reason: getResponse.ok ? null : `HTTP ${getResponse.status}`,
      };
    }

    return {
      ok: false,
      status: headResponse.status,
      reason: `HTTP ${headResponse.status}`,
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      reason: error.name === "AbortError" ? "Request timed out" : error.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = {
  waitForStablePage,
  attachPageObservers,
  extractSeoMetadata,
  detectBrokenLinks,
};