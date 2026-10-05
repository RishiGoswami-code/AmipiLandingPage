"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Link2, Lock, LogIn, Mail } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { AuthShell } from "./AuthShell";
import { Field, FormSection, NotConnectedNote, Select } from "./fields";

/** Where to land after signing in, as on amipi.com's login box. */
const QUICK_LINKS = [
  "Certified NATURAL Diamonds",
  "Make a Payment",
  "My Cart",
  "Diamond Shortlist",
  "Jewelry Wishlist",
  "My Orders",
];

/**
 * Trade login, in the same split layout as account creation: email,
 * password, an optional "Quick Links" landing page, then New User / Forgot
 * Password and the Login button.
 *
 * There is no account backend yet, so submitting validates the fields and
 * then says plainly that online sign-in isn't connected, rather than
 * pretending to log anyone in.
 */
export function LoginForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send to the real auth endpoint once one exists.
    setSubmitted(true);
  }

  return (
    <AuthShell
      title={
        <>
          Welcome
          <br />
          Back
        </>
      }
      subtitle="Sign in to your AMIPI trade account."
      centered
    >
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-4">
        <FormSection icon={LogIn} title="Sign In" subtitle="Enter your account email and password.">
          <div className="space-y-2.5">
            <Field
              label="Email ID"
              icon={Mail}
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <Field
              label="Password"
              icon={Lock}
              type="password"
              name="password"
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
            <Select
              label="Quick Links"
              icon={Link2}
              name="quickLink"
              options={QUICK_LINKS}
              placeholder="Go to after signing in (optional)"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-[13px]">
            <Link
              href="/create-account"
              className="font-semibold text-foreground/75 transition-colors hover:text-gold-600"
            >
              New User
            </Link>
            <Link
              href="/forgot-password"
              className="text-foreground/65 transition-colors hover:text-gold-600"
            >
              Forgot Password?
            </Link>
          </div>
        </FormSection>

        <div className="flex justify-center">
          <PillButton type="submit" variant="dark" size="sm" icon="dot">
            Login
          </PillButton>
        </div>

        {submitted && (
          <NotConnectedNote>
            Online sign-in isn&rsquo;t connected yet. For account help, call{" "}
            <a href="tel:+18005302647" className="font-semibold">
              (800) 530-2647
            </a>{" "}
            or email{" "}
            <a href="mailto:support@amipi.com" className="font-semibold">
              support@amipi.com
            </a>
            .
          </NotConnectedNote>
        )}
      </form>
    </AuthShell>
  );
}
