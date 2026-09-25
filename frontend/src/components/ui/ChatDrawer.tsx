"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BotMessageSquare,
  ChevronRight,
  Gem,
  Mic,
  Paperclip,
  SendHorizontal,
  Sparkles,
  X,
} from "lucide-react";

type Message = { id: number; role: "user" | "assistant"; text: string };

/** Antique gold for line icons and small caps - the brand's bright yellow
 * reads too loud against the cream panel. */
const BRONZE = "#a47a35";
const GOLD_TILE =
  "linear-gradient(135deg, #dfbf7b 0%, #fff8e7 35%, #ffffff 50%, #d4ae5c 70%, #b68a38 100%)";

const POPULAR = [
  {
    label: "Natural vs Lab-Grown?",
    question: "What's the difference between natural and lab-grown diamonds?",
    image: "/diamond-shapes/round.svg",
    contain: true,
  },
  {
    label: "Which shape suits me?",
    question: "Which diamond shape would suit me best?",
    image: "/categories/engagement-rings.webp",
    contain: false,
  },
  {
    label: "What do the 4Cs mean?",
    question: "What do the 4Cs of a diamond mean?",
    image:
      "https://images.unsplash.com/photo-1750767323874-5946ad2c7e91?auto=format&fit=crop&w=400&h=300&q=80",
    contain: false,
  },
];

/* Thin line icons for the topic pills, drawn to sit beside lucide's Gem. */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
};

function RingIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="15" r="6" />
      <path d="M10 6.5 12 9l2-2.5L13 4h-2z" />
    </svg>
  );
}
function NecklaceIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 3c1 6 4 10 8 12 4-2 7-6 8-12" />
      <path d="M12 15v1.5M10.5 18.5 12 21l1.5-2.5L12 16.5z" />
    </svg>
  );
}
function BraceletIcon() {
  return (
    <svg {...iconProps}>
      <ellipse cx="12" cy="12" rx="9" ry="5" transform="rotate(-15 12 12)" />
      <ellipse cx="12" cy="12" rx="6.5" ry="2.8" transform="rotate(-15 12 12)" />
    </svg>
  );
}
function EarringsIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="7" cy="4" r="1.2" />
      <circle cx="17" cy="4" r="1.2" />
      <path d="M7 5.2V9M17 5.2V9" />
      <path d="M7 9c-2 2.5-3 4.5-3 6.5a3 3 0 0 0 6 0C10 13.5 9 11.5 7 9zM17 9c-2 2.5-3 4.5-3 6.5a3 3 0 0 0 6 0c0-2-1-4-3-6.5z" />
    </svg>
  );
}
function CollectionsIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="3.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="3.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="3.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="3.5" />
    </svg>
  );
}

const TOPICS = [
  { label: "Diamond Basics", Icon: () => <Gem className="h-5 w-5" strokeWidth={1.5} /> },
  { label: "Engagement Rings", Icon: RingIcon },
  { label: "Necklaces", Icon: NecklaceIcon },
  { label: "Bracelets", Icon: BraceletIcon },
  { label: "Earrings", Icon: EarringsIcon },
  { label: "Jewelry Collections", Icon: CollectionsIcon },
];

/** Stand-in reply until the assistant is wired to a model - UI only for now. */
const PLACEHOLDER_REPLY =
  "Thanks for your message! Our AI assistant is still being set up. In the meantime, call (800) 530-2647 or email info@amipi.com and our team will help.";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 text-[11px] font-medium tracking-[0.3em] text-foreground/70 uppercase">
      {children}
    </span>
  );
}

/**
 * Chat panel for the AMIPI AI assistant. It floats inset from the viewport
 * edges as a rounded card and slides in from the right. Before the first
 * message it shows the welcome card, popular questions and topic shortcuts;
 * once a conversation starts those give way to the message thread.
 *
 * Always mounted so it can animate; while closed it is `inert`, so nothing
 * inside is focusable or announced. The scroll area carries
 * `data-lenis-prevent` so wheel scrolling inside it scrolls the chat rather
 * than the page Lenis is driving underneath.
 */
