"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  CircleDot,
  Clock3,
  LayoutGrid,
  Link2,
  MapPinned,
  MoveRight,
  Route,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";

import Container from "@/components/common/container";
import ProofStrip from "@/components/common/proof-strip";
import OperationalVisual from "@/components/common/operational-visual";
import SectionHeading from "@/components/common/section-heading";
import SectionWrapper from "@/components/common/section-wrapper";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Box from "@/components/ui/box";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const deliverySteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Define the structure, the operational needs, and the customer flow behind the interface.",
    icon: CalendarClock,
  },
  {
    step: "02",
    title: "System Mapping",
    description: "Build the page hierarchy, navigation structure, and interaction flow across devices.",
    icon: Route,
  },
  {
    step: "03",
    title: "Build",
    description: "Develop the interface with an emphasis on spacing, speed, readability, and maintainability.",
    icon: LayoutGrid,
  },
  {
    step: "04",
    title: "Launch",
    description: "Deliver a cleaner system that feels easier to operate day to day.",
    icon: CheckCircle2,
  },
];

const industries = [
  {
    title: "Clinics",
    description: "Appointment-first structure with quiet routing and clear intake.",
    icon: MapPinned,
  },
  {
    title: "Gyms",
    description: "Membership flows that keep schedules, offers, and upgrades readable.",
    icon: Users,
  },
  {
    title: "Restaurants",
    description: "Menu access, reservations, and mobile action paths without clutter.",
    icon: Smartphone,
  },
  {
    title: "Salons",
    description: "Visual-first booking journeys with a softer operational layer.",
    icon: Sparkles,
  },
  {
    title: "Real Estate",
    description: "Listing-heavy pages with stronger structure and contact emphasis.",
    icon: Briefcase,
  },
  {
    title: "Coaching",
    description: "Clear offers, calm onboarding, and simpler decision paths.",
    icon: Link2,
  },
];

const systemEffects = [
  {
    title: "Clarity",
    detail: "Fewer competing actions and a more obvious path through the page.",
  },
  {
    title: "Navigation",
    detail: "Routes that stay legible as the website grows.",
  },
  {
    title: "Operations",
    detail: "A cleaner handoff between the public site and the daily workflow.",
  },
  {
    title: "Maintenance",
    detail: "A structure that is easier to update without breaking the rhythm.",
  },
];

const serviceFaqs = [
  {
    question: "How does the project start?",
    answer: "We begin with a short consultation, then map the offer, the lead path, and the booking or WhatsApp handoff before any build work starts.",
  },
  {
    question: "Can you connect WhatsApp and booking flows?",
    answer: "Yes. The site can route people to WhatsApp, a booking flow, a contact form, or a combination of all three depending on how the business works.",
  },
  {
    question: "Do you work only with one industry?",
    answer: "No. The structure changes by industry, but the goal is the same: clearer inquiry paths, stronger trust, and fewer lost leads.",
  },
  {
    question: "How quickly do you respond?",
    answer: "Initial inquiries are usually reviewed within 24-48 hours, so the next conversation starts with context rather than a generic reply.",
  },
  {
    question: "What do you need from me to begin?",
    answer: "A clear business name, a short description of the goal, and any examples of the current website, booking process, or intake flow are enough to start.",
  },
];

