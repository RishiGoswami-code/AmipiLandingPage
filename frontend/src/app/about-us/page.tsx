import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Why Amipi? — AMIPI",
  description:
    "AMIPI Inc, established since 1976. Transparent fixed pricing, GIA standard grading, actual weights and the No Bull philosophy.",
};

const SERIF = "font-[family-name:var(--font-cormorant)]";
const KICKER = "text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase";

/** The six "Amipi Way" values. Each icon file is a sprite from amipi.com: the
 *  navy mark on top, the gold one below it, swapped on hover. */
const AMIPI_WAY = [
  {
    icon: "way",
    title: "It is the Amipi way.",
    body: "It is what we strive to achieve every day, in every interaction- with our customers, suppliers & team members.",
  },
  {
    icon: "price",
    title: "Transparent fixed pricing",
    body: "No need to haggle or negotiate.",
  },
  {
    icon: "sorry",
    title: "We know how to say sorry",
    body: "When we make mistakes (and we all do), we are never too big to apologize and admit we made a mistake.",
  },
  {
    icon: "like",
    title: "We say it like it is",
    body: "Accurate representation of products. No surprise grading and actual weights declared on our jewelry.",
  },
  {
    icon: "file",
    title: "Clear terms & conditions",
    body: "Explained orally, electronically, and in writing.",
  },
  {
    icon: "bull",
    title: "Bull",
    body: "We don't give it and we don't accept it. We strive to treat all our partners with respect and expect no less from them.",
  },
];

const NO_BULL_EXPERIENCE = [
  {
    title: "GIA Standard Grading",
    body: "All internally graded merchandise is based on GIA standards to ensure no surprise grading. No Bull about that.",
  },
  {
    title: "Stock Balancing",
    body: "BUY WITH CONFIDENCE! Exchange unsold, intact jewelry anytime - dollar for dollar. Obviously, does not apply to made to order jewelry.",
  },
  {
    title: "Actual Weights",
    body: "Rest assured, you'll know exactly what you're buying. NO “Rounding Off”, NO “Weight Ranges”.",
  },
  {
    title: "Laser Inscribed",
    body: "Most jewelry item, including studs over 1/4ct tw are inscribed with a unique serial number. Track each items without any worries.",
  },
];

function WayItem({ icon, title, body }: (typeof AMIPI_WAY)[number]) {
  return (
    <div className="group flex gap-5">
      <span
        aria-hidden
        className="h-11 w-14 shrink-0 self-start bg-[length:100%_auto] bg-top bg-no-repeat transition-[background-position] duration-300 group-hover:bg-bottom"
        style={{ backgroundImage: `url(/about-us/${icon}.png)` }}
      />
      <div>
        <h3 className="text-xs font-semibold tracking-[0.15em] text-foreground uppercase">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">{body}</p>
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <div className="bg-background">
      {/* Intro + banner */}
      <section className="px-6 pt-32 sm:px-12 sm:pt-36 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <p className={KICKER}>About Us</p>
          <h1 className={`${SERIF} mt-3 text-4xl font-normal tracking-tight text-foreground sm:text-6xl`}>
            Why Amipi?
          </h1>
          <div className="relative mt-10 overflow-hidden rounded-2xl">
            <Image
              src="/about-us/amipi-bg.jpg"
              alt="Working on a laptop showing the AMIPI No Bull logo"
              width={1328}
              height={270}
              priority
              className="h-48 w-full object-cover object-left sm:h-64"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-navy-950/40 to-navy-950/85" />
            <p
              className={`${SERIF} absolute inset-y-0 right-6 flex items-center text-right text-2xl text-ice-100 sm:right-12 sm:text-4xl`}
            >
              AMIPI Inc, established
              <br />
              since 1976.
            </p>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className={KICKER}>Mission Statement</p>
          <p className={`${SERIF} mt-5 text-2xl leading-snug text-foreground sm:text-3xl`}>
            Amipi exists to provide mutually profitable solutions to our customer&rsquo;s problems in
            an ever changing and ever challenging industry. We are not sales people. Instead, we aim
            to be your diamond concierge - here to assist in making your business life stress-free
            and more profitable.
          </p>
        </div>
      </section>

      {/* The Amipi Way: three values either side of the No Bull roundel */}
      <section className="bg-surface px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-10 lg:order-1">
            {AMIPI_WAY.slice(0, 3).map((item) => (
              <WayItem key={item.icon} {...item} />
            ))}
          </div>
          <Image
            src="/about-us/nobull-circle.png"
            alt="Experience the No Bull Philosophy"
            width={516}
            height={477}
            className="mx-auto w-64 sm:w-80 lg:order-2"
          />
          <div className="space-y-10 lg:order-3">
            {AMIPI_WAY.slice(3).map((item) => (
              <WayItem key={item.icon} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* No Bull Jewelry Experience */}
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
            {NO_BULL_EXPERIENCE.map(({ title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <span className="block h-px w-8 bg-gold-500" />
                <h3 className="mt-5 text-xs font-semibold tracking-[0.15em] text-gold-500 uppercase">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ice-100/80">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible Jewellery Council */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-8 text-[15px] leading-relaxed text-foreground/75 sm:p-10">
          <p>
            AMIPI Inc. has adopted the RJC policies and procedures that documents its commitment to
            responsible business practices of RJC COP&rsquo;s. The commitment to RJC includes
            policies on sourcing and human rights.
          </p>
          <p className="mt-4">
            All RJC policies and corresponding due diligence are available on request. E-mail
            request for the policy document/due diligence and any grievances related to sourcing
            policies can be sent to{" "}
            <a
              href="mailto:compliance@amipi.com"
              className="text-[#a47a35] underline underline-offset-2"
            >
              compliance@amipi.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
