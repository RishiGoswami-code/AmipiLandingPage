import type { Metadata } from "next";
import { CollectionsShowcase } from "@/components/collections/CollectionsShowcase";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";
import { PageHero } from "@/components/ui/PageHero";
import { PillButton } from "@/components/ui/PillButton";

export const metadata: Metadata = {
  title: "Our Collections — AMIPI",
  description:
    "Explore AMIPI's curated jewelry collections — Riviera, Aurora Bridal, Lab-Grown Brilliance, Heritage Vault and the Men's Signet Series.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-navy-900">
      <PageHero
        breadcrumb="Collections"
        kicker="Curated Edits"
        title={
          <>
            Collections Built <span className="text-gold-500">Around a Story</span>
          </>
        }
        description="Each edit is a point of view, not just a photo grid - lines of diamonds, bridal essentials, or the pieces men actually reach for every day."
      />
      <MarqueeStrip
        words={[
          "The Riviera Collection",
          "Aurora Bridal Edit",
          "Lab-Grown Brilliance",
          "The Heritage Vault",
          "Men's Signet Series",
        ]}
      />
      <CollectionsShowcase />

      <section className="relative bg-navy-950 px-6 py-20 text-center sm:px-12 sm:py-24 lg:px-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Private Viewings
          </p>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[0.02em] text-ice-100 uppercase sm:text-3xl">
            See Any Collection In Person
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ice-100/60">
            Book a private appointment and we&rsquo;ll pull pieces from any
            collection for you to see and compare side by side.
          </p>
          <div className="mt-8 flex justify-center">
            <PillButton href="#contact" variant="solid" icon="arrow">
              Book a Private Viewing
            </PillButton>
          </div>
        </div>
      </section>
    </div>
  );
}
