"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Building2, Globe, ImagePlus, Mail, Phone, RefreshCw, ShieldCheck, User, X } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { Field, FieldAlert, NotConnectedNote } from "@/components/account/fields";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

/** No 0/O, 1/I/L - the pairs people misread in a distorted code. */
const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const makeCode = () =>
  Array.from({ length: 5 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join("");

/**
 * The verification code, drawn rather than written into the page so it isn't
 * sitting in the markup for a script to read. It is checked in the browser
 * only, which is enough to turn away drive-by form bots; once the form posts
 * to a server the code has to be issued and checked there instead.
 */
function CodeImage({ code }: { code: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { width: w, height: h } = canvas;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f7f1e6";
    ctx.fillRect(0, 0, w, h);
    // A few strokes and specks across the code, then each letter slightly turned.
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(27,36,56,${0.12 + Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.lineTo(Math.random() * w, Math.random() * h);
      ctx.stroke();
    }
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(164,122,53,${Math.random() * 0.5})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }
    ctx.font = "600 26px Georgia, serif";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#1b2438";
    [...code].forEach((char, i) => {
      ctx.save();
      ctx.translate(18 + i * 25, h / 2 + (Math.random() * 6 - 3));
      ctx.rotate(Math.random() * 0.5 - 0.25);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  }, [code]);

  return (
    <canvas
      ref={ref}
      width={150}
      height={48}
      role="img"
      aria-label="Verification code image"
      className="h-12 w-[150px] rounded-lg border border-black/10"
    />
  );
}

/**
 * amipi.com/custom's enquiry form cut down to the basics the team asked for:
 * a picture of the piece, name, email, company, website, phone and a
 * verification code. No backend yet, so a valid submission says so plainly,
 * as the contact and sell forms do.
 */
export function CustomDesignForm() {
  const [image, setImage] = useState<{ name: string; url: string } | null>(null);
  const [code, setCode] = useState(makeCode);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Release the preview's memory when it is replaced or the form goes away.
  useEffect(() => () => {
    if (image) URL.revokeObjectURL(image.url);
  }, [image]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG or similar).");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("That image is over 10 MB. Please choose a smaller one.");
      e.target.value = "";
      return;
    }
    setError(null);
    setImage({ name: file.name, url: URL.createObjectURL(file) });
  }

  function clearImage() {
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(false);
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    if (!get("name") || !get("email") || !get("phone")) {
      setError("Please add your name, email and phone number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) {
      setError("Please check your email address.");
      return;
    }
    if (get("code").toUpperCase() !== code) {
      setError("The verification code doesn't match. Please try the new one.");
      setCode(makeCode());
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(27,36,56,0.45)] sm:p-8"
    >
      {/* Image upload */}
      <p className="text-xs font-semibold tracking-[0.15em] text-foreground uppercase">
        Upload your custom jewelry image
      </p>
      <input
        ref={fileRef}
        id="design-image"
        name="image"
        type="file"
        accept="image/*"
        onChange={onFile}
        className="sr-only"
      />
      {image ? (
        <div className="mt-3 flex items-center gap-4 rounded-xl border border-black/10 bg-[#faf7f1] p-3">
          <Image
            src={image.url}
            alt="Your uploaded design"
            width={80}
            height={80}
            unoptimized
            className="h-20 w-20 shrink-0 rounded-lg object-cover"
          />
          <p className="min-w-0 flex-1 truncate text-[14px] text-foreground/80">{image.name}</p>
          <button
            type="button"
            onClick={clearImage}
            aria-label="Remove image"
            className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full text-foreground/55 transition-colors hover:bg-black/5 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="design-image"
          className="mt-3 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-[#a47a35]/50 bg-[#faf7f1] px-6 py-8 text-center transition-colors hover:border-[#a47a35] hover:bg-[#f7f1e6]"
        >
          <ImagePlus className="h-7 w-7 text-[#a47a35]" strokeWidth={1.5} />
          <span className="text-[14px] font-medium text-foreground">Choose a photo or sketch</span>
          <span className="text-[12px] text-foreground/55">JPG or PNG, up to 10 MB</span>
        </label>
      )}

      {/* Details */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Field label="Name *" name="name" icon={User} placeholder="Your name" autoComplete="name" required />
        <Field label="Email ID *" name="email" type="email" icon={Mail} placeholder="you@company.com" autoComplete="email" required />
        <Field label="Company name" name="company" icon={Building2} placeholder="Your store or business" autoComplete="organization" />
        <Field label="Website" name="website" type="url" icon={Globe} placeholder="www.yourstore.com" autoComplete="url" />
        <Field label="Phone *" name="phone" type="tel" icon={Phone} placeholder="Phone number" autoComplete="tel" required className="sm:col-span-2" />
      </div>

      {/* Verification code */}
      <div className="mt-6">
        <p className="text-xs font-semibold tracking-[0.15em] text-foreground uppercase">
          Verification code
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <CodeImage code={code} />
          <button
            type="button"
            onClick={() => setCode(makeCode())}
            aria-label="Get a new code"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-black/10 text-foreground/60 transition-colors hover:border-navy-900 hover:text-navy-900"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <Field label="Enter the code *" name="code" icon={ShieldCheck} placeholder="5 characters" autoComplete="off" autoCapitalize="characters" maxLength={5} required className="min-w-[12rem] flex-1" />
        </div>
      </div>

      {error && <FieldAlert>{error}</FieldAlert>}

      <div className="mt-7">
        <PillButton type="submit" variant="dark" size="sm" icon="arrow">
          Send my design
        </PillButton>
      </div>

      {submitted && (
        <div className="mt-5">
          <NotConnectedNote>
            This form isn&rsquo;t connected yet. Please email your design to{" "}
            <a href="mailto:info@amipi.com" className="font-semibold">
              info@amipi.com
            </a>{" "}
            or call{" "}
            <a href="tel:+18005302647" className="font-semibold">
              +1 (800) 530-2647
            </a>
            .
          </NotConnectedNote>
        </div>
      )}
    </form>
  );
}
