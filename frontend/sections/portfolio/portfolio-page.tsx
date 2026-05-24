"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowUpRight, Home, MonitorSmartphone, UtensilsCrossed } from "lucide-react";

import Container from "@/components/common/container";
import SectionHeading from "@/components/common/section-heading";
import SectionWrapper from "@/components/common/section-wrapper";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

const studies = [
  {
    brand: "NovaCare Clinic",
    title: "Clinic booking structure",
    summary: "Appointment-first interaction with calmer intake and visible next steps.",
    focus: ["Scheduling", "Intake", "WhatsApp follow-up", "Contact"],
    icon: MonitorSmartphone,
    accent: "from-blue-50 to-white",
    note: "Reduced inquiry friction",
    outcome: "More appointment requests and fewer missed leads",
    problem: "Patients were unsure where to start and the booking path was too hidden.",
  },
  {
    brand: "UrbanFit Gym",
    title: "Membership and class flow",
    summary: "Membership-first structure with clearer class visibility and trial signup entry points.",
    focus: ["Memberships", "Classes", "Trial booking"],
    icon: UtensilsCrossed,
    accent: "from-amber-50 to-white",
    note: "Higher mobile conversion momentum",
    outcome: "Trial bookings became easier to complete on mobile",
    problem: "The offer was strong, but membership and class actions were diluted by too much filler.",
  },
  {
    brand: "Elevate Salon",
    title: "Salon booking and gallery flow",
    summary: "Visual-first presentation with a shorter path from gallery to booking and WhatsApp inquiry.",
    focus: ["Gallery", "Booking", "Availability"],
    icon: Home,
    accent: "from-emerald-50 to-white",
    note: "Cleaner booking decisions",
    outcome: "Visitors could check availability and act faster",
    problem: "The business looked premium, but the booking path was not obvious enough.",
  },
];

const studiesGrid = [
  { title: "Mobile Intake", text: "Shorter onboarding and fewer abandoned starts" },
  { title: "Booking Flow", text: "Simpler decision pacing and stronger completion" },
  { title: "Navigation Flow", text: "Clear hierarchy and quieter paths" },
];

const rhythmLines = ["Intake ─ Routing ─ Scheduling", "Contact ─ Decision ─ Confirmation"];

