"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, Phone, User } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import {
  Field,
  FieldAlert,
  NotConnectedNote,
  TextArea,
  checkboxClasses,
} from "@/components/account/fields";

/** amipi.com's contact form: name, phone, email, message, newsletter opt-in
 *  and SMS consent. No backend yet, so submitting says so plainly. */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const missing = ["firstName", "email", "message"].some(
      (k) => !String(data.get(k) ?? "").trim(),
    );
    if (missing) {
      setError("Please add your first name, email and a message.");
      setSubmitted(false);
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
      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-foreground">
        Contact Form
      </h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Field label="First Name" name="firstName" icon={User} placeholder="First Name" autoComplete="given-name" />
        <Field label="Last Name" name="lastName" icon={User} placeholder="Last Name" autoComplete="family-name" />
        <Field label="Phone" name="phone" type="tel" icon={Phone} placeholder="Phone No." autoComplete="tel" />
        <Field label="Email" name="email" type="email" icon={Mail} placeholder="Email ID" autoComplete="email" />
        <TextArea label="Message" name="message" icon={MessageSquare} placeholder="Type here..." className="sm:col-span-2" />
      </div>

      <div className="mt-5 space-y-3 text-[12px] leading-relaxed text-foreground/70">
        <label className="flex cursor-pointer items-start gap-2.5">
          <input type="checkbox" name="newsletter" className={checkboxClasses} />
          Send Me Your Newsletters As Well.
        </label>
        <label className="flex cursor-pointer items-start gap-2.5">
          <input type="checkbox" name="smsConsent" className={checkboxClasses} />
          <span>
            I Consent To Receive SMS From AMIPI The Message Frequency Will Vary And Message And
            Data Rates May Apply. Text HELP For Help. Text STOP To Cancel. Visit For{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-gold-600">
              Privacy Policy
            </Link>{" "}
            And{" "}
            <Link href="/terms-of-use" className="underline underline-offset-2 hover:text-gold-600">
              Terms Of Service
            </Link>
            .
          </span>
        </label>
      </div>

      {error && <FieldAlert>{error}</FieldAlert>}

      <div className="mt-6">
        <PillButton type="submit" variant="dark" size="sm" icon="arrow">
          Submit
        </PillButton>
      </div>

      {submitted && (
        <div className="mt-5">
          <NotConnectedNote>
            The contact form isn&rsquo;t connected yet. Please email{" "}
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
