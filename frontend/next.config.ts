import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack root to this directory. Inferred, it walks up looking for
  // a lockfile, finds an unrelated one two levels above the git repo and warns
  // that it is ignoring it - and would otherwise resolve modules against that
  // tree's node_modules rather than this one.
  turbopack: {
    root: __dirname,
  },
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
