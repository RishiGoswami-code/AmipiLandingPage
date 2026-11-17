/**
 * Pages on the live amipi.com store that the home page links to. Each was
 * checked in a browser against amipi.com's own Fine Jewelry menu on
 * 18 November 2026: every address shows its own page (amipi.com serves its
 * homepage for an unknown path rather than a 404, so a typo here would fail
 * quietly). Products on these pages show after a trade login.
 *
 * The gift guide keeps its own copies (components/gift-guide) so the two
 * pages can change independently.
 */
const AMIPI = "https://www.amipi.com";

/** Fine Jewelry, on amipi.com's own default filters (metal 10, natural). */
export const AMIPI_FINE_JEWELRY = `${AMIPI}/basics/?category=&stonetype=&metal=10&origin=Earth`;

/** One page per line in amipi.com's Fine Jewelry menu. */
export const AMIPI_CATEGORY = {
  /** "Necklaces & Pendants" */
  necklaces: `${AMIPI}/necklaces/`,
  /** "Bracelets & Bangles" */
  bracelets: `${AMIPI}/bracelets/`,
  /** "Anniversary Bands" */
  bands: `${AMIPI}/bands/`,
  /** "Diamond Studs" */
  studs: `${AMIPI}/studs/`,
  /** "Hoops & Earrings" */
  earrings: `${AMIPI}/hoops/`,
  rings: `${AMIPI}/rings/`,
  /** "Flexi Bangles" */
  bangles: `${AMIPI}/flexi-bangles/`,
} as const;
