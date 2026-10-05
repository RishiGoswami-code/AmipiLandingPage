"use client";

import { useState, type FormEvent } from "react";
import { KeyRound, Mail } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { AuthShell } from "./AuthShell";
import { Field, FormSection, NotConnectedNote } from "./fields";

/**
 * Password reset request, with the same wording and actions as amipi.com's
 * forgot-password box: an email field, then Forgot Password, Re-Login and
 * Registration.
 *
 * There is no account backend yet, so submitting says plainly that reset
 * emails aren't connected rather than claiming one was sent. The site's
 * reCAPTCHA "security code" belongs with the real endpoint.
 */
export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send to the real password-reset endpoint once one exists.
    setSubmitted(true);
  }

  return (
    <AuthShell
      title={
        <>
          Forgot <span style={{ color: "#a47a35" }}>Password</span>
        </>
      }
      subtitle="Please enter your email to receive a password reset link. Remember to check your Spam folder as well."
      centered
    >
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-4">
        <FormSection
          icon={KeyRound}
          title="Reset Your Password"
          subtitle="We'll email you a link to set a new one."
        >
          <Field
            label="Email"
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email ID"
            autoComplete="email"
            required
          />
        </FormSection>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <PillButton type="submit" variant="dark" size="sm" icon="arrow">
            Forgot Password
          </PillButton>
          <PillButton href="/login" variant="gold" size="sm">
            Re-Login
          </PillButton>
          <PillButton href="/register" variant="gold" size="sm">
            Registration
          </PillButton>
        </div>

        {submitted && (
          <NotConnectedNote>
            Password reset emails aren&rsquo;t connected yet. For help with your account,
            email{" "}
            <a href="mailto:support@amipi.com" className="font-semibold">
              support@amipi.com
            </a>{" "}
            or call{" "}
            <a href="tel:+18005302647" className="font-semibold">
              (800) 530-2647
            </a>
            .
          </NotConnectedNote>
        )}
      </form>
    </AuthShell>
  );
}
