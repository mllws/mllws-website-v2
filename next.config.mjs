/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.motherlanguagelovers.com",
      },
    ],
  },
};

export default nextConfig;