const explorationCards = [
  {
    title: "Motion Fitness",
    text: "A conversion-first gym flow for memberships, classes, and trial requests.",
    tags: ["Memberships", "Programs"],
  },
  {
    title: "Prime Dental",
    text: "A trust-first clinic structure for treatment pages, consultation requests, and WhatsApp handoff.",
    tags: ["Consultation", "Trust"],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Navbar />

      <main className="bg-background text-foreground">
        <SectionWrapper contained={false} className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_50%)]" />
          <Container>
            <div className="mx-auto max-w-6xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Portfolio</p>
              <h1 className="mx-auto mt-8 max-w-5xl text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-8xl">
                Example systems built to drive leads, bookings, and trust.
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg lg:text-lg">
                These are realistic demo brands and representative case studies. They show how the website can support customer action, business operations, and clearer decision-making.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/contact">
                    Explore Example Systems
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-slate-200 px-6 text-slate-700">
                  <Link href="/services">Review Services</Link>
                </Button>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper contained={false} className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <Container>
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                <div>
                  <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Operational Flow Layer</h2>
                  <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">Representative case-study previews with operational details, measurable outcomes, and industry-specific behavior patterns.</p>
                </div>
                <div className="lg:pt-12">
                  <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.25)] lg:p-10">
                    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                      <div className="rounded-[1.5rem] bg-slate-50/80 p-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                            <div className="h-3 w-28 rounded-full bg-slate-200" />
                            <div className="mt-4 h-16 rounded-2xl bg-slate-50" />
                          </div>
                          <div className="rounded-2xl bg-white/70 p-4 shadow-sm">
                            <div className="h-3 w-20 rounded-full bg-slate-200" />
                            <div className="mt-4 h-16 rounded-2xl bg-slate-50" />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[1.5rem] bg-white/70 p-6">
                        <div className="space-y-4 text-sm text-slate-500 opacity-80">
                          <div className="flex justify-between"><span>Scheduling</span><span>—</span></div>
                          <div className="flex justify-between"><span>Intake</span><span>—</span></div>
                          <div className="flex justify-between"><span>Routing</span><span>—</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper>
          <SectionHeading eyebrow="Case Studies" title="Curated interface explorations focused on operational clarity" subtitle="Each demo follows the same structure: problem, change, outcome, and the business behavior it improves." />

          <div className="mt-16 space-y-12">
            {/* Clinic Study — calm, appointment-first */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">NovaCare Clinic</div>
                  <h3 className="mt-5 text-3xl font-extrabold text-slate-950">Clinic booking structure</h3>
                  <p className="mt-4 max-w-2xl text-base text-slate-600">Appointment-first interaction design that reduces hesitation through clear intake, visible availability, and quieter choices.</p>
                  <p className="mt-4 text-sm text-slate-500">Problem: {studies[0].problem}</p>
                  <p className="mt-2 text-sm text-slate-500">Outcome target: {studies[0].outcome}</p>

                  <div className="mt-6 grid gap-3 text-sm text-slate-600">
                    <div className="rounded-lg bg-slate-50 p-3">Intake: progressive reveal of required fields</div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">Scheduling: visible availability with soft affordances</div>
                    <div className="rounded-lg bg-slate-50 p-3">Follow-up: clear next steps and confirmation</div>
                  </div>
                </div>

                <div>
                  <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-800">Availability preview</p>
                    <div className="mt-4 grid gap-2">
                      {['Mon 09:00', 'Mon 11:00', 'Tue 14:00'].map((t) => (
                        <div key={t} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                          <div className="text-sm text-slate-700">{t}</div>
                          <div className="text-xs text-slate-500">Book</div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-slate-500">Calm motion, slow reveal, reduced friction.</p>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Editorial interruption */}
            <div className="mx-auto max-w-4xl text-center py-8">
              <p className="text-lg font-semibold text-slate-900">Design studies focused on reducing hesitation before action.</p>
            </div>

            {/* Restaurant Study — condensed, mobile-first */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.6 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">UrbanFit Gym</div>
                  <h3 className="mt-5 text-3xl font-extrabold text-slate-950">Membership and class flow</h3>
                  <p className="mt-3 text-base text-slate-600">A compressed membership-first layout that encourages quick decisions and mobile signup behavior.</p>
                  <p className="mt-4 text-sm text-slate-500">Problem: {studies[1].problem}</p>
                  <p className="mt-2 text-sm text-slate-500">Outcome target: {studies[1].outcome}</p>

                  <div className="mt-6 -ml-2 flex overflow-x-auto gap-3 pb-2">
                    {['Pizza', 'Burgers', 'Salads', 'Pasta', 'Dessert'].map((dish) => (
                      <div key={dish} className="min-w-[9rem] rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
                        <div className="font-medium">{dish}</div>
                        <div className="mt-2 text-xs text-slate-500">Quick order</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-800">Booking shortcuts</p>
                    <div className="mt-3 grid gap-2">
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3"><span>Trial • Today</span><span className="text-xs text-slate-500">Start</span></div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3"><span>Class • Today</span><span className="text-xs text-slate-500">Join</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Editorial interruption */}
            <div className="mx-auto max-w-4xl text-center py-8">
              <p className="text-lg font-semibold text-slate-900">Operational studies, not project thumbnails.</p>
            </div>

            {/* Real Estate Study — immersive, spatial */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.8 }}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm overflow-hidden"
            >
              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">Elevate Salon</div>
                  <h3 className="mt-5 text-3xl font-extrabold text-slate-950">Salon booking and gallery flow</h3>
                  <p className="mt-4 max-w-2xl text-base text-slate-600">Layered presentation with inquiry-first cues and larger visual zones for spatial context.</p>
                  <p className="mt-4 text-sm text-slate-500">Problem: {studies[2].problem}</p>
                  <p className="mt-2 text-sm text-slate-500">Outcome target: {studies[2].outcome}</p>
                  <div className="mt-6 rounded-lg overflow-hidden">
                    <div className="h-56 w-full rounded-2xl bg-slate-100" />
                  </div>
                </div>

                <div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">Featured service</p>
                    <div className="mt-3 h-28 rounded-lg bg-slate-50" />
                    <div className="mt-3 text-sm text-slate-500">Inquiry action is visible and prioritized.</div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </SectionWrapper>

        <SectionWrapper className="py-40 lg:py-48">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Smaller explorations focused on hierarchy, movement, and operational pacing.</h2>
            </div>

            <div className="mt-20 grid gap-6 lg:grid-cols-3">
              {studiesGrid.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
                  className={`rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 shadow-sm ${index === 1 ? "lg:translate-y-10" : index === 2 ? "lg:-translate-y-4" : ""}`}
                >
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="py-52 lg:py-64">
          <Container>
            <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center text-center py-8">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950 leading-[1.08] sm:text-5xl lg:text-6xl">
                The interface is not decoration.
                <br />
                It is operational infrastructure.
              </h2>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="py-40 lg:py-48">
          <Container>
            <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="space-y-6 text-lg tracking-wide text-slate-500">
                  {rhythmLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                  <p className="pt-2 text-slate-700">Interaction should feel quieter.</p>
                </div>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  {explorationCards.map((item, index) => (
                    <div key={item.title} className={`rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 ${index === 1 ? "sm:mt-10" : ""}`}>
                      <h4 className="text-2xl font-semibold text-slate-950">{item.title}</h4>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                      <div className="mt-6 flex gap-4 text-sm text-slate-500 opacity-80">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper contained={false} className="pb-40 pt-0 sm:pb-44 lg:pb-56">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-28 text-center shadow-[0_30px_120px_-80px_rgba(15,23,42,0.25)] sm:px-12 sm:py-32 lg:px-20 lg:py-36">
                <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Clearer Decisions
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Better systems reduce hesitation before action. The goal is not more interface. The goal is clearer movement toward inquiry or booking.
              </p>
              <div className="mt-12 flex justify-center">
                <Button asChild size="lg" variant="outline" className="rounded-full border-slate-200 px-6 text-slate-800">
                  <Link href="/contact">
                    Discuss A Project
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
