import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash-hosted placeholder photography for New Arrivals (see
    // NewArrivals.tsx) - freely licensed for this use, standing in until
    // real product photography exists.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
