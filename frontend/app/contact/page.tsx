import type { Metadata } from "next";

import ContactPage from "@/sections/contact/contact-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Contact",
  description: "Consultation-focused contact page for project inquiries and scope reviews.",
};

export default function Page() {
  return <ContactPage />;
}
