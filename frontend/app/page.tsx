import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import HeroSection from "@/sections/home/hero-section";
import IndustriesSection from "@/sections/home/industries-section";
import ServicesSection from "@/sections/home/services-section";
import PortfolioSection from "@/sections/home/portfolio-section";
import CTASection from "@/sections/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="top" className="bg-background">
        <HeroSection />
        <IndustriesSection />
        <ServicesSection />
        <PortfolioSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}