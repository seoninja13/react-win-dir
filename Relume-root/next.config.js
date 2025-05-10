/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.windowsdoorsca.com",
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
