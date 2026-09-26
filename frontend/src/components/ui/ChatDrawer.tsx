"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SendHorizontal, X } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
};

/** The same metallic ramp as the site's gold buttons (`gold-shimmer-gradient`
 * in globals.css), held still - a header shouldn't shimmer. */
const GOLD_BAR =
  "linear-gradient(115deg, #b8863a 0%, #d4a94f 30%, #e2bf6e 50%, #c9973f 75%, #a8762f 100%)";

/** Stand-in reply until the assistant is wired to a model - UI only for now. */
const PLACEHOLDER_REPLY =
  "Thanks for your message! Our AI assistant is still being set up. In the meantime, call (800) 530-2647 or email info@amipi.com and our team will help.";

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Chat panel for the AMIPI AI assistant: a plain messaging window - gold
 * header bar, a short intro strip, the thread, and a text box. It floats as
 * a rounded card below the navbar and slides in from the right.
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
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [
      ...m,
      { id: nextId.current++, role: "user", text: trimmed, time: timeNow() },
    ]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", text: PLACEHOLDER_REPLY, time: timeNow() },
      ]);
      setTyping(false);
    }, 900);
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
        aria-label="AMIPI AI assistant"
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
          <p className="flex-1 text-base font-bold">AMIPI AI Assistant</p>
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
          Ask me about diamonds, shapes, the 4Cs or choosing a piece of jewelry.
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
                {m.role === "user" ? "You" : "AMIPI AI"}
              </span>
              <p
                className={`flex max-w-[85%] flex-wrap items-end gap-x-3 gap-y-1 rounded-2xl px-4 py-2.5 text-[15px] leading-snug text-foreground ${
                  m.role === "user" ? "bg-[#f7ecd2]" : "bg-[#f3f4f6]"
                }`}
              >
                <span>{m.text}</span>
                <span className="ml-auto text-[11px] text-foreground/45">{m.time}</span>
              </p>
            </div>
          ))}

          {typing && (
            <div className="flex flex-col items-start" aria-label="Assistant is typing">
              <span className="mb-1 px-1 text-xs text-foreground/55">AMIPI AI</span>
              <span className="flex gap-1 rounded-2xl bg-[#f3f4f6] px-4 py-3.5">
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

        {/* Input */}
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
            disabled={!draft.trim() || typing}
            aria-label="Send message"
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full text-navy-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: GOLD_BAR }}
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>
      </aside>
    </div>
  );
}
