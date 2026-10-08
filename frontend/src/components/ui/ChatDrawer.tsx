"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SendHorizontal, X } from "lucide-react";
import { track } from "@/lib/analytics";
import { startChat } from "@/lib/salesiq";

type Message = {
  id: number;
  role: "user" | "team";
  text: string;
  time: string;
};

/** The same metallic ramp as the site's gold buttons (`gold-shimmer-gradient`
 * in globals.css), held still - a header shouldn't shimmer. */
const GOLD_BAR =
  "linear-gradient(115deg, #b8863a 0%, #d4a94f 30%, #e2bf6e 50%, #c9973f 75%, #a8762f 100%)";

/**
 * Where the conversation is:
 *  message  - waiting for the visitor's first message
 *  details  - message received; asking who to reply to
 *  starting - handing the chat to SalesIQ
 *  failed   - SalesIQ couldn't be reached; other ways to get in touch are shown
 */
type Stage = "message" | "details" | "starting" | "failed";

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const field =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-[#a47a35]";

/**
 * The site's chat panel: gold header bar, a short intro strip, the thread,
 * and a text box - a rounded card below the navbar that slides in from the
 * right. It opens a conversation with AMIPI's sales team through Zoho
 * SalesIQ (see lib/salesiq.ts): the visitor writes what they need, then says
 * who to reply to, and the drawer hands both to SalesIQ, which creates the
 * chat in the CRM and carries on the live conversation in its own window.
 * The replies in this thread are fixed prompts for those two steps, not
 * generated answers.
 *
 * Always mounted so it can animate; while closed it is `inert`, so nothing
 * inside is focusable or announced. The thread carries `data-lenis-prevent`
 * so wheel scrolling inside it scrolls the chat rather than the page Lenis
 * is driving underneath.
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
  const [stage, setStage] = useState<Stage>("message");
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
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
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, stage]);

  const add = (role: Message["role"], text: string) =>
    setMessages((m) => [...m, { id: nextId.current++, role, text, time: timeNow() }]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || stage !== "message") return;
    add("user", trimmed);
    setDraft("");
    setStage("details");
    add("team", "Thanks! Who should we reply to? Add your name and email and we'll connect you with our team.");
    window.setTimeout(() => nameRef.current?.focus(), 100);
  }

  async function connect() {
    const box = detailsRef.current;
    const get = (k: string) =>
      (box?.querySelector<HTMLInputElement>(`[name="${k}"]`)?.value ?? "").trim();
    const name = get("name");
    const email = get("email");
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setDetailsError("Please add your name and a valid email.");
      return;
    }
    setDetailsError(null);
    setStage("starting");
    // Everything the visitor wrote before giving their details, as one question.
    const question = messages
      .filter((m) => m.role === "user")
      .map((m) => m.text)
      .join("\n");
    const started = await startChat({ name, email, phone: get("phone"), question });
    if (started) {
      track("generate_lead", { form: "chat" });
      // SalesIQ's window now holds the live conversation; start fresh next time.
      onClose();
      setMessages([]);
      setStage("message");
    } else {
      setStage("failed");
    }
  }

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
        aria-label="Chat with AMIPI"
        className={`absolute top-[4.5rem] right-3 bottom-3 left-3 flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(18,25,38,0.5)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:top-[5.5rem] sm:right-5 sm:bottom-5 sm:left-auto sm:w-[25.6rem] ${
          open ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+2rem)] opacity-0"
        }`}
      >
        {/* Header bar */}
        <header
          className="flex shrink-0 items-center gap-3 px-4 py-3.5 text-navy-950"
          style={{ background: GOLD_BAR }}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-sm">
            <Image src="/icon.png" alt="" width={64} height={64} className="h-8 w-8" />
          </span>
          <p className="flex-1 text-base font-bold">Chat with AMIPI</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-colors hover:bg-black/10"
          >
            <X className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </header>

        {/* Intro strip */}
        <div className="mx-2 mt-2 shrink-0 rounded-lg bg-[#faf3e3] px-4 py-3 text-center text-sm leading-relaxed text-foreground/80">
          Tell us what you&rsquo;re looking for - diamonds, jewelry, pricing or an order - and a
          member of our team will reply.
        </div>

        {/* Thread */}
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Pushes a short thread to the bottom, next to the input */}
          <div className="flex-1" />

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
            >
              <span className="mb-1 px-1 text-xs text-foreground/55">
                {m.role === "user" ? "You" : "AMIPI"}
              </span>
              <p
                className={`flex max-w-[85%] flex-wrap items-end gap-x-3 gap-y-1 rounded-2xl px-4 py-2.5 text-[15px] leading-snug text-foreground ${
                  m.role === "user" ? "bg-[#f7ecd2]" : "bg-[#f3f4f6]"
                }`}
              >
                <span className="whitespace-pre-line">{m.text}</span>
                <span className="ml-auto text-[11px] text-foreground/45">{m.time}</span>
              </p>
            </div>
          ))}

          {stage === "starting" && (
            <div className="flex flex-col items-start" role="status" aria-label="Connecting you to our team">
              <span className="mb-1 px-1 text-xs text-foreground/55">AMIPI</span>
              <span className="flex items-center gap-2 rounded-2xl bg-[#f3f4f6] px-4 py-3 text-[14px] text-foreground/70">
                Connecting you to our team
                <span className="flex gap-1">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
              </span>
            </div>
          )}

          {stage === "failed" && (
            <p role="alert" className="rounded-2xl border border-[#d4ae5c]/40 bg-[#faf3e3] px-4 py-3 text-[14px] leading-relaxed text-foreground/80">
              We couldn&rsquo;t open live chat in this browser. Please call{" "}
              <a href="tel:+18005302647" className="font-semibold">(800) 530-2647</a>, email{" "}
              <a href="mailto:info@amipi.com" className="font-semibold">info@amipi.com</a>, or use the{" "}
              <Link href="/contact-us" onClick={onClose} className="font-semibold underline underline-offset-2">
                contact form
              </Link>
              .
            </p>
          )}
        </div>

        {/* Input: the message box first, then who to reply to */}
        {stage === "message" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex shrink-0 items-start gap-2 border-t border-black/10 px-4 py-3"
          >
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(draft);
                }
              }}
              rows={3}
              placeholder="Type your message and hit Enter"
              aria-label="Message"
              className="flex-1 resize-none bg-transparent py-1 text-[15px] text-foreground outline-none placeholder:text-foreground/40"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send message"
              className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full text-navy-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: GOLD_BAR }}
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          </form>
        ) : (
          /* Deliberately not a <form>: SalesIQ reads name, email and phone out
             of any form submitted on the page, and a phone it picks up that
             way is what blocks its chat from starting (see lib/salesiq.ts). */
          <div
            ref={detailsRef}
            role="group"
            aria-label="Your details"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                connect();
              }
            }}
            className={`shrink-0 space-y-2 border-t border-black/10 px-4 py-3 ${
              stage === "details" ? "" : "pointer-events-none opacity-50"
            }`}
          >
            <input ref={nameRef} name="name" autoComplete="name" placeholder="Your name *" aria-label="Your name" className={field} />
            <div className="grid grid-cols-2 gap-2">
              <input name="email" type="email" autoComplete="email" placeholder="Email *" aria-label="Email" className={field} />
              <input name="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" aria-label="Phone" className={field} />
            </div>
            {detailsError && (
              <p role="alert" className="text-[12px] text-crimson-500">
                {detailsError}
              </p>
            )}
            <button
              type="button"
              onClick={connect}
              className="w-full cursor-pointer rounded-full py-2.5 text-[13px] font-semibold tracking-[0.08em] text-navy-950 uppercase transition-opacity hover:opacity-90"
              style={{ background: GOLD_BAR }}
            >
              Start chat
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
