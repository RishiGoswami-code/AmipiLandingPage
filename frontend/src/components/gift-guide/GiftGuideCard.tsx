import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";

type GiftGuideCardProps = {
  title: string;
  /** Omitted while the product photo is still to come - the card shows a
   * labelled placeholder in its place. */
  src?: string;
  /** Focal point the 4:5 crop keeps. */
  position?: string;
  href: string;
  /** `light` for the cream ground (navy type), `dark` for the gold and navy
   * bands (ivory type). */
  tone?: "light" | "dark";
  sizes?: string;
};

/**
 * A product or style card for the gift guide: a 4:5 photo with the title in
 * Cormorant Italic and a "Shop Now" line under it, rather than overlaid like
 * the Top Holiday Trends tiles. No zoom on hover - only the "Shop Now" line
 * answers it.
 */
export function GiftGuideCard({
  title,
  src,
  position = "50% 50%",
  href,
  tone = "light",
  sizes = "(min-width: 1024px) 18rem, 45vw",
}: GiftGuideCardProps) {
  const dark = tone === "dark";

  return (
    <Link href={href} className="group block">
      <div className={`relative aspect-[4/5] overflow-hidden rounded-xl ${dark ? "bg-white/10" : "bg-white"}`}>
        {src ? (
          <Image src={src} alt="" fill sizes={sizes} style={{ objectPosition: position }} className="object-cover" />
        ) : (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-3 border border-dashed ${
              dark ? "border-white/25 text-[#f5efe4]/60" : "border-[#141414]/15 bg-[#f3efe7] text-[#8a6630]"
            } rounded-xl`}
          >
            <Gem className="h-7 w-7" strokeWidth={1.25} />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Photo coming soon</span>
          </div>
        )}
      </div>
      <p
        className={`mt-4 font-[family-name:var(--font-cormorant-italic)] text-[clamp(1.375rem,2vw,1.75rem)] leading-tight font-medium italic ${
          dark ? "text-[#f5efe4]" : "text-[#0b1a3d]"
        }`}
      >
        {title}
      </p>
      <span
        className={`mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors ${
          dark ? "text-[#f5efe4]/75 group-hover:text-[#ecd3a0]" : "text-[#141414]/70 group-hover:text-[#8a6630]"
        }`}
      >
        Shop Now
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
