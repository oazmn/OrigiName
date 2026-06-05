import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/OrigiName",
  images: { unoptimized: true },
  reactStrictMode: false,
  poweredByHeader: false,
};

export default nextConfig;
