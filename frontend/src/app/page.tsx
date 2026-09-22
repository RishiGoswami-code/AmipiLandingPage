import HeroStage from "@/components/hero/HeroStage";
import { DiamondSearch } from "@/components/home/DiamondSearch";
import { NewArrivals } from "@/components/home/NewArrivals";
import { CategoriesPreview } from "@/components/home/CategoriesPreview";
import { CollectionsPreview } from "@/components/home/CollectionsPreview";
import { TradeShows } from "@/components/sell/TradeShows";
import { FAQ } from "@/components/home/FAQ";

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
      <CollectionsPreview />
      <TradeShows />
      <CategoriesPreview />
      <FAQ />
    </div>
  );
}
