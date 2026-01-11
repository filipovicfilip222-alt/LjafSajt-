/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Optimize image loading
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce bundle size by not including source maps in production
  productionBrowserSourceMaps: false,
  // Enable compression
  compress: true,
  // Power performance optimizations
  poweredByHeader: false,
};

export default nextConfig;

