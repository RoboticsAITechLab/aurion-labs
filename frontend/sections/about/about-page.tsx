"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPinned, Users, Smartphone, Sparkles, CalendarClock, Server, ArrowUpRight } from "lucide-react";

import Container from "@/components/common/container";
import ProofStrip from "@/components/common/proof-strip";
import OperationalVisual from "@/components/common/operational-visual";
import SectionWrapper from "@/components/common/section-wrapper";
import SectionHeading from "@/components/common/section-heading";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Box from "@/components/ui/box";

function Hero() {
  return (
    <SectionWrapper contained={false} className="relative overflow-hidden pt-28 pb-28 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-44" role="region" aria-labelledby="about-hero-title">
      <Container>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">ABOUT</p>
              <h1 id="about-hero-title" className="mt-8 text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-[4.2rem]">
                We build websites and systems that help local businesses grow.
              </h1>
              <p className="mt-8 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
                Aurion Labs focuses on the practical side of digital growth: clearer websites, stronger booking flows, better WhatsApp handoff, and simpler operational systems.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="#approach" aria-label="Review Operational Approach">
                    See Our Approach
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">Direct communication, senior-led delivery</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08 }} viewport={{ once: true }}>
            <OperationalVisual
              eyebrow="About the work"
              title="Operational websites built for clarity and follow-through."
              subtitle="The focus is not visual noise. The focus is clearer customer movement, easier staff handoff, and a more reliable growth system."
              statusLabel="Delivery model"
              status="Strategy → Build → Support"
              steps={[
                "We map the offer, the customer decision path, and the handoff before writing the interface.",
                "We shape the pages around mobile behavior so the experience stays readable on smaller screens.",
                "We keep support in view so the site stays useful after launch, not just at handoff.",
              ]}
              highlights={[
                { label: "Focus", value: "Local growth" },
                { label: "Style", value: "Enterprise calm" },
                { label: "Support", value: "Post-launch" },
              ]}
            />
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function OperationalPhilosophy() {
  return (
    <SectionWrapper role="region" aria-labelledby="operational-philosophy-title">
      <Container>
        <div className="mx-auto max-w-6xl">
          <OperationalVisual
            eyebrow="Operational philosophy"
            title="Clarity, conversion, and reliability stay in the same frame."
            subtitle="Interfaces should help people understand the offer, take action faster, and stay easy for the business to run."
            statusLabel="Principles"
            status="Clarity · Structure · Movement"
            steps={[
              "Clarity keeps the offer readable before the customer has to think too hard.",
              "Structure keeps the flow stable as the site grows or expands into new services.",
              "Movement keeps action paths obvious on desktop and mobile without adding clutter.",
            ]}
            highlights={[
              { label: "Clarity", value: "Message first" },
              { label: "Structure", value: "Operational" },
              { label: "Movement", value: "Lower friction" },
            ]}
          />
        </div>
      </Container>
    </SectionWrapper>
  );
}

function WhyAurionLabs() {
  return (
    <SectionWrapper className="pt-6 pb-6">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h3 className="text-2xl font-semibold text-slate-900">Why Aurion Labs Exists</h3>
          <p className="mt-6 text-base text-slate-700">Most small business websites are built like visual brochures. They look acceptable, but operationally they fail.</p>

          <ul className="mt-6 space-y-3 text-sm text-slate-600" role="list" aria-label="Common website problems">
            <li role="listitem">— Navigation becomes unclear.</li>
            <li role="listitem">— Mobile interaction becomes frustrating.</li>
            <li role="listitem">— Booking or contact flows feel disconnected.</li>
            <li role="listitem">— Customers leave before taking action.</li>
          </ul>

          <p className="mt-6 text-base text-slate-700">Aurion Labs was built around a different idea: quieter operational movement.</p>
          <p className="mt-4 text-sm text-slate-500">The goal is not more interface. The goal is clearer movement between the business and the customer.</p>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function WhatWeFocusOn() {
  const cards = [
    { title: "Operational Flow", text: "Simpler movement between sections, decisions, and customer actions.", icon: CalendarClock },
    { title: "Interaction Clarity", text: "Clear hierarchy and lower-friction movement between actions.", icon: Sparkles },
    { title: "Mobile Structure", text: "Cleaner responsive pacing across devices and screen sizes.", icon: Smartphone },
    { title: "Performance Layers", text: "Faster loading, cleaner rendering, and calmer interaction rhythm.", icon: MapPinned },
    { title: "Business Structure", text: "Websites shaped around the operational needs of each category.", icon: Users },
    { title: "Operational Support", text: "Hosting, maintenance, monitoring, and continuity after deployment.", icon: Server },
  ];

  return (
    <SectionWrapper className="pt-6 pb-6">
      <Container>
        <SectionHeading eyebrow="What We Focus On" title="Operational systems and structural design" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.article key={c.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.04 }} role="article" aria-labelledby={`focus-${i}`}>
                <Box className="p-6" variant="card">
                  <div className="inline-flex items-center justify-center rounded-2xl bg-slate-50 p-3" aria-hidden="true">
                  <Icon className="size-5 text-slate-700" aria-hidden="true" />
                </div>
                  <h4 id={`focus-${i}`} className="mt-4 font-semibold text-slate-900">{c.title}</h4>
                  <p className="mt-3 text-sm text-slate-600">{c.text}</p>
                </Box>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}

function FounderAndAfterLaunch() {
  return (
    <SectionWrapper className="pt-6 pb-6">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Founder Credibility</p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">Senior-led delivery with direct communication.</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">Projects are handled like business infrastructure, not a creative experiment. The work stays focused on clarity, conversion, and supportability.</p>
              </div>

              <Box className="rounded-[1.8rem]" variant="card">
                <div className="bg-slate-950 p-5 rounded-[1.4rem] text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">What Happens After Launch</p>
                  <div className="mt-5 space-y-3 text-sm text-slate-200">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Monitoring and uptime checks</div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Updates and content changes</div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Workflow refinement and support</div>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function BuiltForLocalBusinesses() {
  const labels = ["Clinics", "Gyms", "Restaurants", "Salons", "Coaches", "Local Brands"];
  return (
    <SectionWrapper>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-semibold text-slate-900">Built for Local Businesses</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            {labels.map((l) => (
              <span key={l} className="rounded-full border border-slate-200 px-4 py-2">{l}</span>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">Systems designed to feel calmer, easier to navigate, and simpler to run.</p>
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
          <h2 className="text-[clamp(2.6rem,8vw,6rem)] leading-[0.9] font-semibold text-slate-900">Better systems reduce hesitation before action.</h2>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function HowWeApproachWork() {
  return (
    <SectionWrapper>
      <Container>
        <div className="mx-auto max-w-3xl text-center" id="approach">
          <h4 className="text-sm font-semibold text-slate-500">How We Approach Work</h4>
            <p className="mt-8 text-lg font-semibold text-slate-900">Discover — Plan — Build — Support</p>
          <p className="mt-6 text-sm text-slate-600">Every project begins with understanding how the business actually gets leads, bookings, and repeat customers.</p>
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
          <h3 className="text-3xl font-semibold text-slate-900">Clearer Growth</h3>
          <p className="mt-4 text-base text-slate-600">The goal is not more digital noise. The goal is more leads, better bookings, and easier customer movement.</p>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/contact" aria-label="Start a project with Aurion Labs">Start A Project</Link>
            </Button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">
        <Hero />
        <OperationalPhilosophy />
        <WhyAurionLabs />
        <WhatWeFocusOn />
        <BuiltForLocalBusinesses />
        <SectionWrapper density="compact" className="pt-0 pb-12">
          <ProofStrip
            eyebrow="Why Businesses Choose Aurion Labs"
            title="Delivery stays direct, structured, and supportable."
            subtitle="The work is handled like operational infrastructure, with clear communication and a post-launch support mindset."
            items={[
              { label: "Delivery", value: "Senior-led", detail: "Direct communication, no hidden process" },
              { label: "Approach", value: "Clarity first", detail: "Reduce friction before adding complexity" },
              { label: "After launch", value: "Supported", detail: "Maintenance, edits, and continuity" },
              { label: "Audience", value: "Local business", detail: "Built for inquiries, bookings, and lead flow" },
            ]}
          />
        </SectionWrapper>
        <FounderAndAfterLaunch />
        <TypographyInterruption />
        <HowWeApproachWork />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

