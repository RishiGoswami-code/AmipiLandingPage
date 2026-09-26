import Image from "next/image";

/** Partner, platform and trade-body logos, in the order amipi.com lists them.
 * Traced to SVG from amipi.com's footer PNGs; width/height are the source
 * files' own proportions, and `h` evens out their optical size in the row. */
const LOGOS = [
  { src: "/partners/polygon.svg", alt: "Polygon", width: 489, height: 150, h: "h-10" },
  { src: "/partners/thinkspace.svg", alt: "thinkspace", width: 455, height: 150, h: "h-10" },
  {
    src: "/partners/responsible-jewellery-council.svg",
    alt: "Responsible Jewellery Council",
    width: 428,
    height: 150,
    h: "h-12",
  },
  { src: "/partners/jbt.svg", alt: "JBT", width: 346, height: 150, h: "h-11" },
  { src: "/partners/gemfind.svg", alt: "GemFind Digital Solutions", width: 322, height: 150, h: "h-11" },
  {
    src: "/partners/virtual-diamond-boutique.svg",
    alt: "Virtual Diamond Boutique",
    width: 305,
    height: 150,
    h: "h-12",
  },
  { src: "/partners/punchmark.svg", alt: "Punchmark", width: 256, height: 150, h: "h-12" },
  { src: "/partners/ddc.svg", alt: "Diamond Dealers Club", width: 229, height: 150, h: "h-14" },
  { src: "/partners/rjo.svg", alt: "RJO", width: 214, height: 150, h: "h-14" },
  { src: "/partners/rapnet.svg", alt: "RapNet", width: 594, height: 150, h: "h-9" },
  {
    src: "/partners/ags-registered-supplier.svg",
    alt: "American Gem Society Registered Supplier",
    width: 200,
    height: 200,
    h: "h-16",
  },
];

/**
 * Endless logo strip above the footer, on warm brown, with the same soft
 * drop shadow as the partner row in amipi.com's footer.
 *
 * The list is rendered twice back to back and the track slides left by
 * exactly half its width, so the second copy lands where the first started
 * and the loop has no visible seam. Each logo carries its own right padding
 * (rather than the track using `gap`) so both halves are the same width.
 * Hover pauses it; reduced-motion users get a still, wrapping row instead.
 */
export function PartnerMarquee() {
  return (
    <section aria-label="Our partners and memberships" className="overflow-hidden bg-[#3a2a1c] py-8">
      <div className="partner-marquee flex w-max items-center hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className={`flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center ${
              copy === 1 ? "motion-reduce:hidden" : ""
            }`}
          >
            {LOGOS.map((logo) => (
              <li key={logo.src} className="shrink-0 px-8 sm:px-10">
                <Image
                  src={logo.src}
                  alt={copy === 1 ? "" : logo.alt}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  className={`${logo.h} w-auto drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)]`}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
