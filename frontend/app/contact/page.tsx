import type { Metadata } from "next";

import ContactPage from "@/sections/contact/contact-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Contact",
  description: "Contact Aurion Labs to discuss business websites, booking systems, WhatsApp integration, and operational support.",
};

export default function Page() {
  return <ContactPage />;
}
