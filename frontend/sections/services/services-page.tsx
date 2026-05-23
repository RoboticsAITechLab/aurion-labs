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
import SectionWrapper from "@/components/common/section-wrapper";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
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
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Services</p>
                <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.9rem] lg:leading-[0.98]">
                  Systems designed to feel calm, precise, and operationally clear.
                </h1>
                <p className="mt-8 max-w-xl text-pretty text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
                  The page is art-directed around one idea: a premium interface should read like infrastructure, not decoration.
                </p>

                <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="rounded-full px-6">
                    <Link href="/contact">
                      Discuss A Project
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full border-slate-200 px-6 text-slate-700">
                    <Link href="/pricing">View Pricing Structure</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
                className="relative"
              >
                <div className="absolute -left-4 top-14 hidden h-56 w-56 rounded-full bg-slate-950/5 blur-3xl lg:block" />
                <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_50px_180px_-90px_rgba(15,23,42,0.55)]">
                  <div className="border-b border-slate-200/80 px-7 py-5 sm:px-9">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Operations Interface</p>
                  </div>

                  <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-8 lg:p-10">
                    <div className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-[1.1fr_0.9fr]">
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,250,252,1))] p-5 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-950">Scheduling</p>
                              <p className="mt-1 text-xs text-slate-500">Appointments and booking handoff</p>
                            </div>
                            <CalendarClock className="size-5 text-blue-600" />
                          </div>
                          <div className="mt-6 space-y-3">
                            <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                            <div className="h-3 w-2/3 rounded-full bg-slate-100" />
                            <div className="h-3 w-1/2 rounded-full bg-slate-100" />
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="lg:translate-y-6 rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-950">Intake</p>
                              <p className="mt-1 text-xs text-slate-500">Forms and first contact</p>
                            </div>
                            <CircleDot className="size-5 text-blue-600" />
                          </div>
                          <div className="mt-6 grid gap-3">
                            <div className="h-10 rounded-xl border border-slate-100 bg-slate-50" />
                            <div className="h-10 rounded-xl border border-slate-100 bg-slate-50" />
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="grid gap-6 sm:grid-cols-[0.88fr_1.12fr]"
                      >
                        <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-950">Routing</p>
                              <p className="mt-1 text-xs text-slate-500">Direction and follow-through</p>
                            </div>
                            <Route className="size-5 text-blue-600" />
                          </div>
                          <div className="mt-6 space-y-3">
                            <div className="h-2 rounded-full bg-slate-100" />
                            <div className="h-2 w-4/5 rounded-full bg-slate-100" />
                            <div className="h-2 w-1/2 rounded-full bg-slate-100" />
                          </div>
                        </div>

                        <div className="rounded-[1.6rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_60px_-36px_rgba(15,23,42,0.45)]">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold">Follow-Up</p>
                              <p className="mt-1 text-xs text-slate-300">Return visits and reminders</p>
                            </div>
                            <MoveRight className="size-5 text-slate-200" />
                          </div>
                          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="h-3 w-28 rounded-full bg-white/20" />
                            <div className="mt-4 h-24 rounded-2xl bg-white/10" />
                          </div>
                        </div>
                      </motion.div>

                      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                        <div className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">Workspace</p>
                          <div className="mt-4 h-20 rounded-2xl border border-slate-200 bg-slate-50" />
                        </div>
                        <div className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">Requests</p>
                          <div className="mt-4 h-20 rounded-2xl border border-slate-200 bg-slate-950/90" />
                        </div>
                        <div className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">Workflow</p>
                          <div className="mt-4 h-20 rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,1),rgba(255,255,255,1))]" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 content-start lg:pt-6">
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">System Mapping</p>
                        <div className="mt-5 space-y-4 text-sm text-slate-600">
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">Booking</div>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">Intake</div>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">Navigation</div>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">Customer flow</div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="lg:translate-y-4 rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(15,23,42,1),rgba(30,41,59,1))] p-6 text-white shadow-[0_20px_70px_-40px_rgba(15,23,42,0.45)]"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">Interface Layer</p>
                        <div className="mt-5 space-y-3 text-sm text-slate-200">
                          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Fewer steps for the user</div>
                          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Cleaner handoff for staff</div>
                          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">Less friction across devices</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper id="services" className="pt-0 sm:pt-0 lg:pt-0">
          <SectionIntro
            label="Interface Layer"
            title="Core systems built to read cleanly at a glance"
            subtitle="The structure is deliberate: one dominant section, supporting layers around it, and enough contrast to keep the page from feeling flat."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:auto-rows-[minmax(220px,auto)]">
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="group lg:col-span-12 rounded-[2.2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.35)]"
            >
              <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
                    <ShieldCheck className="size-3.5 text-blue-600" />
                    Business Websites
                  </div>
                  <h3 className="mt-6 max-w-xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    Clear entry points, stronger hierarchy, fewer decision stalls.
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                    This layer is for the site itself: a cleaner route through content, more believable pacing, and a calmer interface that still feels premium.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">
                    <span className="rounded-full border border-slate-200 px-4 py-2">Clear entry points</span>
                    <span className="rounded-full border border-slate-200 px-4 py-2">Readable flow</span>
                    <span className="rounded-full border border-slate-200 px-4 py-2">Less noise</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:pt-2">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,250,252,1))] p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">Scheduling</p>
                    <div className="mt-4 h-28 rounded-2xl border border-slate-200 bg-white" />
                  </div>
                  <div className="lg:translate-y-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">Intake</p>
                    <div className="mt-4 h-28 rounded-2xl border border-slate-200 bg-slate-950/90" />
                  </div>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              className="lg:col-span-7 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-36px_rgba(15,23,42,0.3)]"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
                <Clock3 className="size-3.5 text-blue-600" />
                Operations Layer
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">Booking Systems</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Scheduling and intake flows that reduce operational drag while staying visually quiet.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">Booking</div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">Requests</div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">Follow-up</div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="lg:col-span-5 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-36px_rgba(15,23,42,0.3)]"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
                <MoveRight className="size-3.5 text-blue-600" />
                Interface Layer
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">SEO + Site Structure</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Faster loading, cleaner metadata, and a structure that stays maintainable over time.
              </p>
              <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,1),rgba(255,255,255,1))] p-5">
                <div className="space-y-3">
                  <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                  <div className="h-3 w-2/3 rounded-full bg-slate-100" />
                  <div className="h-3 w-1/2 rounded-full bg-slate-100" />
                </div>
              </div>
            </motion.article>
          </div>
        </SectionWrapper>

        <SectionWrapper className="pt-0 sm:pt-2 lg:pt-4">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.75fr] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">System Philosophy</p>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Most business websites collapse under unnecessary noise.
              </h2>
              <div className="mt-10 max-w-2xl space-y-6 text-base leading-8 text-slate-600 sm:text-lg">
                <p>
                  Too many actions compete for attention, navigation becomes unclear, and the operational layer behind the site turns into friction.
                </p>
                <p>This section stays quiet on purpose. It needs room to breathe.</p>
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
            subtitle="The pacing changes here: the layout tightens, the rhythm becomes more linear, and the page slows down without feeling heavy."
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
            title="Different sectors, different pressure points"
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
                Cleaner systems. Better pacing. A calmer interface for the work underneath.
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                If the site needs to feel more deliberate, this is the point where the structure gets mapped with care.
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
      </main>

      <Footer />
    </>
  );
}