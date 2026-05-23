"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Mail, Server, ShieldCheck, CheckCircle2 } from "lucide-react";

import Container from "@/components/common/container";
import SectionWrapper from "@/components/common/section-wrapper";
import SectionHeading from "@/components/common/section-heading";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <SectionWrapper contained={false} className="relative overflow-hidden pt-28 pb-28 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[48rem] bg-[radial-gradient(circle_at_top,_rgba(2,6,23,0.04),_transparent_42%)]" />
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">PRICING</p>
          <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-[4.5rem]">
            Digital systems structured around operational need.
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
            Pricing depends on workflow depth, interaction structure, infrastructure requirements, and the level of operational support involved.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="#scope">
                Review Operational Scope
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-slate-200 px-6 text-slate-700">
              <Link href="/contact">Discuss A Project</Link>
            </Button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function OperationalSupportLayer() {
  return (
    <SectionWrapper className="pt-8 pb-12">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Operational Support Layer</p>
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">Hosting, monitoring, and maintenance as part of the system.</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Infrastructure remains part of the operational system itself.</p>
              </div>

              <div className="flex items-start justify-end">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Hosting</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Monitoring</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function IncludedInEveryBuild() {
  const items = [
    "Responsive Design",
    "SSL / HTTPS",
    "Basic SEO Structure",
    "WhatsApp Integration",
    "Deployment Setup",
    "Performance Optimization",
  ];

  return (
    <SectionWrapper>
      <Container>
        <SectionHeading eyebrow="Included In Every Build" title="Every project includes the foundational infrastructure required for a stable, responsive, and production-ready business website." />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it} className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700">
              {it}
            </div>
          ))}

          <p className="col-span-full mt-6 text-sm text-slate-500">Quiet operational foundations.</p>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function InterfaceFoundation() {
  return (
    <SectionWrapper contained={false} className="pt-6 pb-6">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Interface Foundation</p>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">Simple business websites for local brands and shops.</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">Targeted at local businesses — shops, gyms, salons, clinics, restaurants, coaches, and small service brands. Includes a responsive website with homepage, about/services page, contact/WhatsApp integration, mobile optimization, basic SEO setup, and deployment.</p>

            <div className="mt-8 flex flex-col items-start gap-3">
              <div className="text-2xl font-semibold text-slate-900">₹4K ─ ₹12K+</div>
              <div className="text-sm text-slate-500">1–2 pages start at the lower range — additional pages and features increase cost.</div>
            </div>
            <p className="mt-6 text-sm text-slate-500">Cleaner digital foundations for local businesses.</p>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function OperationalLayerBlock() {
  return (
    <SectionWrapper>
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Operational Layer</p>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">Structured systems for booking, intake, and admin workflows.</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">For businesses that require booking systems, inquiry routing, CMS/admin structure, and operational mapping. Pricing scales with workflow complexity, booking logic, admin needs, integrations, and page count.</p>

            <div className="mt-8 flex items-baseline gap-6">
              <div className="text-2xl font-semibold text-slate-900">₹15K ─ ₹60K+</div>
              <div className="text-sm text-slate-500">Scaled by workflow complexity and integrations</div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function CustomInfrastructure() {
  return (
    <SectionWrapper className="pt-6 pb-6">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Custom Infrastructure</p>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">Advanced systems for scalable workflows, integrations, and custom logic.</h3>
            <p className="mt-4 text-base leading-7 text-slate-600">Consultation based — infrastructure-first architecture for businesses that require layered operational logic and bespoke integrations.</p>
            <div className="mt-8 text-sm text-slate-500">Consultation Based — Infrastructure-first architecture</div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function PricingScalesWithStructure() {
  return (
    <SectionWrapper>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-semibold text-slate-900">Pricing Scales With Structure</h3>
          <p className="mt-6 text-sm text-slate-600">Prices increase based on the number of pages, booking and intake complexity, admin/dashboard requirements, custom integrations, operational workflows, content structure, and scalability needs.</p>
          <p className="mt-6 text-sm text-slate-500">Larger operational systems require deeper structure.</p>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function RecurringInfrastructure() {
  return (
    <SectionWrapper>
      <Container>
        <SectionHeading eyebrow="Recurring Infrastructure" title="Optional operational services and recurring costs." />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
            <Server className="size-5 text-slate-700" />
            <div>
              <h4 className="font-semibold text-slate-900">Custom Domain</h4>
              <p className="mt-3 text-sm text-slate-600">.com / .in / premium TLDs — charged separately yearly. Yearly renewal.</p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
            <Mail className="size-5 text-slate-700" />
            <div>
              <h4 className="font-semibold text-slate-900">Business Email</h4>
              <p className="mt-3 text-sm text-slate-600">hello@business.com — managed email systems with monthly / yearly billing.</p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
            <Globe className="size-5 text-slate-700" />
            <div>
              <h4 className="font-semibold text-slate-900">Hosting Upgrade</h4>
              <p className="mt-3 text-sm text-slate-600">Higher traffic handling, advanced infrastructure, operational scaling.</p>
            </div>
          </article>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function OperationalSupportPlans() {
  return (
    <SectionWrapper className="pt-6 pb-6">
      <Container>
        <SectionHeading eyebrow="Operational Support" title="Hosting, monitoring, updates, backups, and maintenance structured as ongoing operational continuity." />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Essential</p>
            <h4 className="mt-4 text-xl font-semibold text-slate-900">Hosting · SSL · Backups · Uptime checks</h4>
            <div className="mt-4 text-sm text-slate-600">Monthly — ₹500 ─ ₹2K / month</div>
          </article>

          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Managed</p>
            <h4 className="mt-4 text-xl font-semibold text-slate-900">Monitoring · Edits · Maintenance · Updates</h4>
            <div className="mt-4 text-sm text-slate-600">Quarterly / Half-Yearly — ₹3K ─ ₹12K</div>
          </article>

          <article className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Priority</p>
            <h4 className="mt-4 text-xl font-semibold text-slate-900">Priority support · Faster revisions · Optimization reviews</h4>
            <div className="mt-4 text-sm text-slate-600">Yearly — Custom</div>
          </article>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function WhatShapesCost() {
  return (
    <SectionWrapper>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-semibold text-slate-900">What Shapes Cost</h3>
          <p className="mt-6 text-sm text-slate-600">Pages — Workflow Complexity — Integrations — Operational Layers</p>
          <p className="mt-2 text-sm text-slate-600">Content Systems — Mobile Structure — Scalability — Maintenance</p>
          <p className="mt-6 text-sm text-slate-500">Better systems require clearer structure.</p>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function DeliveryFlow() {
  return (
    <SectionWrapper>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h4 className="text-sm font-semibold text-slate-500">Delivery Flow</h4>
          <p className="mt-8 text-lg font-semibold text-slate-900">Consultation — Structure — Build — Launch</p>
          <p className="mt-6 text-sm text-slate-600">Every project begins with operational understanding.</p>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function TypographyInterruption() {
  return (
    <SectionWrapper contained={false} className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.9] font-semibold text-slate-900">Better systems reduce operational drag.</h2>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function FinalCTA() {
  return (
    <SectionWrapper className="pt-12 pb-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-semibold text-slate-900">Quieter Operations</h3>
          <p className="mt-4 text-base text-slate-600">The goal is not more interface. The goal is smoother operational movement.</p>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/contact">Start A Project</Link>
            </Button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground">
        <Hero />
        <OperationalSupportLayer />
        <IncludedInEveryBuild />
        <InterfaceFoundation />
        <OperationalLayerBlock />
        <CustomInfrastructure />
        <RecurringInfrastructure />
        <OperationalSupportPlans />
        <WhatShapesCost />
        <DeliveryFlow />
        <TypographyInterruption />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
