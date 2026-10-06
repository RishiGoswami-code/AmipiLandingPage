"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessagesSquare } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * AMIPI's Zoho SalesIQ widget - the same live chat amipi.com runs, so
 * conversations reach the sales team and land in Zoho CRM. The widget code
 * is the public value from amipi.com's own embed, not a secret; the env var
 * only exists so a different SalesIQ brand can be swapped in.
 */
const WIDGET_CODE = /^siq[0-9a-f]+$/.test(process.env.NEXT_PUBLIC_ZOHO_SALESIQ_WIDGET_CODE ?? "")
  ? process.env.NEXT_PUBLIC_ZOHO_SALESIQ_WIDGET_CODE!
  : "siq034fa983a1c9afc22b058a632d80a0f2adb60cb02e00789c58fb87a42c138889";

type SalesIQ = {
  ready?: () => void;
  floatbutton?: { visible: (state: "show" | "hide") => void };
  floatwindow?: {
    visible: (state: "show" | "hide") => void;
    open: (callback: () => void) => void;
    close: (callback: () => void) => void;
    minimize: (callback: () => void) => void;
  };
};

declare global {
  interface Window {
    $zoho?: { salesiq?: SalesIQ };
  }
}

/** Zoho's widget script is fetched this long after the page appears, or at once on a click. */
const LOAD_DELAY = 4000;

/** Adds Zoho's widget script to the page, once. */
function loadWidget() {
  if (document.getElementById("zsiqscript")) return;
  const script = document.createElement("script");
  script.id = "zsiqscript";
  script.src = `https://salesiq.zohopublic.com/widget?wc=${WIDGET_CODE}`;
  script.defer = true;
  document.body.appendChild(script);
}

/** How long a click waits for Zoho before falling back to the contact page. */
const LOAD_TIMEOUT = 10_000;

/**
 * The site's chat button, pinned bottom-right on every page. It keeps the
 * site's own gold launcher and hides Zoho's stock bubble, then opens Zoho's
 * chat window on click - so the entry point matches the design while the
 * conversation itself is the real CRM chat (departments, operators, offline
 * messages and history all as configured in SalesIQ). While the chat is open
 * Zoho shows its own close button in this corner, so ours steps aside.
 *
 * Zoho's script is held back a few seconds so it never competes with the
 * page's own loading. A click that lands before it has loaded fetches it at
 * once, is remembered, and opens the chat the moment it is ready; if it
 * never loads (ad blockers commonly stop chat widgets) the visitor is sent to
 * the contact page rather than left with a dead button.
 */
export function ChatLauncher() {
  const [ready, setReady] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const wantsOpen = useRef(false);
  const router = useRouter();

  useEffect(() => {
    // Zoho calls `ready` once its API exists. It has to be in place before
    // the widget script runs, hence set here rather than in onLoad.
    window.$zoho = window.$zoho ?? {};
    window.$zoho.salesiq = {
      ...window.$zoho.salesiq,
      ready() {
        const siq = window.$zoho?.salesiq;
        siq?.floatbutton?.visible("hide");
        siq?.floatwindow?.open(() => setChatOpen(true));
        // Closing would otherwise leave Zoho's bubble behind next to ours.
        const closed = () => {
          siq?.floatbutton?.visible("hide");
          setChatOpen(false);
        };
        siq?.floatwindow?.close(closed);
        siq?.floatwindow?.minimize(closed);
        if (wantsOpen.current) siq?.floatwindow?.visible("show");
        wantsOpen.current = false;
        setWaiting(false);
        setReady(true);
      },
    };
    const timer = window.setTimeout(loadWidget, LOAD_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  function open() {
    track("chat_open");
    if (ready) {
      window.$zoho?.salesiq?.floatwindow?.visible("show");
      return;
    }
    loadWidget();
    wantsOpen.current = true;
    setWaiting(true);
    window.setTimeout(() => {
      if (!wantsOpen.current) return;
      wantsOpen.current = false;
      setWaiting(false);
      router.push("/contact-us");
    }, LOAD_TIMEOUT);
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Chat with the AMIPI team"
        aria-busy={waiting}
        className={`assistant-fixed group pointer-events-auto fixed right-4 bottom-4 z-50 cursor-pointer rounded-2xl border border-border bg-surface/90 p-2.5 opacity-0 shadow-[0_20px_50px_-12px_rgba(18,25,38,0.25)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 hover:border-gold-300/60 hover:bg-surface hover:shadow-[0_20px_50px_-8px_rgba(212,175,55,0.35)] sm:right-8 sm:bottom-8 ${
          chatOpen ? "invisible" : ""
        }`}
        style={{
          animation: "assistantIn 0.9s cubic-bezier(0.34,1.56,0.64,1) 1.1s forwards",
        }}
      >
        <span
          className={`grid h-12 w-12 place-items-center rounded-xl border border-white/50 text-navy-950 shadow-[0_2px_14px_rgba(212,175,55,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.6)] ${
            waiting ? "animate-pulse" : ""
          }`}
          style={{
            background:
              "linear-gradient(135deg, #dfbf7b 0%, #fff8e7 35%, #ffffff 50%, #d4ae5c 70%, #b68a38 100%)",
          }}
        >
          <MessagesSquare className="h-5 w-5" />
        </span>
      </button>
    </>
  );
}
