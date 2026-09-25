import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  type BrandIcon,
} from "@/components/ui/BrandIcons";

/**
 * The navbar's contents, for both the desktop bar and the mobile overlay.
 *
 * One module rather than a list in each, for the reason styles/fonts.ts exists:
 * the two renderings are different components, and two copies of the same
 * nineteen links would drift apart the first time a label changed. Adding an
 * item should be an edit here and nowhere else.
 */

/**
 * Every destination in this file. The routes these want do not exist yet -
 * there are no per-category pages, and nothing has been built for Amipi Cares,
 * Testimonials, Registration, Make a Payment, Remote Assistance or Schedule
 * Appointment - so the whole menu is deliberately inert for this pass, which is
 * about the design.
 *
 * A named constant rather than a bare "#" at nineteen call sites so that
 * (a) the rows can suppress the navigation instead of jumping to the top of the
 * page and adding a history entry, and (b) `grep UNBUILT` lists exactly what is
 * still owed. Wiring one up later is replacing one string.
 */
export const UNBUILT = "#";

export const isUnbuilt = (href: string) => href === UNBUILT;

export type NavChild = {
  label: string;
  href: string;
  /** Thumbnail. Mega panel only; the plain lists have no images. */
  image?: string;
  /** Written per item, never derived from the label - see SHOP_CATEGORIES in
   *  ShopByCategory for the same note. Seven near-identical white-ground studio
   *  shots need to be told apart by description or not at all. */
  alt?: string;
};

export type NavGroup = {
  heading: string;
  children: NavChild[];
};

export type NavMenu =
  /** Full-bleed three-column panel with thumbnails. */
  | { kind: "mega"; groups: NavGroup[] }
  /** Compact panel, one link per row. */
  | { kind: "list"; children: NavChild[] }
  /** Phone, email and the four social marks. Contents live in CONTACT below
   *  rather than in the item, since the footer needs the same two values. */
  | { kind: "contact" };

/**
 * A top-level item is either a plain link or a dropdown trigger, never both.
 *
 * Expressed as a union on which key is present so that `item.menu` narrows:
 * a trigger has no href to navigate to (Contact Us in particular is a label
 * over a panel of destinations, not a destination), and Diamonds has no panel.
 * The alternative - both keys optional - would need a runtime guard at every
 * use and would let a nonsense item through the type checker.
 */
export type NavItem =
  | { label: string; href: string; menu?: undefined }
  | { label: string; href?: undefined; menu: NavMenu };

/**
 * Nine categories in three columns, matching the reference's grouping and
 * order. Thumbnails are the white-ground product shots from Amipi_ToMake,
 * converted to 256px WebP under /public/nav-jewelry (~3KB each).
 *
 * Seven photographs cover nine items: a preset certified stud and a certified
 * bracelet are the same pieces as the plain stud and bracelet, differing by the
 * paperwork that ships with them rather than by anything a camera can see, so
 * each reuses its sibling's image instead of inventing a distinction.
 */
const FINE_JEWELRY: NavGroup[] = [
  {
    heading: "Diamond Earrings",
    children: [
      {
        label: "Diamond Studs",
        href: UNBUILT,
        image: "/nav-jewelry/diamond-studs.webp",
        alt: "Four-prong martini-set round diamond stud earrings in white gold",
      },
      {
        label: "Hoops & Earrings",
        href: UNBUILT,
        image: "/nav-jewelry/hoop-earrings.webp",
        alt: "Pair of oval diamond inside-out hoop earrings in white gold",
      },
      {
        label: "Preset Certified Studs",
        href: UNBUILT,
        image: "/nav-jewelry/diamond-studs.webp",
        alt: "Certified round diamond studs, preset in white gold martini mounts",
      },
    ],
  },
  {
    heading: "Bracelets and Bangles",
    children: [
      {
        label: "Bracelets & Bangles",
        href: UNBUILT,
        image: "/nav-jewelry/tennis-bracelet.webp",
        alt: "Four-prong diamond tennis bracelet in platinum",
      },
      {
        label: "Flexi Bangles",
        href: UNBUILT,
        image: "/nav-jewelry/flexi-bangle.webp",
        alt: "Flexible diamond bangle in white gold",
      },
      {
        label: "Certified Bracelets",
        href: UNBUILT,
        image: "/nav-jewelry/tennis-bracelet.webp",
        alt: "Certified diamond tennis bracelet in platinum",
      },
    ],
  },
  {
    heading: "Bridal and Necklaces",
    children: [
      {
        label: "Anniversary Bands",
        href: UNBUILT,
        image: "/nav-jewelry/anniversary-band.webp",
        alt: "Diamond half-eternity anniversary band in white gold",
      },
      {
        label: "Rings",
        href: UNBUILT,
        image: "/nav-jewelry/halo-ring.webp",
        alt: "Round brilliant halo engagement ring with a pave band",
      },
      {
        label: "Necklaces & Pendants",
        href: UNBUILT,
        image: "/nav-jewelry/tennis-necklace.webp",
        alt: "Diamond tennis necklace in white gold",
      },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Diamonds", href: UNBUILT },
  { label: "Fine Jewelry", menu: { kind: "mega", groups: FINE_JEWELRY } },
  {
    label: "About Us",
    menu: {
      kind: "list",
      children: [
        { label: "Why Amipi?", href: UNBUILT },
        { label: "Amipi Cares", href: UNBUILT },
        { label: "Testimonials", href: UNBUILT },
      ],
    },
  },
  { label: "Contact Us", menu: { kind: "contact" } },
  {
    label: "More",
    menu: {
      kind: "list",
      children: [
        { label: "Registration", href: UNBUILT },
        { label: "Make a Payment", href: UNBUILT },
        { label: "Remote Assistance", href: UNBUILT },
        { label: "Schedule Appointment", href: UNBUILT },
      ],
    },
  },
];

/**
 * The Contact Us panel's contents.
 *
 * Phone and email are live - they are the same values the footer already
 * publishes, and tel:/mailto: work without a route existing. The four social
 * links are UNBUILT because nobody has handed over the account URLs yet; they
 * are the one thing here that needs real data rather than a new page.
 */
export const CONTACT = {
  phone: { label: "(800) 530-2647", href: "tel:+18005302647" },
  email: { label: "info@amipi.com", href: "mailto:info@amipi.com" },
  socials: [
    { label: "WhatsApp", href: UNBUILT, Icon: WhatsAppIcon as BrandIcon },
    { label: "Facebook", href: UNBUILT, Icon: FacebookIcon as BrandIcon },
    { label: "Instagram", href: UNBUILT, Icon: InstagramIcon as BrandIcon },
    { label: "LinkedIn", href: UNBUILT, Icon: LinkedInIcon as BrandIcon },
  ],
};
