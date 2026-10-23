import Link from "next/link";

/**
 * "Register Now" - a tab fixed to the right edge of the screen, low down, so
 * it stays in reach while the guide scrolls. Navy with a champagne label set
 * vertically, reading upwards, and a champagne edge; it fills champagne on
 * hover. Smaller on phones, where it sits over the banners' edge.
 *
 * Links to /register, the site's trade account sign-up.
 */
export function GiftGuideRegisterTab() {
  return (
    <Link
      href="/register"
      className="fixed right-0 bottom-[18svh] z-50 rounded-l-md border border-r-0 border-[#dfbf7b]/70 bg-[#0b1a3d] px-2 py-4 text-[11px] font-semibold tracking-[0.2em] text-[#ecd3a0] uppercase shadow-[0_10px_30px_-10px_rgba(5,12,30,0.6)] transition-colors [writing-mode:vertical-rl] hover:bg-[#dfbf7b] hover:text-[#0b1a3d] sm:px-2.5 sm:py-5 sm:text-[12px]"
    >
      {/* Rotated half a turn so the vertical label reads bottom to top */}
      <span className="block rotate-180">Register Now</span>
    </Link>
  );
}
