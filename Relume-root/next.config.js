/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: ['d22po4pjz3o32e.cloudfront.net', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.windowworldla.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d22po4pjz3o32e.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
