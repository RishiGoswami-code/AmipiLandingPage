import Link from "next/link";
import { CATEGORIES } from "@/sanity/categories";

const TABS = [{ value: "", label: "All" }, ...CATEGORIES];

/**
 * Category tabs in place of a dropdown: flat blocks, the active one filled
 * navy with a small notch pointing down at the posts. Plain links to
 * ?category=..., so each filter has its own shareable URL and works without
 * JavaScript. On phones the row scrolls sideways instead of wrapping.
 */
export function CategoryTabs({ active }: { active: string }) {
  return (
    <nav aria-label="Journal categories" className="-mx-6 overflow-x-auto px-6 pb-3 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2">
        {TABS.map(({ value, label }) => {
          const current = value === active;
          return (
            <li key={label}>
              <Link
                href={value ? `/blog?category=${value}` : "/blog"}
                scroll={false}
                aria-current={current ? "page" : undefined}
                className={`relative block px-6 py-3.5 text-[15px] transition-colors sm:px-8 ${
                  current
                    ? "bg-navy-900 font-medium text-white after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-x-[9px] after:border-t-[9px] after:border-x-transparent after:border-t-navy-900 after:content-['']"
                    : "bg-[#e3e7ee] text-foreground/65 hover:bg-[#d6dce6] hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
