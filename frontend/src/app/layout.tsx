import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/nav/Navbar";
import { BookingCardFixed } from "@/components/ui/BookingCardFixed";

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

export const metadata: Metadata = {
  title: "AMIPI — The Wholesale Diamond Hub",
  description:
    "Discover wholesale natural and lab-grown diamonds, fine jewelry, and transparent fixed pricing from AMIPI. Your diamond source, without the bull.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        {/* Always-visible fixed booking card — persists across all scroll depths */}
        <BookingCardFixed />
      </body>
    </html>
  );
}
