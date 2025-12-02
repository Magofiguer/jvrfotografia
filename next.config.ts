import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "16mb", // súbelo más si hace falta: "32mb", etc.
    },
  },
};

export default nextConfig;