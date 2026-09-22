import type { Metadata } from "next";
import { Geist_Mono, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { BookingCardFixed } from "@/components/ui/BookingCardFixed";
import { CustomCursor } from "@/components/ui/CustomCursor";

// Manrope end to end - headings and body both - matching the reference
// (kora.framer.media) rather than pairing a serif display face with a
// separate UI sans. One variable family, weighted 300-800 for the range
// from body copy up to the hero.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// One-off serif, scoped to spots that explicitly ask for the editorial
// engagement-ring-site look (see NewArrivals) - the rest of the site stays
// Manrope end to end per the decision above.
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AMIPI — The Wholesale Diamond Hub",
  description:
    "Discover wholesale natural and lab-grown diamonds, fine jewelry, and transparent fixed pricing from AMIPI. Your diamond source, without the bull.",
  icons: {
    // The full lockup's tagline is illegible at favicon size, so the tab
    // icon crops down to just the "no bull" mark - see public/icon.png.
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
        {/* Always-visible fixed booking card — persists across all scroll depths */}
        <BookingCardFixed />
        <CustomCursor />
      </body>
    </html>
  );
}
