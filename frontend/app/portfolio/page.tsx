import type { Metadata } from "next";

import PortfolioPage from "@/sections/portfolio/portfolio-page";

export const metadata: Metadata = {
  title: "Aurion Labs | Portfolio",
  description: "Example website and booking system concepts for local businesses that need clearer leads, trust, and customer action.",
};

export default function Page() {
  return <PortfolioPage />;
}
