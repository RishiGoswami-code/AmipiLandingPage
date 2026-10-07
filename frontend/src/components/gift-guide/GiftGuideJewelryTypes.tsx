import Image from "next/image";
import styles from "./SnowGlobe.module.css";

/** Navy from the hero banner, used for the heading and labels. */
const NAVY = "#0b1a3d";

/**
 * AMIPI's product lines. Placeholder cut-outs made from the navbar's
 * white-background thumbnails (public/nav-jewelry) - to be replaced by proper
 * transparent product PNGs in public/gift-guide/types.
 */
const TYPES = [
  { label: "Diamond Studs", src: "/gift-guide/types/diamond-studs.webp" },
  { label: "Hoops", src: "/gift-guide/types/hoop-earrings.webp" },
  { label: "Tennis Bracelets", src: "/gift-guide/types/tennis-bracelet.webp" },
  { label: "Flexi Bangles", src: "/gift-guide/types/flexi-bangle.webp" },
  { label: "Bands", src: "/gift-guide/types/anniversary-band.webp" },
  { label: "Rings", src: "/gift-guide/types/halo-ring.webp" },
  { label: "Necklaces", src: "/gift-guide/types/tennis-necklace.webp" },
];

/** Gradient ids for the pines, defined once by <PineDefs> and shared by every globe. */
const PINE_FAR = "gift-guide-pine-far";
const PINE_NEAR = "gift-guide-pine-near";

/**
 * One tiered pine as an SVG path: three stacked triangles, narrow at the top,
 * standing on `base` in the globe scene's 100x60 viewBox.
 */
function pine(x: number, h: number, base = 60) {
  const w = h * 0.62;
  const top = base - h;
  const pt = (dx: number, dy: number) => `${(x + dx * w).toFixed(1)},${(top + dy * h).toFixed(1)}`;
  return `M${pt(0, 0)} L${pt(0.24, 0.3)} L${pt(0.11, 0.3)} L${pt(0.37, 0.62)} L${pt(0.19, 0.62)} L${pt(0.5, 0.95)} L${pt(-0.5, 0.95)} L${pt(-0.19, 0.62)} L${pt(-0.37, 0.62)} L${pt(-0.11, 0.3)} L${pt(-0.24, 0.3)} Z`;
}

/** Back row across the whole globe; front row at the sides only, so the
 * middle stays clear behind the piece. [x, height] in viewBox units. */
const FAR_PINES = [[6, 24], [17, 30], [28, 22], [39, 27], [50, 32], [61, 25], [72, 29], [83, 23], [94, 28]].map(([x, h]) => pine(x, h, 54)).join(" ");
const NEAR_PINES = [[4, 36], [15, 44], [27, 31], [73, 33], [85, 45], [96, 37]].map(([x, h]) => pine(x, h)).join(" ");

/**
 * The pines' gradients, rendered once for the whole row: snow-white at the
 * tips fading to frosted blue-grey, the back row paler for depth. A zero-size
 * SVG rather than display:none, which stops some browsers painting gradients.
 */
function PineDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <linearGradient id={PINE_FAR} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef3f8" />
          <stop offset="1" stopColor="#b2c2d4" />
        </linearGradient>
        <linearGradient id={PINE_NEAR} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9eff6" />
          <stop offset="0.5" stopColor="#a2b5ca" />
          <stop offset="1" stopColor="#7d94af" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * A snow globe drawn in CSS and SVG, after the classic clear-glass globe: pale
 * icy glass holding a soft snowy pine forest, the piece standing in front of
 * it, snow falling and settled at the bottom, on the page's navy-and-gold base.
 * The pines are blurred and kept pale so the jewelry stays the subject. Sized
 * off its own width (a size container, cqw units), so it scales as one object.
 */
