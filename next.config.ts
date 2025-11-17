import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    allowedDevOrigins: [
      "taliyah-subcommendatory-brittny.ngrok-free.dev",
      "localhost",
      "127.0.0.1",
      "192.168.1.196",
    ],
  },
};

export default nextConfig;
