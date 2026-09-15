import type { Metadata } from "next";
import { AppointmentForm } from "@/components/contact/AppointmentForm";

export const metadata: Metadata = {
  title: "Contact & Book an Appointment — AMIPI",
  description:
    "Book a private appointment with AMIPI, or get in touch by phone or email - 42 W 48th St, New York, NY.",
};

export default function ContactPage() {
  return (
    <div className="bg-navy-950">
      <AppointmentForm />
    </div>
  );
}
