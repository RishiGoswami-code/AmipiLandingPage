/**
 * AMIPI's Zoho SalesIQ - the CRM live chat amipi.com runs. The site keeps its
 * own chat drawer for the opening of a conversation (message, name, email)
 * and hands those to SalesIQ, which creates the chat for the sales team and
 * Zoho CRM. SalesIQ's public API can start a chat but cannot send later
 * messages from someone else's interface, so once a chat is started the live
 * back-and-forth continues in SalesIQ's own window.
 *
 * Browser-only. The widget code is the public value from amipi.com's own
 * embed, not a secret; the env var only swaps in a different SalesIQ brand.
 */
const WIDGET_CODE = /^siq[0-9a-f]+$/.test(process.env.NEXT_PUBLIC_ZOHO_SALESIQ_WIDGET_CODE ?? "")
  ? process.env.NEXT_PUBLIC_ZOHO_SALESIQ_WIDGET_CODE!
  : "siq034fa983a1c9afc22b058a632d80a0f2adb60cb02e00789c58fb87a42c138889";

type Callback = (fn: () => void) => void;
type Setter = (value: string) => void;
type SalesIQ = {
  ready?: () => void;
  floatbutton?: { visible: (state: "show" | "hide") => void };
  floatwindow?: {
    visible: (state: "show" | "hide") => void;
    open: Callback;
    close: Callback;
    minimize: Callback;
  };
  chat?: { start: () => void };
  visitor?: { name: Setter; email: Setter; question: Setter };
  /** SalesIQ's live record of what it knows about the visitor. */
  values?: Record<string, string | undefined>;
};

declare global {
  interface Window {
    $zoho?: { salesiq?: SalesIQ };
  }
}

export type ChatState = {
  /** SalesIQ has loaded and can take a chat. */
  ready: boolean;
  /** SalesIQ's own window (the live conversation) is open. */
  liveOpen: boolean;
};

let state: ChatState = { ready: false, liveOpen: false };
const SERVER_STATE = state;
const listeners = new Set<() => void>();
const waiting: (() => void)[] = [];

function set(patch: Partial<ChatState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

/** For useSyncExternalStore. */
export const chatStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  get: () => state,
  getServer: () => SERVER_STATE,
};

const siq = () => window.$zoho?.salesiq;

/** Adds SalesIQ's script to the page, once. Its stock bubble stays hidden. */
export function loadSalesIQ() {
  if (document.getElementById("zsiqscript")) return;

  // SalesIQ calls `ready` once its API exists, so it must be set before the
  // script runs.
  window.$zoho = window.$zoho ?? {};
  window.$zoho.salesiq = {
    ...window.$zoho.salesiq,
    ready() {
      const api = siq();
      api?.floatbutton?.visible("hide");
      api?.floatwindow?.open(() => set({ liveOpen: true }));
      // Closing would otherwise leave SalesIQ's bubble behind beside ours.
      const closed = () => {
        siq()?.floatbutton?.visible("hide");
        set({ liveOpen: false });
      };
      api?.floatwindow?.close(closed);
      api?.floatwindow?.minimize(closed);
      set({ ready: true });
      waiting.splice(0).forEach((run) => run());
    },
  };

  const script = document.createElement("script");
  script.id = "zsiqscript";
  script.src = `https://salesiq.zohopublic.com/widget?wc=${WIDGET_CODE}`;
  script.defer = true;
  document.body.appendChild(script);
}

export type ChatStart = { name: string; email: string; phone: string; question: string };

/** How long, and how often, the details are re-applied while SalesIQ's window loads. */
const SETTLE_FOR = 8000;
const SETTLE_EVERY = 400;

/**
 * Starts a SalesIQ chat with the visitor's details and first message, and
 * shows SalesIQ's window for the live conversation. Resolves false if SalesIQ
 * hasn't loaded within `timeout` (ad blockers commonly stop chat widgets).
 *
 * Two things otherwise make SalesIQ show its own details form instead of
 * starting the chat:
 *
 * - When its window loads for the first time it re-applies whatever it already
 *   had on record for this visitor (it remembers details from earlier visits,
 *   and picks them up from other forms on the site), overwriting the name and
 *   email just given. So they are applied again, and the chat started again,
 *   until they have stuck.
 * - Its phone field needs a country code picked from a dropdown, which no
 *   number passed through the API satisfies; a number sitting in that field
 *   is marked invalid and blocks the start. So the phone is never sent to that
 *   field - it goes at the end of the message, where the team still sees it.
 */
export function startChat(details: ChatStart, timeout = 10_000): Promise<boolean> {
  loadSalesIQ();
  return new Promise((resolve) => {
    let settled = false;
    const run = () => {
      if (settled) return;
      settled = true;
      const question = details.phone
        ? `${details.question}

Phone: ${details.phone}`
        : details.question;
      // SalesIQ reports ready before it has built its window, and its start()
      // throws until then - so a failed start is simply tried again below.
      let started = false;
      const apply = () => {
        const api = siq();
        if (api?.values) delete api.values.phone;
        api?.visitor?.name(details.name);
        api?.visitor?.email(details.email);
        api?.visitor?.question(question);
        try {
          api?.chat?.start();
          started = true;
        } catch {
          started = false;
        }
      };
      siq()?.floatwindow?.visible("show");
      apply();

      // Re-apply whenever SalesIQ has put its remembered details back.
      const until = Date.now() + SETTLE_FOR;
      const settle = window.setInterval(() => {
        const values = siq()?.values;
        if (Date.now() > until || !values) return window.clearInterval(settle);
        if (!started || values.name !== details.name || values.email !== details.email || values.phone) apply();
      }, SETTLE_EVERY);
      resolve(true);
    };
    if (state.ready) run();
    else {
      waiting.push(run);
      window.setTimeout(() => {
        if (settled) return;
        settled = true;
        resolve(false);
      }, timeout);
    }
  });
}

/** Re-opens SalesIQ's window, e.g. to return to a chat already in progress. */
export function showLiveChat() {
  siq()?.floatwindow?.visible("show");
}
