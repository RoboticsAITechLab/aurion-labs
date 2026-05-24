const fs = require("fs/promises");

function slugify(value) {
  return String(value || "page")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "page";
}

function timestampForFileName(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-");
}

function buildScreenshotFileName(routePath, viewportName, timestamp) {
  const routeSegment = routePath === "/" ? "home" : routePath.replace(/^\//, "").replace(/\//g, "-");
  return `${slugify(routeSegment)}-${viewportName}-${timestamp}.png`;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
  return dirPath;
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

module.exports = {
  slugify,
  timestampForFileName,
  buildScreenshotFileName,
  ensureDir,
  writeJson,
};