export function ChatDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // Focus the input on open; Escape closes.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 300);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Keep the newest message in view.
  useEffect(() => {
    if (!messages.length) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text: trimmed }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", text: PLACEHOLDER_REPLY },
      ]);
      setTyping(false);
    }, 900);
  }

  const started = messages.length > 0;

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      inert={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-navy-950/20 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="AMIPI AI assistant"
        className={`absolute top-[4.5rem] right-3 bottom-3 left-3 flex flex-col overflow-hidden rounded-[1.75rem] bg-[#f8f5ef] shadow-[0_30px_80px_-20px_rgba(18,25,38,0.5)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:top-[5.5rem] sm:right-5 sm:bottom-5 sm:left-auto sm:w-[25.6rem] sm:rounded-[2rem] ${
          open ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+2rem)] opacity-0"
        }`}
      >
        {/* Header - dark, with a warm glow and a diamond on the right */}
        <header className="relative shrink-0 overflow-hidden bg-[#0d0d10] px-6 pt-6 pb-12 text-white">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 82% 70%, rgba(214,170,90,0.45), transparent 38%), radial-gradient(circle at 62% 20%, rgba(214,170,90,0.18), transparent 30%), radial-gradient(circle at 95% 15%, rgba(255,230,180,0.2), transparent 22%)",
            }}
          />
          <div className="relative flex items-center gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-navy-950 shadow-[0_4px_20px_rgba(212,175,55,0.45)]"
              style={{ background: GOLD_TILE }}
            >
              <BotMessageSquare className="h-7 w-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-medium">
                AMIPI AI Assistant
              </p>
              <p className="mt-0.5 flex items-center gap-2 text-sm text-white/75">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Diamonds &amp; jewelry help
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="absolute top-4 right-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Body - a cream sheet overlapping the header with rounded top corners */}
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="relative -mt-7 flex-1 overflow-y-auto overscroll-contain rounded-t-[1.75rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#f8f5ef] px-5 pt-6 pb-4"
        >
          {/* Welcome card */}
          <div className="rounded-3xl border border-black/[0.04] bg-white/70 px-5 py-4 shadow-[0_8px_24px_-12px_rgba(60,40,10,0.18)]">
            <p className="flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-2xl leading-snug font-medium text-foreground">
              Hi! I&rsquo;m the AMIPI AI assistant.
              <Sparkles className="h-5 w-5 shrink-0" style={{ color: "#d4ae5c" }} />
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
              Ask me about diamonds, shapes, the 4Cs, jewelry styles or help choosing a
              piece that&rsquo;s perfect for you.
            </p>
          </div>

          {!started ? (
            <>
              {/* Popular questions */}
              <div className="mt-7 flex items-center gap-3">
                <SectionLabel>Popular questions</SectionLabel>
                <span className="h-px flex-1 bg-foreground/10" />
                <Link
                  href="/blog"
                  onClick={onClose}
                  className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold tracking-[0.25em] uppercase transition-opacity hover:opacity-70"
                  style={{ color: BRONZE }}
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {POPULAR.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => send(q.question)}
                    className="group flex cursor-pointer flex-col rounded-2xl border border-black/[0.04] bg-white/80 p-1.5 text-left shadow-[0_8px_20px_-12px_rgba(60,40,10,0.2)] transition-shadow hover:shadow-[0_12px_28px_-10px_rgba(60,40,10,0.3)]"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-[#ecebe8]">
                      <Image
                        src={q.image}
                        alt=""
                        fill
                        sizes="160px"
                        className={`transition-transform duration-500 group-hover:scale-105 ${
                          q.contain ? "object-contain p-2" : "object-cover"
                        }`}
                      />
                    </span>
                    <span className="px-1.5 pt-2.5 pb-1.5 font-[family-name:var(--font-cormorant)] text-[0.95rem] leading-tight font-medium text-foreground">
                      {q.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Explore by topic */}
              <div className="mt-7 flex items-center gap-3">
                <SectionLabel>Explore by topic</SectionLabel>
                <span className="h-px flex-1 bg-foreground/10" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {TOPICS.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => send(`Tell me about ${label.toLowerCase()}.`)}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-black/[0.04] bg-white/80 py-1.5 pr-2 pl-1.5 text-left shadow-[0_8px_20px_-12px_rgba(60,40,10,0.2)] transition-shadow hover:shadow-[0_12px_28px_-10px_rgba(60,40,10,0.3)]"
                  >
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f3efe7]"
                      style={{ color: BRONZE }}
                    >
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1 font-[family-name:var(--font-cormorant)] text-[0.95rem] leading-tight font-medium text-foreground">
                      {label}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-foreground/50" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-5 space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-[#1a1a1f] text-white"
                        : "rounded-bl-md border border-black/[0.04] bg-white/80 text-foreground shadow-[0_6px_16px_-10px_rgba(60,40,10,0.2)]"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <span className="flex gap-1 rounded-2xl rounded-bl-md border border-black/[0.04] bg-white/80 px-4 py-3.5">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          className="shrink-0 px-4 pt-2 pb-4"
        >
          <div className="flex items-center gap-2 rounded-full border border-[#c9a55a] bg-white py-1.5 pr-1.5 pl-1.5 shadow-[0_10px_30px_-14px_rgba(60,40,10,0.35)]">
            <button
              type="button"
              aria-label="Attach a file"
              className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-[#f3efe7] text-foreground/60 transition-colors hover:text-foreground"
            >
              <Paperclip className="h-4.5 w-4.5" />
            </button>
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about diamonds or jewelry…"
              aria-label="Message"
              className="min-w-0 flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
            <button
              type="button"
              aria-label="Voice input"
              className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-[#f3efe7] text-foreground/70 transition-colors hover:text-foreground"
            >
              <Mic className="h-4.5 w-4.5" />
            </button>
            <button
              type="submit"
              disabled={!draft.trim() || typing}
              aria-label="Send message"
              className="grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full text-white shadow-[0_6px_16px_-6px_rgba(140,100,30,0.7)] transition-[filter,opacity] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #c9a24a 0%, #a47a35 55%, #8a6428 100%)" }}
            >
              <SendHorizontal className="h-5 w-5" />
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
