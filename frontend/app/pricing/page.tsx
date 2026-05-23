import type { Metadata } from "next";

import PricingPage from "@/sections/pricing/pricing-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Pricing",
  description: "Scope-first pricing architecture for consultation-led website and systems work.",
};

export default function Page() {
  return <PricingPage />;
}
