import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ... other configurations you might have ...

  images: {
    remotePatterns: [
      {
        protocol: 'https', // Or 'http' if applicable
        hostname: 'dev-strapi.futurebridge.com',
        port: '', // Add port number if needed, otherwise leave empty
        pathname: '/uploads/**', // Allow images from the /uploads/ path and its subdirectories
      },
      // Add other domains here if needed later
    ],
  },
  async redirects() {
    return [
      {
        source: '/', // The path to match
        destination: '/about', // The path to redirect to
        permanent: true, // Use true for permanent redirect (SEO friendly)
      },
      // You can add more redirects here if needed
    ];
  },
};

export default nextConfig;
