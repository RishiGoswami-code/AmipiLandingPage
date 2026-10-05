import type { Metadata } from "next";
import { LoginForm } from "@/components/account/LoginForm";

export const metadata: Metadata = {
  title: "Login — AMIPI",
  description: "Sign in to your AMIPI trade account.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
