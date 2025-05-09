/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    ],
  },
};

module.exports = nextConfig;
