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
  // Disable ESLint during build to avoid third-party library errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable standalone build for deployment
  output: 'standalone',
};

export default nextConfig;
