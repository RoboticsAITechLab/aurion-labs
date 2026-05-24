import type { Metadata } from "next";

import ServicesPage from "@/sections/services/services-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Services",
  description: "Aurion Labs builds business websites, booking systems, WhatsApp handoff flows, and lightweight operational systems for local businesses.",
};

export default function Page() {
  return <ServicesPage />;
}