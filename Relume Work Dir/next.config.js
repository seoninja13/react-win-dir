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
  transpilePackages: ['gaxios', 'https-proxy-agent'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure fallback object exists
      if (!config.resolve.fallback) {
        config.resolve.fallback = {};
      }
      // Fallback for 'supports-color' on the client
      config.resolve.fallback['supports-color'] = false;

      // Alias debug directly to false on the client
      config.resolve.alias['debug'] = false;
      
      // Alias https-proxy-agent to false on the client, as it's Node.js specific
      config.resolve.alias['https-proxy-agent'] = false;
    }
    return config;
  },
};

module.exports = nextConfig;
