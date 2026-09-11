import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import HeroStage from "@/components/hero/HeroStage";
import { DiamondSearch } from "@/components/home/DiamondSearch";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PillButton } from "@/components/ui/PillButton";

const CATEGORIES = [
  { name: "Diamond Studs & Hoops", spec: "Natural & Lab-Grown" },
  { name: "Tennis Bracelets", spec: "18k White & Yellow Gold" },
  { name: "Necklaces & Pendants", spec: "Solitaire to Riviera" },
  { name: "Rings & Bands", spec: "Bridal & Anniversary" },
];

const PHILOSOPHY = [
  {
    title: "It Is The Amipi Way",
    body: "Excellence in every interaction, from the first call to the final shipment.",
  },
  {
    title: "We Say It Like It Is",
    body: "Accurate grading and honest descriptions. What you see is exactly what you get.",
  },
  {
    title: "Transparent Fixed Pricing",
    body: "One fair, clearly marked price on every piece. No haggling, no back-room negotiating.",
  },
  {
    title: "Clear Terms & Conditions",
    body: "Every policy explained in plain language before you buy - never buried in fine print.",
  },
  {
    title: "We Know How To Say Sorry",
    body: "Mistakes happen. We own them, fix them fast, and make it right.",
  },
  {
    title: "No Bull",
    body: "We simply refuse to do business the dishonest way. Full stop.",
  },
];

const SELLING_STEPS = [
  {
    step: "01",
    title: "Get Your Price",
    body: "Shop around - we will quote a fair, final number on your diamond or jewelry piece.",
  },
  {
    step: "02",
    title: "Send The Details",
    body: "Confirm your price with item details and photos. No obligation to sell.",
  },
  {
    step: "03",
    title: "Ship & Get Paid",
    body: "Prepaid, insured shipping. Funds out within one business day of receipt.",
  },
];

const TRADE_SHOWS = [
  {
    name: "RJO Liberty Tour",
    dates: "Sept 29 - Oct 2, 2026",
    location: "42 W 48th St, 15th Floor, New York, NY",
  },
  {
    name: "JIS Miami",
    dates: "Oct 16 - 19, 2026",
    location: "Booth #1335, Miami Beach Convention Center",
  },
];

export default function Home() {
  // The wrapper below is deliberately NOT a flex column. ScrollTrigger pins
  // the hero by wrapping it in a spacer and padding that spacer out to the
  // length of the sequence - but a flex child gets an explicit height instead,
  // and border-box then swallows the padding, so the spacer never grows. The
  // page ends up offering ~500px of scroll for a 3000px timeline and the
  // bracelet and necklace stages are simply unreachable. flex-1 still stretches
  // this to the viewport; its children just lay out as blocks.
  return (
    <div className="flex-1 bg-background">
      <HeroStage />
      <DiamondSearch />
      <NewArrivals />
    </div>
  );
}
