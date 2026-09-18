import type { Metadata } from "next";
import { SellingProcess } from "@/components/sell/SellingProcess";
import { TradeShows } from "@/components/sell/TradeShows";

export const metadata: Metadata = {
  title: "Sell Your Diamonds — AMIPI",
  description:
    "Sell your diamonds or fine jewelry direct to AMIPI - a fair quote, prepaid insured shipping, and payment within one business day of receipt.",
};

export default function SellYourDiamondsPage() {
  return (
    <div className="bg-background">
      <SellingProcess />
      <TradeShows />
    </div>
  );
}
