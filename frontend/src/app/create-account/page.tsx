import type { Metadata } from "next";
import { CreateAccountForm } from "@/components/account/CreateAccountForm";

export const metadata: Metadata = {
  title: "Create an Account — AMIPI",
  description:
    "Register for an AMIPI trade account - most registrations are reviewed within 1-2 business days.",
};

export default function CreateAccountPage() {
  return <CreateAccountForm />;
}
