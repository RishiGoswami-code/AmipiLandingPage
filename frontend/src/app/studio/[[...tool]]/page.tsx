/**
 * Sanity Studio at /studio. The site's navbar, footer and smooth scrolling
 * are switched off under this path (see layout.tsx and SmoothScroll).
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
