import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack root to this directory. Inferred, it walks up looking for
  // a lockfile, finds an unrelated one two levels above the git repo and warns
  // that it is ignoring it - and would otherwise resolve modules against that
  // tree's node_modules rather than this one.
  turbopack: {
    root: __dirname,
  },
  /* Addresses that must keep working once this site takes over amipi.com.
     Pages live at amipi.com's own paths (/contact-us, /sell, /register, ...),
     so most old links need nothing; these cover the rest. All permanent (308),
     so search engines move their listing to the destination. */
  async redirects() {
    return [
      // amipi.com variants of pages this site has
      { source: "/sell.php", destination: "/sell", permanent: true },
      { source: "/schedule-appointment", destination: "/meet", permanent: true },
      // Paths this site used before it matched amipi.com's
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/sell-your-diamonds", destination: "/sell", permanent: true },
      { source: "/create-account", destination: "/register", permanent: true },
    ];
  },
  images: {
    // Unsplash-hosted placeholder photography for New Arrivals (see
    // NewArrivals.tsx) - freely licensed for this use, standing in until
    // real product photography exists.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Journal post images uploaded in the Sanity Studio.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
