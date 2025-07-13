import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Ensure proper handling of TypeScript files
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable standalone build for deployment
  output: 'standalone',
  // Optimize for production
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
