import type { Metadata } from "next";

import IndustriesPage from "@/sections/industries/industries-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Industries",
  description: "Industry-specific website messaging and conversion systems for clinics, gyms, restaurants, salons, real estate, coaching, and local service businesses.",
};

export default function Page() {
  return <IndustriesPage />;
}
