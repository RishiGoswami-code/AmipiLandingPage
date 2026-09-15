import type { Metadata } from "next";
import { OurStory } from "@/components/about/OurStory";

export const metadata: Metadata = {
  title: "About Us — AMIPI",
  description:
    "Fifty years in New York's Diamond District - the story behind AMIPI's fixed pricing, honest grading, and no-bull standard.",
};

export default function AboutPage() {
  return (
    <div className="bg-navy-950">
      <OurStory />
    </div>
  );
}
