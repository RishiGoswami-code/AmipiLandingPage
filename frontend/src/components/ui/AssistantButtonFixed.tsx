"use client";

import { useCallback, useState } from "react";
import { BotMessageSquare } from "lucide-react";
import { ChatDrawer } from "./ChatDrawer";

/**
 * Always-on launcher for the AMIPI AI chat assistant - an icon-only button
 * pinned to the bottom-right corner of the viewport, persisting no matter
 * where the user has scrolled. Fades in on mount via CSS animation so it
 * feels intentional rather than abrupt. Clicking it slides the chat drawer
 * in from the right; the button steps aside while the drawer is open.
 */
export function AssistantButtonFixed() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Chat with the AMIPI AI assistant"
        aria-expanded={open}
        className={`assistant-fixed group pointer-events-auto fixed right-4 bottom-4 z-50 cursor-pointer rounded-2xl border border-border bg-surface/90 p-2.5 opacity-0 shadow-[0_20px_50px_-12px_rgba(18,25,38,0.25)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 hover:border-gold-300/60 hover:bg-surface hover:shadow-[0_20px_50px_-8px_rgba(212,175,55,0.35)] sm:right-8 sm:bottom-8 ${
          open ? "invisible" : ""
        }`}
        style={{
          // Fallback: fade in via CSS animation in case GSAP hasn't loaded yet
          animation: "assistantIn 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.1s forwards",
        }}
      >
        {/* Golden chat-bot icon container */}
        <span
          className="grid h-12 w-12 place-items-center rounded-xl border border-white/50 text-navy-950 shadow-[0_2px_14px_rgba(212,175,55,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.6)]"
          style={{
            background:
              "linear-gradient(135deg, #dfbf7b 0%, #fff8e7 35%, #ffffff 50%, #d4ae5c 70%, #b68a38 100%)",
          }}
        >
          <BotMessageSquare className="h-5 w-5" />
        </span>
      </button>

      <ChatDrawer open={open} onClose={close} />
    </>
  );
}
