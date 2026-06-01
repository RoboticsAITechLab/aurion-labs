import type { NextConfig } from "next";
import path from "path";

const rootDir = path.resolve(__dirname, "..");

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;


