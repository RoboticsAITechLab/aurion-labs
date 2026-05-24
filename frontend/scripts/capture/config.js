const path = require("path");

const projectRoot = path.resolve(__dirname, "..", "..");
const captureRoot = __dirname;

const routes = [
  { path: "/", name: "home", label: "Home" },
  { path: "/services", name: "services", label: "Services" },
  { path: "/industries", name: "industries", label: "Industries" },
  { path: "/portfolio", name: "portfolio", label: "Portfolio" },
  { path: "/pricing", name: "pricing", label: "Pricing" },
  { path: "/about", name: "about", label: "About" },
  { path: "/contact", name: "contact", label: "Contact" },
];

const viewports = {
  desktop: {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
  tablet: {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: true,
  },
  mobile: {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  },
};

module.exports = {
  projectRoot,
  captureRoot,
  routes,
  viewports,
  baseUrl: process.env.CAPTURE_BASE_URL || process.env.BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000",
  outputRoot: path.join(captureRoot, "screenshots"),
  reportRoot: path.join(captureRoot, "reports"),
  defaultMode: "all",
  defaultConcurrency: Number(process.env.CAPTURE_CONCURRENCY || 2),
  navigationTimeoutMs: Number(process.env.CAPTURE_NAVIGATION_TIMEOUT_MS || 45000),
  stabilityTimeoutMs: Number(process.env.CAPTURE_STABILITY_TIMEOUT_MS || 25000),
  requestTimeoutMs: Number(process.env.CAPTURE_REQUEST_TIMEOUT_MS || 8000),
  maxRetries: Number(process.env.CAPTURE_RETRIES || 2),
  enableBrokenLinkCheck: process.env.CAPTURE_CHECK_LINKS !== "0",
  enableSeoExtraction: process.env.CAPTURE_EXTRACT_SEO !== "0",
  enableLighthouseAudit: process.env.CAPTURE_ENABLE_LIGHTHOUSE === "1",
  enableHtmlReport: process.env.CAPTURE_HTML_REPORT !== "0",
  includeExternalLinkChecks: process.env.CAPTURE_EXTERNAL_LINKS === "1",
};