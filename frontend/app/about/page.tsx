import type { Metadata } from "next";

import AboutPage from "@/sections/about/about-page";

export const metadata: Metadata = {
  title: "Aurion Labs | About",
  description: "Systems-focused philosophy for calm, usable, multi-page business websites.",
};

export default function Page() {
  return <AboutPage />;
}
