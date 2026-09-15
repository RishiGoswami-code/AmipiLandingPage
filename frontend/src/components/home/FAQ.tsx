"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "Are your diamonds certified?",
    answer:
      "Every diamond over 0.30ct ships with independent GIA or IGI certification. Grading is stated plainly on the listing - no upgraded paper, no vague \"eye clean\" language standing in for a real report.",
  },
  {
    question: "What's the difference between natural and lab-grown diamonds?",
    answer:
      "Chemically and optically, nothing - both are real diamond, graded on the same 4Cs scale. Lab-grown stones are created in weeks rather than mined, which is why they carry a lower price per carat. We stock and certify both.",
  },
  {
    question: "How does fixed pricing actually work?",
    answer:
      "Every piece carries one clearly marked price, set before you ever call - the number you see is the number you pay. No back-room haggling, no \"best offer\" theater.",
  },
  {
    question: "How do I sell my diamond or jewelry to you?",
    answer:
      "Tell us what you have and we'll quote a fair, no-obligation price. If you accept, we send prepaid insured shipping and release payment within one business day of the piece arriving and being verified.",
  },
  {
    question: "Do you offer private appointments?",
    answer:
      "Yes - book a private viewing and we'll pull pieces from any category or collection for you to see and compare in person, no pressure to buy on the spot.",
  },
  {
    question: "What's your return policy?",
    answer:
      "Most pieces can be returned within 14 days of delivery in original condition. Custom and bespoke orders are final sale - we'll always flag that before you order, not after.",
  },
];

/**
 * FAQ accordion — gold-ruled question rows that expand into their answer.
 * Uses the same grid-template-rows growth trick as PillButton's hover
 * reveal and the New Arrivals / Collections card CTAs, so the open/close
 * motion reads as part of the same system rather than a new technique.
 * Only one answer is open at a time.
 */
export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const rows =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-faq-row]");
      if (!rows || !rows.length) return;

      gsap.from(rows, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
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
      id="faq"
      className="relative scroll-mt-24 bg-navy-900 px-6 py-20 sm:px-12 sm:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.42em] text-gold-500 uppercase sm:text-xs">
            Questions, Answered
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[0.02em] text-ice-100 uppercase sm:text-4xl">
            Frequently Asked
          </h2>
        </div>

        <div className="mt-14 border-t-2 border-gold-500/50">
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div
                key={faq.question}
                data-faq-row
                className="border-b border-ice-100/10"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-base font-semibold text-ice-100 sm:text-lg">
                    {faq.question}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-gold-500 transition-transform duration-300 ${
                      open ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 text-sm leading-relaxed text-ice-100/60 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <PillButton href="/contact" variant="outline" icon="arrow">
            Still Have Questions? Book a Call
          </PillButton>
        </div>
      </div>
    </section>
  );
}
