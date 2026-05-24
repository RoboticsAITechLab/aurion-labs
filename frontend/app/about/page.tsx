import type { Metadata } from "next";

import AboutPage from "@/sections/about/about-page";

export const metadata: Metadata = {
  title: "Aurion Labs | About",
  description: "Aurion Labs helps local businesses grow with clearer websites, stronger booking flows, and practical operational systems.",
};

export default function Page() {
  return <AboutPage />;
}
