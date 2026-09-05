/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/goat',
  assetPrefix: '/goat/',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;