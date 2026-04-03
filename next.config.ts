import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },

      new URL('https://res.cloudinary.com/dboof56wt/**'),
    ],
  },
};

export default nextConfig;
