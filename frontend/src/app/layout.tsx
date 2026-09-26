import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { HideOnRoutes } from "@/components/nav/HideOnRoutes";
import { PartnerMarquee } from "@/components/nav/PartnerMarquee";
import { AssistantButtonFixed } from "@/components/ui/AssistantButtonFixed";
// Every face the site uses is declared in one place - see the note in
// styles/fonts.ts on why a font loader must not be called twice for the
// same family.
import { cormorant, geistMono, manrope } from "@/styles/fonts";

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
      className={`${manrope.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <SmoothScroll>
          {children}
          {/* About is a single full-screen section with no footer beneath it */}
          <HideOnRoutes routes={["/about"]}>
            <PartnerMarquee />
            <Footer />
          </HideOnRoutes>
        </SmoothScroll>
        {/* AI assistant launcher + chat drawer - persists across all scroll depths */}
        <AssistantButtonFixed />
      </body>
    </html>
  );
}
