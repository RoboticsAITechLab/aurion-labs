import type { Metadata } from "next";

import PricingPage from "@/sections/pricing/pricing-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Pricing",
  description: "Scope-based pricing for business websites, booking systems, WhatsApp integration, and operational support.",
};

export default function Page() {
  return <PricingPage />;
}
