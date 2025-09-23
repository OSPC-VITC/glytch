import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  swcMinify: true,
  // If this project lives in a parent monorepo, ensure output tracing resolves
  outputFileTracingRoot: path.join(process.cwd(), ".."),
};

export default nextConfig;
