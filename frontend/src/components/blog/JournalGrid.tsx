"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Post = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

const POSTS: Post[] = [
  {
    category: "Buying Guide",
    title: "Natural vs. Lab-Grown: What Actually Changes at the Register",
    excerpt:
      "Same chemistry, same grading scale, very different price per carat. Here's what the difference does and doesn't affect.",
    date: "Aug 2026",
    image:
      "https://images.unsplash.com/photo-1605100804567-1ffe942b5cd6?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    category: "Education",
    title: "The 4Cs, Explained Without the Sales Pitch",
    excerpt:
      "Cut, color, clarity, carat - and which one actually matters most for how a diamond looks in person.",
    date: "Jul 2026",
    image:
      "https://images.unsplash.com/photo-1750767323874-5946ad2c7e91?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    category: "Behind The Scenes",
    title: "How AMIPI Grades Every Stone We List",
    excerpt:
      "No upgraded paper, no vague \"eye clean.\" A look at the certification process behind every listing.",
    date: "Jul 2026",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    category: "Buying Guide",
    title: "Choosing a Diamond Shape: Round Brilliant vs. Fancy Cuts",
    excerpt:
      "Round brilliants aren't the only option - a practical look at how oval, cushion and emerald cuts wear differently.",
    date: "Jun 2026",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    category: "Selling",
    title: "What Selling Your Jewelry to AMIPI Actually Looks Like",
    excerpt:
      "From first quote to funds in your account - a walkthrough of our three-step process, step by step.",
    date: "Jun 2026",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    category: "News",
    title: "AMIPI at JIS Miami 2026: What We're Bringing",
    excerpt:
      "A preview of the pieces and price points we're bringing to Booth #1335 this October.",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1613498510372-8901cad084a2?auto=format&fit=crop&w=900&h=700&q=80",
  },
];

/**
 * Journal / blog listing. There's no article route behind these yet, so
 * cards are presentational (title, not a link) rather than promising a
 * "Read More" that goes nowhere - the CTA below points at Contact for
 * anyone who wants to ask about a topic directly instead.
 */
export function JournalGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const cards =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards || !cards.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 48,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-950 px-6 pt-24 pb-20 sm:px-12 sm:pt-28 sm:pb-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            The Journal
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-ice-100 uppercase sm:text-4xl md:text-5xl">
            Notes From <span className="text-gold-500">The Trade</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ice-100/60 sm:text-base">
            Buying guides, grading explainers, and the occasional look
            behind the counter - written by the people actually sourcing
            the stones.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <article
              key={post.title}
              data-card
              className="group overflow-hidden rounded-2xl border border-ice-100/8 bg-navy-900 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_20px_40px_-12px_rgba(254,215,0,0.18)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-gold-500 uppercase">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-ice-100/40">{post.date}</span>
                </div>
                <h2 className="mt-3 font-display text-base leading-snug font-semibold text-ice-100 sm:text-lg">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ice-100/60">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-ice-100/50">
            Have a topic you want us to cover?
          </p>
          <div className="mt-5 flex justify-center">
            <PillButton href="/contact" variant="outline" icon="arrow">
              Get In Touch
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
