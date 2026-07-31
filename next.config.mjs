const nextConfig = {
  reactStrictMode: true,

  async headers() {
    // Everything under /public is versioned by hand (filenames never change between
    // deploys), so these can be cached hard. Next already fingerprints /_next/static.
    return [
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
