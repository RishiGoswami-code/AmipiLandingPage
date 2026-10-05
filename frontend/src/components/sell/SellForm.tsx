"use client";

import { useState } from "react";
import {
  CircleDollarSign,
  FileText,
  Gem,
  Hash,
  Mail,
  Package,
  Paperclip,
  Phone,
  Scale,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import {
  ChipGroup,
  Field,
  FieldAlert,
  FormSection,
  NotConnectedNote,
  Select,
  TextArea,
} from "@/components/account/fields";

type Kind = "Loose Diamonds" | "Diamond Ring" | "Diamond Earrings" | "Other";

const KINDS: { kind: Kind; icon: LucideIcon }[] = [
  { kind: "Loose Diamonds", icon: Gem },
  { kind: "Diamond Ring", icon: Sparkles },
  { kind: "Diamond Earrings", icon: Sparkles },
  { kind: "Other", icon: Package },
];

/* Option lists as amipi.com's sell form has them. */
const LABS = ["GIA", "IGI", "AGS", "HRD", "EGLUSA", "INTERNAL GRADING"];
const SHAPES = ["Round", "Oval", "Cushion", "Princess", "Emerald", "Marquise", "Asscher", "Radiant", "Pear", "All Others"];
const COLORS = ["D", "E", "F", "G", "H", "I", "J", "K", "L+"];
const CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "SI3", "I1+"];
const METAL_TYPES = ["14K", "18K", "Platinum", "Silver"];
const METAL_COLORS = ["Rose Gold", "Two Tone", "White Gold", "Yellow Gold"];

/**
 * amipi.com's "Sell your diamond and jewelry" wizard, condensed: pick what you
 * are selling, answer only the questions for that kind of item, then leave
 * contact details. The original walks through every grading field (cut,
 * polish, symmetry, fluorescence, fancy colours, measurements); those are the
 * details a grading report already carries, so here a report number stands in
 * for them and ungraded stones get the core four questions.
 *
 * No backend yet: a complete submission shows an honest "not connected" note.
 */
export function SellForm() {
  const [kind, setKind] = useState<Kind | null>(null);
  const [hasReport, setHasReport] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const required = ["askingAmount", "name", "email", "phone"];
    if (kind === "Other") required.push("description");
    if (kind === "Loose Diamonds" && hasReport === "Yes") required.push("lab");
    if (kind === "Loose Diamonds" && hasReport === "No") required.push("shape", "color", "clarity");
    if (kind === "Diamond Ring" || kind === "Diamond Earrings") required.push("metalType", "totalWeight");

    if (!kind || (kind === "Loose Diamonds" && !hasReport) || required.some((k) => !String(data.get(k) ?? "").trim())) {
      setError("Please fill in every field marked * before submitting.");
      setSubmitted(false);
      return;
    }
    setError(null);
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormSection icon={Gem} title="What are you selling?" subtitle="Pick one to see the questions for it.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KINDS.map(({ kind: k, icon: Icon }) => (
            <label key={k} className="cursor-pointer">
              <input
                type="radio"
                name="kind"
                value={k}
                checked={kind === k}
                onChange={() => {
                  setKind(k);
                  setSubmitted(false);
                }}
                className="peer sr-only"
              />
              <span className="flex h-full flex-col items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-5 text-center text-[13px] font-medium text-foreground/80 transition-all peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#d4ae5c] hover:-translate-y-0.5 hover:border-[#d4ae5c]">
                <Icon className="h-6 w-6" strokeWidth={1.4} />
                {k}
              </span>
            </label>
          ))}
        </div>
      </FormSection>

      {kind && (
        <FormSection
          icon={FileText}
          title={kind === "Loose Diamonds" ? "Diamond Details" : "Product Details"}
          subtitle="Fields marked * are required."
        >
          <div className="space-y-5">
            {kind === "Loose Diamonds" && (
              <>
                <ChipGroup
                  label="Does the diamond have a grading report? *"
                  name="hasReport"
                  options={["Yes", "No"]}
                  value={hasReport}
                  onChange={setHasReport}
                />
                {hasReport === "Yes" && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Select label="Grading Lab *" name="lab" options={LABS} placeholder="Select" />
                    <Field label="Report No" name="reportNo" icon={Hash} placeholder="Report No" />
                    <Field label="How much does the diamond weigh?" name="weight" icon={Scale} placeholder="0.00 ct" inputMode="decimal" />
                  </div>
                )}
                {hasReport === "No" && (
                  <>
                    <Field label="How much does the diamond weigh?" name="weight" icon={Scale} placeholder="0.00 ct" inputMode="decimal" className="sm:max-w-xs" />
                    <ChipGroup label="Shape *" name="shape" options={SHAPES} />
                    <ChipGroup label="Color *" name="color" options={COLORS} />
                    <ChipGroup label="Clarity *" name="clarity" options={CLARITIES} />
                  </>
                )}
              </>
            )}

            {(kind === "Diamond Ring" || kind === "Diamond Earrings") && (
              <>
                <ChipGroup label="Metal Type *" name="metalType" options={METAL_TYPES} />
                <ChipGroup label="Metal Color" name="metalColor" options={METAL_COLORS} />
                <Field
                  label="What is the total diamond weight of the jewelry item? *"
                  name="totalWeight"
                  icon={Scale}
                  placeholder="0.0"
                  inputMode="decimal"
                  className="sm:max-w-md"
                />
              </>
            )}

            {kind === "Other" && (
              <TextArea label="What are you selling? *" name="description" placeholder="Describe the item" />
            )}

            <Field
              label="Total Asking Amount *"
              name="askingAmount"
              icon={CircleDollarSign}
              placeholder="Total Asking Amount"
              inputMode="decimal"
              className="sm:max-w-xs"
            />
            <TextArea label="Additional Information" name="additionalInformation" />
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-black/15 bg-white px-4 py-3 text-[12px] text-foreground/65 transition-colors hover:border-[#d4ae5c]">
              <Paperclip className="h-4 w-4 shrink-0 text-foreground/45" />
              Attach a grading report or photos (optional)
              <input type="file" name="files" multiple accept="image/*,.pdf" className="sr-only" />
            </label>
          </div>
        </FormSection>
      )}

      {kind && (
        <FormSection icon={User} title="Your Contact Information" subtitle="We will touch base with you shortly.">
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Name *" name="name" icon={User} placeholder="Name" autoComplete="name" />
            <Field label="Email *" name="email" type="email" icon={Mail} placeholder="Email" autoComplete="email" />
            <Field label="Phone *" name="phone" type="tel" icon={Phone} placeholder="Phone" autoComplete="tel" />
          </div>
        </FormSection>
      )}

      {error && <FieldAlert>{error}</FieldAlert>}

      {kind && (
        <div className="flex justify-center pt-2">
          <PillButton type="submit" variant="dark" size="sm" icon="arrow">
            Submit
          </PillButton>
        </div>
      )}

      {submitted && (
        <NotConnectedNote>
          Online selling isn&rsquo;t connected yet. Please email your item details and asking
          price to{" "}
          <a href="mailto:info@amipi.com" className="font-semibold">
            info@amipi.com
          </a>{" "}
          or call{" "}
          <a href="tel:+18005302647" className="font-semibold">
            +1 (800) 530-2647
          </a>
          .
        </NotConnectedNote>
      )}
    </form>
  );
}