function SnowGlobe({ src }: { src: string }) {
  return (
    <div aria-hidden className="@container relative aspect-[1/1.12] w-full">
      {/* Floor shadow */}
      <div className="absolute inset-x-[6%] bottom-[-3cqw] h-[8cqw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(11,26,61,0.28),transparent)]" />

      {/* Glass sphere: icy sky, brightest just above centre, cooling to a blue rim */}
      <div className="absolute top-0 left-[4%] aspect-square w-[92%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_32%,#f6f9fc_0%,#e2eaf3_40%,#c9d7e6_72%,#a9bfd6_100%)] shadow-[0_0_0_1px_rgba(95,125,165,0.35),inset_0_0_0_0.7cqw_rgba(255,255,255,0.55),inset_0_0_6cqw_rgba(105,135,175,0.45)]">
        <div className={`${styles.snow} ${styles.far}`} />

        {/* Soft snowy pines at the back of the globe */}
        <svg
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-[30%] h-[52%] w-full blur-[0.25cqw]"
        >
          <path d={FAR_PINES} fill={`url(#${PINE_FAR})`} />
          <path d={NEAR_PINES} fill={`url(#${PINE_NEAR})`} />
        </svg>

        {/* The piece, held a little above centre, clear of the snow drift */}
        <div className="absolute top-[18%] left-[20%] h-[56%] w-[60%]">
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 7rem, 10rem"
            className="object-contain drop-shadow-[0_1.5cqw_2.5cqw_rgba(20,40,80,0.4)]"
          />
        </div>

        {/* Settled snow */}
        <div className="absolute -inset-x-[6%] bottom-[-9%] h-[27%] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_25%,#ffffff_0%,#eef3f8_50%,#c6d3e2_100%)] shadow-[0_-1cqw_4cqw_rgba(255,255,255,0.6)]" />

        <div className={`${styles.snow} ${styles.near}`} />

        {/* Glass: a curved highlight top-left, a glint bottom-right, and a bright arc along the upper edge */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.2)_16%,transparent_32%),radial-gradient(circle_at_78%_82%,rgba(255,255,255,0.35)_0%,transparent_22%)]" />
        <div className="absolute inset-[3%] rounded-full border-t-[1.2cqw] border-l-[0.6cqw] border-white/70 [mask-image:linear-gradient(135deg,#000_0%,transparent_45%)]" />
      </div>

      {/* Base: gold collar, navy plinth, gold foot */}
      <div className="absolute inset-x-0 bottom-0 h-[30%]">
        <div className="absolute top-0 left-[15%] h-[12%] w-[70%] rounded-[1cqw] bg-[linear-gradient(90deg,#8a6630,#ecd3a0_40%,#c9a35c_65%,#6b4d22)]" />
        <div className="absolute inset-x-[2%] top-[11%] bottom-[12%] bg-[linear-gradient(90deg,#050d23_0%,#1c3166_32%,#2a4380_42%,#0b1a3d_70%,#040a1c_100%)] [clip-path:polygon(13%_0,87%_0,100%_100%,0_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[13%] rounded-[1cqw] bg-[linear-gradient(90deg,#6b4d22,#c9a35c_30%,#ecd3a0_45%,#b08a4a_70%,#6b4d22)]" />
      </div>
    </div>
  );
}

/**
 * "Shop by Jewelry Type" - Stuller's row of category roundels, with each
 * piece shown in a winter snow globe instead. All seven in one row on
 * desktop, three a row on tablets, two a row on phones.
 *
 * Visual only for now: the globes do not link anywhere.
 */
export function GiftGuideJewelryTypes() {
  return (
    <section aria-labelledby="types-heading" className="relative px-edge pb-24 lg:pb-32">
      <PineDefs />
      <h2
        id="types-heading"
        className="text-center font-[family-name:var(--font-cormorant-italic)] text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[1.1] font-medium italic"
        style={{ color: NAVY }}
      >
        Shop by Jewelry Type
      </h2>

      <ul className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:mt-14 lg:flex-nowrap lg:gap-x-6">
        {TYPES.map((type) => (
          <li
            key={type.label}
            className="flex w-[calc((100%-1.5rem)/2)] max-w-[11rem] flex-col items-center sm:w-[calc((100%-4rem)/3)] sm:max-w-[13rem] lg:w-auto lg:max-w-none lg:flex-1"
          >
            <SnowGlobe src={type.src} />
            <p className="mt-4 text-center text-[11px] font-semibold tracking-[0.16em] uppercase sm:mt-5 sm:text-xs sm:tracking-[0.22em]" style={{ color: NAVY }}>
              {type.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
