"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Building2,
  Globe,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Phone,
  Settings,
  Store,
  User,
  UserRound,
} from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { AuthShell } from "./AuthShell";
import {
  checkboxClasses,
  Field,
  FormSection,
  FieldAlert,
  NotConnectedNote,
  Select,
} from "./fields";

const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr."];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
  "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const COUNTRIES = ["United States", "Canada", "Other"];

/** AMIPI's sales representatives, as listed on amipi.com's registration form. */
const REPRESENTATIVES = [
  "Anna Sharma",
  "Daniel Shah (Ext: 396)",
  "Irene B (Ext: 369)",
  "Jerry (Ext: 171)",
  "Johnny DSilva (Ext: 342)",
  "Jyoti Amanna (Ext: 144)",
  "Kate N (Ext: 387)",
  "Krish Jhaveri (Ext: 135)",
  "Nityaa Parmar (Ext: 378)",
  "Ryan (Ext: 378)",
  "Sanjiv Mehta (Ext: 216)",
  "Sankalp Raut (Ext: 315)",
  "Sneha Rawal (Ext: 126)",
  "Sujay Choksi (Ext: 207)",
  "Tarun Pawar",
];

/** At least 8 characters with a number, an upper- and lower-case letter and a symbol. */
const PASSWORD_RULE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
const PASSWORD_HINT =
  "Password should be a minimum of 8 characters with at least 1 number, 1 upper case letter, 1 lower case letter and 1 symbol.";

/**
 * Trade account registration, with the same fields as amipi.com's
 * create-account page, grouped into three cards. The left panel's slide
 * follows the visitor down the form - by scroll position, or by whichever
 * card they are typing in - so the page changes as they go.
 *
 * Validates the password rule and the confirmation client-side. There is no
 * account backend yet, so a valid submit says plainly that online
 * registration isn't connected rather than claiming an account was created.
 * The site's reCAPTCHA isn't reproduced here - it belongs with the real
 * submit endpoint.
 */
export function CreateAccountForm() {
  const [slide, setSlide] = useState(0);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Split the page's scroll range into thirds, one per card, so all three
  // slides are reachable however little the page scrolls. A page too short
  // to scroll leaves it to focus (onActive on each card).
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max < 40) return;
        setSlide(Math.min(2, Math.floor((window.scrollY / max) * 3)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = String(data.get("password") ?? "");
    if (!PASSWORD_RULE.test(password)) {
      setPasswordError(PASSWORD_HINT);
      return;
    }
    if (password !== data.get("confirmPassword")) {
      setPasswordError("Passwords don't match.");
      return;
    }
    setPasswordError(null);
    // TODO: send to the real registration endpoint once one exists.
    setSubmitted(true);
  }

  return (
    <AuthShell
      title={
        <>
          Welcome to <span style={{ color: "#a47a35" }}>AMIPI!</span>
        </>
      }
      subtitle="In a few simple steps you will have unrestricted access to all the goodies this site has to offer."
      activeSlide={slide}
    >
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 rounded-lg bg-[#f7f1e6] px-4 py-2.5 text-center text-xs leading-relaxed text-foreground/70">
          We encourage you to submit detailed information to make your account setup and
          approval process faster. Most registrations are reviewed within 1-2 business days.
          Need immediate assistance? Contact{" "}
          <a href="mailto:support@amipi.com" className="font-semibold hover:text-gold-600">
            support@amipi.com
          </a>{" "}
          or call{" "}
          <a href="tel:+18005302647" className="font-semibold hover:text-gold-600">
            (800) 530-2647
          </a>{" "}
          or{" "}
          <a href="tel:+12123549700" className="font-semibold hover:text-gold-600">
            +1 (212) 354 9700
          </a>
          .
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormSection
            icon={User}
            title="Personal Information"
            subtitle="Enter your basic details to create your account."
            onActive={() => setSlide(0)}
          >
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <Select label="Title" name="title" options={TITLES} defaultValue="Mr." />
              <Field label="First Name*" name="firstName" placeholder="First name" autoComplete="given-name" required />
              <Field label="Last Name*" name="lastName" placeholder="Last name" autoComplete="family-name" required />
            </div>
            <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <Field
                label="Email Address*"
                icon={Mail}
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              <Field
                label="Password*"
                icon={Lock}
                type="password"
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                required
                onChange={() => setPasswordError(null)}
              />
              <Field
                label="Confirm Password*"
                icon={Lock}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                autoComplete="new-password"
                required
                onChange={() => setPasswordError(null)}
              />
            </div>
            {passwordError && <FieldAlert>{passwordError}</FieldAlert>}
          </FormSection>

          <FormSection
            icon={Building2}
            title="Business Details"
            subtitle="Help us understand your business."
            onActive={() => setSlide(1)}
          >
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <Field label="Business Name*" icon={Store} name="business" placeholder="Your business name" autoComplete="organization" required />
              <Field label="Phone No*" icon={Phone} type="tel" name="phone" placeholder="(212) 345-6789" autoComplete="tel" required />
              <Select
                label="Representative"
                icon={UserRound}
                name="representative"
                options={REPRESENTATIVES}
                placeholder="Select representative"
              />
              <Field label="Address 1*" icon={MapPin} name="address1" placeholder="Street address" autoComplete="address-line1" required />
              <Field label="Address 2" icon={MapPin} name="address2" placeholder="Suite, floor (optional)" autoComplete="address-line2" />
              <Field label="City*" icon={Landmark} name="city" placeholder="New York" autoComplete="address-level2" required />
              <Select label="State" icon={MapPin} name="state" options={US_STATES} defaultValue="New York" />
              <Field label="Zip Code*" icon={MapPin} name="zip" placeholder="12345" autoComplete="postal-code" required />
              <Select label="Country" icon={Globe} name="country" options={COUNTRIES} defaultValue="United States" />
            </div>
          </FormSection>

          <FormSection
            icon={Settings}
            title="Additional Preferences"
            subtitle="Let us know what you're interested in."
            onActive={() => setSlide(2)}
          >
            <div className="grid grid-cols-1 gap-2 text-[13px] text-foreground/75 sm:grid-cols-3">
              {["Shopify Diamond Integration", "Shopify Jewelry Integration", "Subscribe to Newsletter"].map(
                (label) => (
                  <label key={label} className="flex cursor-pointer items-start gap-2">
                    <input type="checkbox" name={label} className={checkboxClasses} />
                    {label}
                  </label>
                ),
              )}
            </div>
            <label className="mt-2.5 flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-foreground/75">
              <input type="checkbox" name="smsConsent" className={checkboxClasses} />
              <span>
                I consent to receive SMS from AMIPI. Message frequency may vary and
                message and data rates may apply. Text HELP for help. Text STOP to
                cancel. See our{" "}
                <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-gold-600">
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-of-use" className="underline underline-offset-2 hover:text-gold-600">
                  terms of service
                </Link>
                .
              </span>
            </label>
          </FormSection>

          <div className="flex justify-center">
            <PillButton type="submit" variant="dark" size="sm" icon="arrow">
              Create Account
            </PillButton>
          </div>

          {submitted && (
            <NotConnectedNote>
              Online registration isn&rsquo;t connected yet. To open an account, email{" "}
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

          <p className="text-center text-sm text-foreground/60">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-foreground/80 hover:text-gold-600">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </AuthShell>
  );
}
