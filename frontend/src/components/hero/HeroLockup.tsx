import Image from "next/image";
import { HERO_COPY } from "./heroIntro";

/**
 * The hero's centre lockup: "Established 1976" to the left, the bull mark dead
 * centre, the AMIPI wordmark to the right, all on one horizontal centreline.
 *
 * Only the bull roundel appears here, not the full logo — the navbar keeps the
 * complete mark-plus-wordmark-plus-script lockup, so repeating it at centre
 * would say the same thing twice at two sizes.
 *
 * The wordmark is set as live text rather than cropped out of amipi-logo.png:
 * the reference treatment is typographic, and text stays crisp at any density,
 * reflows for the stacked mobile layout and remains selectable and indexable.
 *
 * Positioning lives in hero.css (.hero-est / .hero-mark / .hero-wordmark)
 * because it differs per breakpoint and because the -50% centring offsets have
 * to be written to the `translate` property, out of GSAP's way.
 */
export function HeroLockup() {
  return (
    <div className="hero-lockup pointer-events-none z-50">
      <p className="hero-est text-[10px] font-medium tracking-[0.42em] text-gold-100/90 uppercase md:text-xs">
        {HERO_COPY.established}
      </p>

      {/* The blur in beat 1 is animated on this wrapper's `filter`, so the
          drop shadow has to live on the image's own filter instead of being
          merged into the same declaration — otherwise GSAP's blur would
          replace the shadow outright. Nested filters both apply.

          icon2.png rather than icon.png: an embossed ivory-and-gold medallion
          instead of the flat cartoon roundel. The drop shadow matters more with
          this artwork than it did with the old one — a near-white medallion needs
          grounding against a light-toned backdrop.

          The opacity sits on the image rather than on .hero-mark for the same
          reason as the shadow: GSAP tweens the wrapper's opacity from 0 to 1
          during the entrance, so anything written there would be overwritten the
          moment that tween starts. At 0.8 the medallion settles into the
          photograph instead of sitting on top of it.

          Size is fluid rather than stepped, and clamped against the smaller of
          vw and svh so it shrinks on a landscape phone — where 8svh of a 390px
          viewport would otherwise leave a 72px medallion eating a fifth of the
          screen height. */}
      <div className="hero-mark">
        <Image
          src="/icon2.png"
          alt=""
          aria-hidden
          width={1254}
          height={1254}
          priority
          className="h-[clamp(2.75rem,min(8svh,14vw),4.5rem)] w-[clamp(2.75rem,min(8svh,14vw),4.5rem)] opacity-80 drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* The generous tracking leaves a trailing letter-space after the final
          letter, which makes a right-anchored word look like it stops short of
          its 80% mark. The negative margin pulls that phantom space back so the
          optical edge lands where the geometry says it should.

          Stays in the theme sans deliberately. Italiana is used for the navbar
          masthead, but at 10-12px inside a band of letterspaced small caps this
          word is a caption rather than a logo, and a high-contrast deco roman
          loses its hairlines at that size. */}
      <p className="hero-wordmark -mr-[0.5em] text-[10px] font-extrabold tracking-[0.5em] text-gold-100/90 uppercase md:text-xs">
        {HERO_COPY.wordmark}
      </p>
    </div>
  );
}
