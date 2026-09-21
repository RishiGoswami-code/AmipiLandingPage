import type { Metadata } from "next";
import { JournalGrid } from "@/components/blog/JournalGrid";

export const metadata: Metadata = {
  title: "The Journal — AMIPI",
  description:
    "Buying guides, grading explainers, and news from AMIPI - notes from the diamond trade, written by the people sourcing the stones.",
};

export default function BlogPage() {
  return (
    <div className="bg-background">
      <JournalGrid />
    </div>
  );
}
