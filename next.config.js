/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },

  async rewrites() {
    return [
      { source: "/:path*", destination: `https://test-api.entizen.kr/:path*` },
    ];
  },
};

module.exports = nextConfig;
