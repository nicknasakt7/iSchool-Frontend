import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },

      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dboof56wt/**',
      },
    ],
  },
};

export default nextConfig;
