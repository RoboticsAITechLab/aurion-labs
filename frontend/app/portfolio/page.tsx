import type { Metadata } from "next";

import PortfolioPage from "@/sections/portfolio/portfolio-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Portfolio",
  description: "Conceptual portfolio studies for business websites, dashboards, and operational interfaces.",
};

export default function Page() {
  return <PortfolioPage />;
}
