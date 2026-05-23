import type { Metadata } from "next";

import ServicesPage from "@/sections/services/services-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Services",
  description: "Enterprise services for business websites, booking systems, and operational website structure.",
};

export default function Page() {
  return <ServicesPage />;
}