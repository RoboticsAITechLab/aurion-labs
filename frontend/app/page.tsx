import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ProofStrip from "@/components/common/proof-strip";

import HeroSection from "@/sections/home/hero-section";
import IndustriesSection from "@/sections/home/industries-section";
import ServicesSection from "@/sections/home/services-section";
import ProcessSection from "@/sections/home/process-section";
import PortfolioSection from "@/sections/home/portfolio-section";
import CTASection from "@/sections/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="top" className="bg-background">
        <HeroSection />
        <section className="px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ProofStrip
              eyebrow="Operational Trust"
              title="Built to run week after week, not just look good"
              subtitle="Quick response, predictable launches, and ongoing support so your site becomes an asset — not another maintenance task."
              items={[
                { label: "Response", value: "24–48 hrs", detail: "Initial review and qualification" },
                { label: "Launch", value: "2–6 weeks", detail: "Typical timeline for sites + booking flows" },
                { label: "Operate", value: "Monthly", detail: "Monitoring, updates and routing" },
              ]}
            />
          </div>
        </section>
        <IndustriesSection />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}