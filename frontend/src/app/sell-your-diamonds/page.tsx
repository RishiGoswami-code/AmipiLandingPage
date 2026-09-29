import type { Metadata } from "next";
import Image from "next/image";
import { SellForm } from "@/components/sell/SellForm";

export const metadata: Metadata = {
  title: "Sell Your Diamonds — AMIPI",
  description:
    "Sell your diamonds and jewelry to AMIPI: top dollar, prompt payment, and a quick, easy, no haggle No Bull experience.",
};

const SERIF = "font-[family-name:var(--font-cormorant)]";
const KICKER = "text-[11px] font-medium tracking-[0.3em] text-[#a47a35] uppercase";

/** Verbatim from amipi.com/sell. */
const STEPS = [
  {
    title: "Shop it around",
    body: "Shop it around to know your best COD price. We encourage this just to help build your confidence that you will likely fetch a better price with us.",
  },
  {
    title: "Offer us your final price",
    body: "Share the item details and final asking price on the next page. We will touch base with you shortly and email you a prepaid shipping label.",
  },
  {
    title: "Ship and get paid",
    body: "Once received and verified, we’ll pay you within 1 business day of receiving the items or return it equally fast.",
  },
];

export default function SellYourDiamondsPage() {
  return (
    <div className="bg-background">
      {/* Banner: amipi.com's diamond dollar sign, text over the dark right side */}
      <section className="px-6 pt-32 sm:px-12 sm:pt-36 lg:px-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#151b35]">
          <Image
            src="/sell/sell-your-diamond.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover object-left"
          />
          <div className="relative px-8 py-14 text-right sm:px-14 sm:py-20">
            <p className="text-[11px] font-medium tracking-[0.3em] text-[#dfbf7b] uppercase">
              Sell to AMIPI
            </p>
            <h1 className={`${SERIF} mt-3 text-4xl text-ice-100 sm:text-6xl`}>
              Top $$$, Prompt Payment
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 pt-16 sm:px-12 lg:px-20">
        <p className={`${SERIF} mx-auto max-w-3xl text-center text-2xl leading-snug text-foreground sm:text-3xl`}>
          Selling your diamonds and jewelry to AMIPI has become even simpler. Whether your are
          looking to divest from your inventory or assisting a customer sell their product, you can
          expect a quick, easy, no haggle No Bull experience.
        </p>
      </section>

      {/* Three steps */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_minmax(0,1.4fr)]">
          <div>
            <p className={KICKER}>How it works</p>
            <h2 className={`${SERIF} mt-3 text-3xl text-foreground sm:text-4xl`}>
              Shop it around to know the best COD price
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
              We encourage this to help build your confidence that will likely fetch you a better
              price with us.
            </p>
            <Image
              src="/sell/sell-diamond-1.png"
              alt="Sell Your Diamonds and Jewelry to AMIPI"
              width={377}
              height={251}
              className="mt-8 w-full max-w-sm mix-blend-multiply"
            />
          </div>
          <ol className="space-y-4">
            {STEPS.map(({ title, body }, i) => (
              <li
                key={title}
                className="flex gap-5 rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-900 font-mono text-sm text-[#dfbf7b]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] text-foreground uppercase">
                    {title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">{body}</p>
                </div>
              </li>
            ))}
            <li className="rounded-2xl bg-navy-900 p-6 text-[15px] leading-relaxed text-ice-100">
              We will <strong className="text-[#dfbf7b]">NOT</strong> counter your offer. We respect
              your time and believe our No Bull Pricing policy should work both ways.
            </li>
          </ol>
        </div>
      </section>

      {/* The form */}
      <section id="start-selling" className="scroll-mt-24 bg-surface px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className={`${SERIF} text-3xl text-foreground sm:text-5xl`}>Start Selling Now!</h2>
            <p className="mt-3 text-[15px] text-foreground/65">
              Don&rsquo;t worry, it&rsquo;s not complicated. We&rsquo;re here to help if you need it.
            </p>
          </div>
          <div className="mt-10">
            <SellForm />
          </div>
        </div>
      </section>

      {/* About AMIPI */}
      <section className="px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className={KICKER}>About AMIPI</p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/75">
            AMIPI is a top-rated diamond trading firm operating in New York since the mid 70&rsquo;s
            and is a member of JBT, RapNet, Polygon, Idex and Diamond Dealers Club (DDC). We would be
            happy to provide industry references should you feel the need. Just ask.
          </p>
        </div>
      </section>
    </div>
  );
}
