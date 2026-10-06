"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { MessagesSquare } from "lucide-react";
import { track } from "@/lib/analytics";
import { chatStore, loadSalesIQ } from "@/lib/salesiq";
import { ChatDrawer } from "./ChatDrawer";

/** SalesIQ's script is fetched this long after the page appears, or at once on a click. */
const LOAD_DELAY = 4000;

/**
 * Always-on chat launcher - an icon-only button pinned to the bottom-right
 * corner of the viewport, persisting no matter where the user has scrolled.
 * Fades in on mount via CSS animation. Clicking it slides the site's chat
 * drawer in from the right; the button steps aside while the drawer is open,
 * and while a live conversation is open in SalesIQ's window (which puts its
 * own close button in this corner).
 *
 * SalesIQ's script is held back a few seconds so it never competes with the
 * page's own loading; opening the drawer fetches it at once.
 */
export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { liveOpen } = useSyncExternalStore(chatStore.subscribe, chatStore.get, chatStore.getServer);

  useEffect(() => {
    const timer = window.setTimeout(loadSalesIQ, LOAD_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          loadSalesIQ();
          track("chat_open");
          setOpen(true);
        }}
        aria-label="Chat with the AMIPI team"
        aria-expanded={open}
        className={`assistant-fixed group pointer-events-auto fixed right-4 bottom-4 z-50 cursor-pointer rounded-2xl border border-border bg-surface/90 p-2.5 opacity-0 shadow-[0_20px_50px_-12px_rgba(18,25,38,0.25)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 hover:border-gold-300/60 hover:bg-surface hover:shadow-[0_20px_50px_-8px_rgba(212,175,55,0.35)] sm:right-8 sm:bottom-8 ${
          open || liveOpen ? "invisible" : ""
        }`}
        style={{
          animation: "assistantIn 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.1s forwards",
        }}
      >
        <span
          className="grid h-12 w-12 place-items-center rounded-xl border border-white/50 text-navy-950 shadow-[0_2px_14px_rgba(212,175,55,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.6)]"
          style={{
            background:
              "linear-gradient(135deg, #dfbf7b 0%, #fff8e7 35%, #ffffff 50%, #d4ae5c 70%, #b68a38 100%)",
          }}
        >
          <MessagesSquare className="h-5 w-5" />
        </span>
      </button>

      <ChatDrawer open={open} onClose={close} />
    </>
  );
}
