"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Eye, EyeOff, Info, type LucideIcon } from "lucide-react";

/** Antique gold for icons and accents - the brand's bright yellow reads too
 * loud on the cream and white of these forms. */
export const BRONZE = "#a47a35";

const boxClasses =
  "flex items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 transition-colors focus-within:border-[#d4ae5c]";
const labelClasses = "block text-[10px] font-semibold text-foreground/75";
const controlClasses =
  "w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-foreground/35";

/**
 * A boxed field: optional icon on the left, a small label above the control,
 * both inside one bordered box - the label sits in the box rather than above
 * it so a dense form still reads as a tidy grid of cards.
 */
export function Field({
  label,
  icon: Icon,
  className = "",
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: LucideIcon }) {
  const id = useId();
  const [shown, setShown] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`${boxClasses} ${className}`}>
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-foreground/45" />}
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        <input
          id={id}
          type={isPassword && shown ? "text" : type}
          {...props}
          className={controlClasses}
        />
      </div>
      {isPassword && (
        <button
          type="button"
          onClick={() => setShown((s) => !s)}
          aria-label={shown ? "Hide password" : "Show password"}
          className="shrink-0 cursor-pointer text-foreground/50 transition-colors hover:text-foreground"
        >
          {shown ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
      )}
    </div>
  );
}

/**
 * Dropdown in the same box as the text fields, with its own option list -
 * a native <select> can't have its open list styled, so this draws one:
 * white card, bronze tick on the chosen option, soft cream hover.
 *
 * Keyboard: Enter/Space/ArrowDown opens, arrows move, Enter picks, Escape
 * closes. The value is submitted through a hidden input under `name`.
 */
export function Select({
  label,
  icon: Icon,
  name,
  options,
  defaultValue = "",
  placeholder,
  className = "",
}: {
  label: string;
  icon?: LucideIcon;
  name: string;
  options: string[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function openList() {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  }

  function pick(option: string) {
    setValue(option);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(options[active]);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        className={`${boxClasses} w-full cursor-pointer text-left ${open ? "border-[#d4ae5c]" : ""}`}
      >
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-foreground/45" />}
        <span className="min-w-0 flex-1">
          <span className={labelClasses}>{label}</span>
          <span
            className={`block truncate text-[13px] ${value ? "text-foreground" : "text-foreground/35"}`}
          >
            {value || placeholder}
          </span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-foreground/50 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={id}
          data-lenis-prevent
          className="absolute inset-x-0 top-full z-30 mt-1 max-h-56 overflow-y-auto overscroll-contain rounded-lg border border-black/10 bg-white py-1 shadow-[0_16px_40px_-16px_rgba(60,40,10,0.35)] [scrollbar-width:thin]"
        >
          {options.map((option, i) => (
            <li
              key={option}
              role="option"
              aria-selected={option === value}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(option);
              }}
              className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-1.5 text-[13px] ${
                i === active ? "bg-[#f7f1e6]" : ""
              } ${option === value ? "font-semibold text-foreground" : "text-foreground/80"}`}
            >
              {option}
              {option === value && <Check className="h-3.5 w-3.5 shrink-0" style={{ color: BRONZE }} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * A form card: round icon, serif title and a one-line subtitle, then its
 * fields. `onActive` fires when focus moves into it.
 */
export function FormSection({
  icon: Icon,
  title,
  subtitle,
  onActive,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onActive?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section
      onFocusCapture={onActive}
      className="rounded-xl border border-black/[0.07] bg-white p-4 shadow-[0_10px_30px_-20px_rgba(60,40,10,0.25)]">
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f5eee2]"
          style={{ color: BRONZE }}
        >
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-xl leading-tight font-medium text-foreground">
            {title}
          </h2>
          <p className="text-[11px] text-foreground/55">{subtitle}</p>
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Red alert under a field group, shown only when something is wrong. */
export function FieldAlert({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="mt-2.5 flex items-start gap-2 rounded-md bg-crimson-500/10 px-2.5 py-1.5 text-[11px] leading-relaxed text-crimson-500"
    >
      <Info className="mt-px h-3 w-3 shrink-0" />
      {children}
    </p>
  );
}

/** Honest "not connected yet" note shown on submit until a backend exists. */
export function NotConnectedNote({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="status"
      className="rounded-lg border border-[#d4ae5c]/40 bg-[#f7f1e6] px-4 py-2.5 text-center text-[13px] leading-relaxed text-foreground/75"
    >
      {children}
    </p>
  );
}

export const checkboxClasses =
  "mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer rounded border-border accent-[#a8762f]";