function SectionIntro({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main id="top" className="bg-background text-foreground">
        <SectionWrapper contained={false} className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-44">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50rem] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.10),_transparent_42%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <Container>
            <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">

        <SectionWrapper density="compact" className="pt-0 pb-12">
          <ProofStrip
            eyebrow="Designed For Business Flow"
            title="The service layer is built around inquiry paths, booking paths, and handoff paths."
            subtitle="This keeps the site practical: fewer competing actions, more obvious next steps, and clearer operational handoff."
            items={[
              { label: "Consultation", value: "Short scope call", detail: "Define the offer and customer flow" },
              { label: "Routing", value: "WhatsApp + form", detail: "Give customers a direct way to act" },
              { label: "Structure", value: "Clear sections", detail: "Explain services without clutter" },
              { label: "Support", value: "Launch continuity", detail: "Post-launch maintenance and edits" },
            ]}
          />
        </SectionWrapper>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Services</p>
                <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.9rem] lg:leading-[0.98]">
                  Websites and growth systems built for local businesses.
                </h1>
                <p className="mt-8 max-w-xl text-pretty text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
                  We build the digital front door, the booking flow, and the lead handoff that help your business get more inquiries with less friction.
                </p>

                <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="rounded-full px-6">
                    <Link href="/contact">
                      Discuss Your Project
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full border-slate-200 px-6 text-slate-700">
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
                className="relative"
              >
                <OperationalVisual
                  eyebrow="Business operations interface"
                  title="Clear inquiry paths, cleaner booking flow, quieter handoff."
                  subtitle="A controlled visual layer that shows how the site supports real business operations without turning the page into a busy dashboard."
                  statusLabel="Live flow"
                  status="Inquiry → Booking → Follow-up"
                  steps={[
                    "The visitor finds the next step fast, whether that is inquiry, booking, or WhatsApp.",
                    "The interface keeps routing and scheduling readable across desktop and mobile.",
                    "The business gets a cleaner lead handoff and a calmer daily workflow.",
                  ]}
                  highlights={[
                    { label: "Scheduling", value: "Appointments" },
                    { label: "Routing", value: "WhatsApp + form" },
                    { label: "Support", value: "Launch continuity" },
                  ]}
                />
              </motion.div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="pt-0 pb-8">
          <Container>
            <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
              <Box className="rounded-[1.8rem]" variant="card">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Response Time</p>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">24-48 hour review window</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">We review incoming project details before moving into scope discussion, so the reply is relevant to the business.</p>
              </Box>

              <Box className="rounded-[1.8rem]" variant="card">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Social Proof</p>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">Built for local conversion</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">The patterns here are designed for clinics, gyms, salons, restaurants, coaches, and service businesses that need a clearer lead path.</p>
              </Box>

              <Box className="rounded-[1.8rem]" variant="card">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">Trust Layer</p>
                <h3 className="mt-4 text-xl font-semibold">Offer clarity first</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">When the offer is easy to understand and the next step is obvious, inquiries improve without adding clutter.</p>
              </Box>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper id="services" className="pt-0 sm:pt-0 lg:pt-0">
          <SectionIntro
            label="Interface Layer"
            title="Services that improve inquiries, bookings, and customer response"
            subtitle="We treat each service as part of one growth system: the website, the lead path, and the operations behind it."
          />

          <div className="mt-14 grid gap-10">
            {/* Business Websites — Asymmetrical editorial composition */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Box variant="card" className="overflow-hidden p-8">
                <div className="grid gap-8 lg:grid-cols-[1.25fr_0.85fr] items-start">
                  <div>
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-100">Business Websites</div>
                    <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">A clearer front door for your business.</h3>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">We shape the homepage, service pages, and contact path so visitors understand your offer fast and know what to do next.</p>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
                        <div className="h-3 w-24 rounded-full bg-slate-200" />
                        <div className="mt-3 h-12 w-48 rounded-lg bg-white/60" />
                      </div>
                      <div className="text-sm text-slate-600">Editorial rhythm with selective previews.</div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -right-8 -top-8 h-32 w-40 rounded-xl bg-slate-100/40 blur-sm" />
                    <Box className="rounded-2xl p-5 bg-gradient-to-b from-white to-slate-50">
                      <p className="text-sm font-semibold text-slate-900">Navigation rhythm</p>
                      <div className="mt-4 space-y-3">
                        <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                        <div className="h-3 w-2/3 rounded-full bg-slate-100" />
                      </div>
                    </Box>
                  </div>
                </div>
              </Box>
            </motion.section>

            {/* Editorial interruption */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto max-w-4xl text-center py-12">
                  <p className="text-xl font-semibold leading-tight text-slate-900">The website is not decoration. It is your sales and booking infrastructure.</p>
            </motion.div>

            {/* Booking Systems — directional flow and sequencing */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.6 }}
            >
              <Box variant="card" className="p-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">Booking Systems</div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-950">Booking flows that reduce drop-off.</h3>
                  <p className="mt-3 text-base text-slate-600">Directional flows that take a customer from interest to inquiry, scheduling, and follow-up with less effort from your team.</p>

                  <div className="mt-6 flex gap-3 text-sm text-slate-500">
                    <div className="rounded-lg bg-slate-50 px-4 py-2">Inquiry</div>
                    <div className="rounded-lg bg-white px-4 py-2 shadow-sm">Routing</div>
                    <div className="rounded-lg bg-slate-50 px-4 py-2">Scheduling</div>
                  </div>
                </div>

                <div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center"> <CalendarClock className="size-4 text-blue-600" /> </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Schedule preview</p>
                        <p className="text-xs text-slate-500">A quick glance at availability reduces hesitation.</p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2">
                      {["10:00", "11:30", "14:00"].map((t) => (
                        <motion.div key={t} whileHover={{ scale: 1.02 }} transition={{ duration: 0.18 }} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                          <div className="text-sm text-slate-700">{t}</div>
                          <div className="text-xs text-slate-500">Book</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </Box>
            </motion.section>

            {/* Infrastructure Layer — topology and metadata rhythm */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Box variant="card" className="p-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">SEO + Infrastructure</div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-950">Structure that supports visibility and performance.</h3>
                  <p className="mt-3 text-base text-slate-600">Pages are built with cleaner metadata, faster load behavior, and a structure that is easier to maintain over time.</p>
                </div>

                <div>
                  <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-md bg-slate-100 p-3 text-sm">Meta</div>
                      <div className="rounded-md bg-white p-3 text-sm shadow-sm">Sitemap</div>
                      <div className="rounded-md bg-slate-100 p-3 text-sm">Perf</div>
                    </div>
                    <div className="mt-4 h-24 rounded-lg bg-slate-50" />
                  </div>
                </div>
              </div>
              </Box>
            </motion.section>
          </div>
        </SectionWrapper>

        <SectionWrapper className="pt-0 sm:pt-2 lg:pt-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.75fr] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">System Philosophy</p>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Most business websites lose customers because the message is too vague.
              </h2>
              <div className="mt-10 max-w-2xl space-y-6 text-base leading-8 text-slate-600 sm:text-lg">
                <p>
                  When the offer is unclear, people hesitate. When the booking path is buried, people leave. When the WhatsApp or inquiry route is weak, leads get lost.
                </p>
                <p>This section stays quiet on purpose because clarity should do the heavy lifting.</p>
              </div>

              <div className="mt-14 border-y border-slate-200 py-8">
                <p className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Less friction. More clarity.
                </p>
              </div>
            </div>

            <div className="lg:pt-20">
              <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                {systemEffects.map((item) => (
                  <div key={item.title} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="process" className="pt-0 sm:pt-2 lg:pt-4">
          <SectionIntro
            label="Delivery Flow"
            title="A process that stays calm from first conversation to launch"
            subtitle="We keep the pacing simple: understand the business, map the flow, build the system, and launch it cleanly."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="relative pl-2 sm:pl-4">
              <div className="absolute top-4 bottom-4 left-6 w-px bg-slate-200" />
              <div className="space-y-8">
                {deliverySteps.map((item, index) => {
                  const Icon = item.icon;
                  const shiftClass = index % 2 === 0 ? "sm:ml-8" : "sm:ml-0";
                  return (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
                      className={`grid grid-cols-[auto_1fr] gap-5 ${shiftClass}`}
                    >
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                        <Icon className="size-4 text-blue-600" />
                      </div>
                      <div className="pt-1">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{item.step}</span>
                          <h3 className="text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                        </div>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm lg:mt-16"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">What stays consistent</p>
              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">Clear communication</div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">Measured pacing</div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">Readable decisions</div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">Calm handoff</div>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        <SectionWrapper className="pt-0 sm:pt-2 lg:pt-4">
          <SectionIntro
            label="Industry Structures"
            title="Different sectors need different conversion paths"
            subtitle="The system adapts to the business model instead of forcing the same grid everywhere. One featured card leads; the others stay quieter."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="rounded-[2.2rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,250,252,1))] p-7 shadow-sm"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
                    <MapPinned className="size-3.5 text-blue-600" />
                    Featured Sector
                  </div>
                  <h3 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Clinics</h3>
                  <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
                    Appointment-first structure with quiet routing, stronger intake, and a calm path to booking.
                  </p>
                </div>

                <div className="hidden rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-sm lg:block">
                  <div className="grid h-full w-44 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">Scheduling</div>
                    <div className="translate-x-4 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm">Requests</div>
                    <div className="translate-x-2 rounded-2xl border border-slate-200 bg-slate-950 p-3 text-sm text-white">Follow-up</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-950">Restaurants</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Menu access, reservations, and mobile action paths without clutter.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm lg:translate-y-4">
                  <p className="text-sm font-semibold text-slate-950">Salons</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Visual-first booking journeys with a softer operational layer.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm lg:-translate-y-2">
                  <p className="text-sm font-semibold text-slate-950">Gyms</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Membership flows that keep schedules, offers, and upgrades readable.</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_60px_-36px_rgba(15,23,42,0.45)]">
                  <p className="text-sm font-semibold">Real Estate</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Listing-heavy pages with stronger structure and contact emphasis.</p>
                </div>
              </div>
            </motion.article>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                const offsetClass = index % 2 === 0 ? "lg:ml-8" : "lg:ml-0";
                return (
                  <motion.article
                    key={industry.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
                    whileHover={{ y: -4 }}
                    className={`${offsetClass} rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[0_22px_55px_-38px_rgba(15,23,42,0.28)]`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-600">
                        <Icon className="size-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{industry.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{industry.description}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper contained={false} className="pt-0 pb-28 sm:pb-32 lg:pb-40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-[2.3rem] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_white_62%)] px-6 py-20 text-center shadow-[0_30px_120px_-80px_rgba(15,23,42,0.5)] sm:px-12 sm:py-24 lg:px-20 lg:py-28"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Final Decision Point</p>
              <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Cleaner systems. Better pacing. More inquiries from the same traffic.
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                If the site needs to sell, book, or route leads more clearly, this is the point where the structure gets mapped with care.
              </p>
              <div className="mt-12 flex justify-center">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/contact">
                    Start A Project
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        <SectionWrapper className="pt-0 pb-28">
          <Container>
            <div className="mx-auto max-w-4xl">
              <SectionHeading eyebrow="FAQ" title="Common questions before we start" subtitle="A short list of the questions that usually come up before a project is scoped." />

              <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <Accordion type="single" collapsible className="w-full">
                  {serviceFaqs.map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="py-4 text-left text-base font-semibold text-slate-900">{faq.question}</AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm leading-7 text-slate-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </Container>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}