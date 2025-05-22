/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add Builder.io specific config to help with hydration
  compiler: {
    // Suppress specific hydration warnings that are known issues with Builder.io
    styledComponents: true,
  },
};

module.exports = nextConfig;
