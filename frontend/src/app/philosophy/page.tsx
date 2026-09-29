import type { Metadata } from "next";
import Image from "next/image";
import { PhilosophyPrinciples } from "@/components/philosophy/PhilosophyPrinciples";
import { PillButton } from "@/components/ui/PillButton";
import { NO_BULL_EXPERIENCE } from "@/content/noBull";

export const metadata: Metadata = {
  title: "Our Philosophy — AMIPI",
  description:
    "Experience the No Bull philosophy: transparent fixed pricing, no surprise grading, actual weights and clear terms.",
};

const SERIF = "font-[family-name:var(--font-cormorant)]";

export default function PhilosophyPage() {
  return (
    <div className="bg-background">
      <PhilosophyPrinciples />

      {/* The four No Bull promises on amipi.com's ring photograph */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-12 lg:px-20">
        <Image
          src="/about-us/nobulljewelback.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/85" />
        <div className="relative mx-auto max-w-6xl">
          <h2 className={`${SERIF} text-3xl text-ice-100 sm:text-5xl`}>
            About the No Bull Jewelry Experience
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {NO_BULL_EXPERIENCE.map(({ title, body }, i) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <span className="font-mono text-xs tracking-widest text-[#dfbf7b]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xs font-semibold tracking-[0.15em] text-[#dfbf7b] uppercase">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ice-100/80">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center sm:px-12">
        <div className="flex flex-wrap justify-center gap-3">
          <PillButton href="/about-us" variant="dark" size="sm" icon="arrow">
            Why Amipi?
          </PillButton>
          <PillButton href="/sell-your-diamonds" variant="gold" size="sm" icon="arrow">
            Sell Your Diamonds
          </PillButton>
        </div>
      </section>
    </div>
  );
}
