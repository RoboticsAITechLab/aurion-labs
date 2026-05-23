import type { Metadata } from "next";

import IndustriesPage from "@/sections/industries/industries-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Industries",
  description: "Industry-specific website structure for clinics, gyms, restaurants, salons, real estate, medical teams, coaching, and business services.",
};

export default function Page() {
  return <IndustriesPage />;
}
