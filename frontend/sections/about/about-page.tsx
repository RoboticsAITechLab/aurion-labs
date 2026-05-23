"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPinned, Users, Smartphone, Sparkles, CalendarClock, Server, ArrowUpRight } from "lucide-react";

import Container from "@/components/common/container";
import SectionWrapper from "@/components/common/section-wrapper";
import SectionHeading from "@/components/common/section-heading";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <SectionWrapper contained={false} className="relative overflow-hidden pt-28 pb-28 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-44" role="region" aria-labelledby="about-hero-title">
      <Container>
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">ABOUT</p>
            <h1 id="about-hero-title" className="mx-auto mt-8 max-w-3xl text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-[4.2rem]">
              Systems designed around clarity, movement, and use.
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
              Aurion Labs focuses on building quieter digital systems for local businesses that need structure, trust, and operational clarity.
            </p>

            <div className="mt-12 flex items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="#approach" aria-label="Review Operational Approach">
                  Review Operational Approach
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

function OperationalPhilosophy() {
  return (
    <SectionWrapper role="region" aria-labelledby="operational-philosophy-title">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Operational Philosophy</p>
            <h2 id="operational-philosophy-title" className="mt-6 text-3xl font-semibold text-slate-900">Clarity · Structure · Movement</h2>
            <p className="mt-4 text-base text-slate-600">Interfaces should reduce friction, not introduce more of it.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-3">
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">Clarity</motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.04 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">Structure</motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">Movement</motion.div>
            </div>
          </div>
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
              <motion.article key={c.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.04 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" role="article" aria-labelledby={`focus-${i}`}>
                <div className="inline-flex items-center justify-center rounded-2xl bg-slate-50 p-3" aria-hidden="true">
                  <Icon className="size-5 text-slate-700" aria-hidden="true" />
                </div>
                <h4 id={`focus-${i}`} className="mt-4 font-semibold text-slate-900">{c.title}</h4>
                <p className="mt-3 text-sm text-slate-600">{c.text}</p>
              </motion.article>
            );
          })}
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
          <p className="mt-8 text-lg font-semibold text-slate-900">Consultation — Structure — Build — Support</p>
          <p className="mt-6 text-sm text-slate-600">Every project begins with understanding how the business actually operates day to day.</p>
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
          <h3 className="text-3xl font-semibold text-slate-900">Quieter Systems</h3>
          <p className="mt-4 text-base text-slate-600">The goal is not more digital noise. The goal is calmer operational movement.</p>
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
        <TypographyInterruption />
        <HowWeApproachWork />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

