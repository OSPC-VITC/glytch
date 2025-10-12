import type { NextConfig } from "next";
import path from "path";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(process.cwd(), ".."),
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "raw.githubusercontent.com",
    },
  ],
},
};

// Wrap with bundle analyzer
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
