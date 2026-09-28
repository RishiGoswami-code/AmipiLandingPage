import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/account/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password — AMIPI",
  description: "Request a password reset link for your AMIPI trade account.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
