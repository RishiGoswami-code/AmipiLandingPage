import { forwardRef } from "react";

type JewelTagProps = {
  title: string;
  spec: string;
  /** Which side of the hotspot the card sits on at desktop widths. */
  side?: "left" | "right";
};

/**
 * Hotspot marker plus product card — diamond-grade gold edition.
 *
 * Lives outside the transformed image plate on purpose: anything inside it
 * inherits the zoom, and scaled type goes soft. The parent positions this at
 * the jewel's on-screen coordinates instead, so the card stays crisp at any
 * zoom level.
 */
export const JewelTag = forwardRef<HTMLDivElement, JewelTagProps>(
  function JewelTag({ title, spec, side = "right" }, ref) {
    return (
      <div
        ref={ref}
        className="pointer-events-none absolute top-0 left-0 opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Diamond-bright marker dot with gold glow */}
          <span
            className="absolute inset-0 m-auto block h-3 w-3 rounded-full border border-white/60"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #ffffff 0%, #fff8e7 25%, #dfbf7b 55%, #b68a38 100%)",
              boxShadow:
                "0 0 0 3px rgba(212,175,55,0.25), 0 0 12px rgba(255,230,120,0.6)",
            }}
          />
          {/* Ping pulse — gold tint */}
          <span
            className="absolute inset-0 m-auto block h-3 w-3 animate-ping rounded-full"
            style={{ background: "rgba(223,191,123,0.55)" }}
          />

          {/* Card: offset on desktop, tucked below on small screens */}
          <div
            className={[
              "absolute w-[15rem] max-w-[70vw]",
              "top-8 left-1/2 -translate-x-1/2",
              side === "right"
                ? "sm:top-1/2 sm:left-8 sm:-translate-x-0 sm:-translate-y-1/2"
                : "sm:top-1/2 sm:right-8 sm:left-auto sm:-translate-x-0 sm:-translate-y-1/2",
            ].join(" ")}
          >
            {/* Outer glow wrapper */}
            <div
              className="rounded-xl p-px"
              style={{
                background:
                  "linear-gradient(135deg, #c49c4d 0%, #fff8e7 35%, #ffffff 50%, #d4ae5c 70%, #b68a38 100%)",
                boxShadow:
                  "0 8px 32px -4px rgba(212,175,55,0.35), 0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              {/* Inner card */}
              <div
                className="rounded-[11px] px-4 py-3 backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(18,25,38,0.92) 0%, rgba(27,36,56,0.95) 60%, rgba(18,25,38,0.90) 100%)",
                }}
              >
                {/* Shimmer accent bar */}
                <div
                  className="mb-2 h-px w-full rounded-full opacity-60"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #dfbf7b 30%, #ffffff 50%, #dfbf7b 70%, transparent 100%)",
                  }}
                />
                <p className="font-display text-sm leading-snug font-semibold tracking-wide text-ice-100">
                  {title}
                </p>
                <p
                  className="mt-1 text-[11px] tracking-[0.22em] uppercase font-medium"
                  style={{ color: "#dfbf7b" }}
                >
                  {spec}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
