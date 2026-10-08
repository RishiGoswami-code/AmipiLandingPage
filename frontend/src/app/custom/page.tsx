import type { Metadata } from "next";
import Image from "next/image";
import { Gem, HeartHandshake, Lightbulb, UserRound, type LucideIcon } from "lucide-react";
import { CustomDesignForm } from "@/components/custom/CustomDesignForm";
import { PillButton } from "@/components/ui/PillButton";

export const metadata: Metadata = {
  title: "Custom Design Studio — AMIPI",
  description:
    "Custom Design Studio by AMIPI Fine Jewels: one-of-a-kind jewelry made to your idea, in five steps from sketch to delivery. Send us your design to get started.",
  alternates: { canonical: "/custom" },
};

const SERIF = "font-[family-name:var(--font-cormorant)]";
const KICKER = "text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase";

/* Unsplash placeholder (a finished piece over its design sketches), like the
   site's other stand-in photography - swap for AMIPI's own workshop photo. */
const HERO_PHOTO =
  "https://images.unsplash.com/photo-1777126413547-10124c595c84?auto=format&fit=crop&w=1800&h=1000&q=75";

/** The five steps and four reasons, verbatim from amipi.com/custom. */
const STEPS = [
  {
    title: "Idea",
    body: "An heirloom piece re-imagined. A specially designed engagement ring. A creative logo. A symbol of your favorite style. An expression of your love. Every custom design begins with an idea. You dream it. We make it.",
  },
  {
    title: "Design",
    body: "From tangible sketches and 2-D designs that ensure aesthetic appearance, structural strength, endurance and budget compliance to 2-3 initial concepts curated based on your feedback, we walk you through it all.",
  },
  {
    title: "Creation",
    body: "A 3D CAD model of your design is crafted, providing digital rendering from all angles. The 3D concept is further transformed into an exact wax model replica.",
  },
  {
    title: "Manufacturing",
    body: "Your custom jewelry is then casted in the metal and gemstones of your choice.",
  },
  {
    title: "Delivery",
    body: "Your vision comes to life and a beautiful piece of jewelry is ready for you. One that is truly unique and truly by you.",
  },
];

const REASONS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: UserRound,
    title: "Personalization",
    body: "Custom-designed jewelry allows you to create a piece that reflects your unique style, personality, and preferences. It becomes a one-of-a-kind expression of your individuality.",
  },
  {
    icon: HeartHandshake,
    title: "Sentimental Value",
    body: "The ability to incorporate personal elements, such as heirloom stones or symbols, adds significant sentimental value to the jewelry. It becomes a meaningful and cherished keepsake.",
  },
  {
    icon: Lightbulb,
    title: "Unique Design",
    body: "Custom jewelry ensures that you own a design that is exclusive to you. You won't find identical pieces elsewhere, making it truly distinctive and special.",
  },
  {
    icon: Gem,
    title: "Long-Term Satisfaction",
    body: "Investing in custom-designed jewelry often leads to long-term satisfaction. Knowing that your piece is uniquely yours and crafted to your specifications enhances the joy of wearing it for years to come.",
  },
];

/**
 * amipi.com/custom in this site's own look. It keeps the site navbar; the
 * full footer is switched off for it in layout.tsx in favour of the one-line
 * contact strip at the bottom.
 */
export default function CustomDesignPage() {
  return (
    <div className="flex-1 bg-background pt-24 sm:pt-28">
      {/* Hero */}
      <section className="px-4 sm:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-navy-900 px-6 py-20 text-center sm:py-28">
          {/* The photo fills the card; the navy wash over it keeps the white
              and gold text readable whatever the photo is. */}
          <Image src={HERO_PHOTO} alt="" fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-navy-900/80" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/40" />
          <div className="relative">
            <p className="text-[11px] font-medium tracking-[0.3em] text-[#dfbf7b] uppercase">
              AMIPI Fine Jewels
            </p>
            <h1 className={`${SERIF} mt-4 text-5xl text-white italic sm:text-7xl`}>
              Custom Design Studio
            </h1>
            <span aria-hidden className="mx-auto mt-6 block h-px w-24 bg-[#d4ae5c]" />
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-ice-100/85 sm:text-base">
              Custom Design Studio by AMIPI FINE JEWELS is your personalized service that allows
              each one of you to create unique and one-of-a-kind jewelry tailored to your
              preferences.
            </p>
            <p className="mt-3 text-[15px] font-medium text-[#dfbf7b] sm:text-base">
              In 5 easy steps, you can see your vision come to life.
            </p>
            <div className="mt-9 flex justify-center">
              <PillButton href="#design-form" variant="gold" icon="arrow">
                Get started
              </PillButton>
            </div>
          </div>
        </div>
      </section>

      {/* Five steps */}
      <section className="px-6 pt-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${KICKER} text-center`}>From dream to design</p>
          <h2 className={`${SERIF} mt-3 text-center text-4xl tracking-tight text-foreground sm:text-5xl`}>
            Five easy steps
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-black/[0.07] bg-white p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 text-[13px] font-semibold text-[#dfbf7b]">
                  {i + 1}
                </span>
                <h3 className={`${SERIF} mt-4 text-2xl text-foreground`}>{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-foreground/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why custom jewelry */}
      <section className="px-6 pt-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <p className={`${KICKER} text-center`}>Made for you</p>
          <h2 className={`${SERIF} mt-3 text-center text-4xl tracking-tight text-foreground sm:text-5xl`}>
            Why Custom Jewelry?
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-900 text-[#dfbf7b]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className={`${SERIF} text-2xl text-foreground`}>{title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-foreground/70">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="design-form" className="scroll-mt-8 px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <p className={`${KICKER} text-center`}>Get started</p>
          <h2 className={`${SERIF} mt-3 text-center text-4xl tracking-tight text-foreground sm:text-5xl`}>
            Send us your design
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-foreground/70">
            Share a photo or sketch and a few details, and our team will be in touch.
          </p>
          <div className="mt-10">
            <CustomDesignForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-6 text-center text-[12.5px] text-foreground/55">
        AMIPI Inc. · 42 W 48th St, 15th Flr, New York, NY 10036 ·{" "}
        <a href="tel:+18005302647" className="hover:text-foreground">+1 (800) 530-2647</a> ·{" "}
        <a href="mailto:info@amipi.com" className="hover:text-foreground">info@amipi.com</a>
      </footer>
    </div>
  );
}
