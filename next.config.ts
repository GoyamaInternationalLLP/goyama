/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // For development; adjust for production if needed
    loader: "default", // Use default loader for local paths
  },
};

module.exports = nextConfig;
