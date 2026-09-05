/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/messi',
  assetPrefix: '/messi/',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;