"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPinned } from "lucide-react";

import Container from "@/components/common/container";
import SectionHeading from "@/components/common/section-heading";
import SectionWrapper from "@/components/common/section-wrapper";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type FormValues = {
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  businessType: string[];
  operationalGoal: string[];
  currentWebsite: string[];
  pages: string[];
  features: string[];
  infrastructure: string[];
  support: string;
  customRequests?: string;
};

const schema = z.object({
  name: z.string().min(2).max(100),
  businessName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  businessType: z.array(z.string()),
  operationalGoal: z.array(z.string()),
  currentWebsite: z.array(z.string()),
  pages: z.array(z.string()),
  features: z.array(z.string()),
  infrastructure: z.array(z.string()),
  support: z.string(),
  customRequests: z.string().optional(),
});

const PAGE_OPTIONS = ["Homepage", "About Page", "Services Page", "Contact Page", "Gallery / Portfolio", "Blog System", "Multi-Service Layout"];
const FEATURE_OPTIONS = ["WhatsApp Integration", "Booking System", "CMS / Admin Panel", "SEO Structure", "Inquiry Routing", "Analytics Dashboard", "Lead Collection Workflow"];
const INFRA_OPTIONS = ["Hosting & Deployment", "Custom Domain (.com / .in)", "Business Email Setup", "Managed Maintenance"];
const BUSINESS_TYPES = ["Clinic", "Gym", "Restaurant", "Salon", "Coaching", "Local Business"];
const GOAL_OPTIONS = ["Lead Generation", "Booking / Scheduling", "Brand Presence", "Operational Workflow"];
const WEBSITE_OPTIONS = ["No website", "Existing website", "Redesign required", "Partial rebuild needed"];
const SUPPORT_OPTIONS = ["Monthly Maintenance", "Quarterly Support", "Half-Yearly Support", "Yearly Operational Support"];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { pages: ["Homepage", "Contact Page"], features: [], infrastructure: [], support: SUPPORT_OPTIONS[0], businessType: [], operationalGoal: [], currentWebsite: ["No website"] } });

  const watched = watch();

  const estimate = useMemo(() => {
    const pagesScore = (watched.pages?.length ?? 0) * 1.0;
    const featuresScore = (watched.features?.length ?? 0) * 1.6;
    const infraScore = (watched.infrastructure?.length ?? 0) * 1.3;
    const supportScore = (SUPPORT_OPTIONS.indexOf(watched.support || SUPPORT_OPTIONS[0]) + 1) * 0.9;
    const businessTypesScore = (watched.businessType?.length ?? 0) * 0.8;
    const goalsScore = (watched.operationalGoal?.length ?? 0) * 1.4;
    const websiteFlags = watched.currentWebsite ?? [];
    const websiteScore = websiteFlags.includes("No website") ? 1.2 : websiteFlags.length * 0.6;
    const customScore = watched.customRequests && watched.customRequests.length > 20 ? 2.4 : 0;

    const total = pagesScore + featuresScore + infraScore + supportScore + businessTypesScore + goalsScore + websiteScore + customScore;

    let label = "Foundational";
    let range = "₹4K ─ ₹12K";
    if (total >= 6 && total < 12) {
      label = "Operational";
      range = "₹15K ─ ₹60K+";
    } else if (total >= 12) {
      label = "Scalable";
      range = "Consultation Based";
    }

    const meter = Math.min(100, Math.round((total / 18) * 100));

    return { total, label, range, meter };
  }, [watched.pages, watched.features, watched.infrastructure, watched.support, watched.customRequests, watched.businessType, watched.operationalGoal, watched.currentWebsite]);

  function onSubmit(data: FormValues) {
    setSubmitted(true);
    // In a real app you'd send `data` to your backend here.
    console.log("Inquiry submitted:", data, estimate);
  }

  return (
    <>
      <Navbar />

      <main className="bg-white text-slate-900">
        <SectionWrapper contained={false} className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_top,_rgba(30,58,138,0.04),_transparent_50%)]" />
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">CONTACT</p>
                <h1 className="mx-auto mt-8 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] leading-tight font-semibold tracking-tight text-slate-950">
                  Start with operational clarity.
                </h1>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">
                  Every project begins with understanding workflow, structure, operational movement, scalability, and support requirements.
                </p>
                <div className="mt-12 flex justify-center">
                  <Button asChild size="lg" className="rounded-full px-6">
                    <Link href="#configuration">
                      Review Scope
                      <ArrowUpRight className="ml-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper id="preview" className="pt-8 pb-20">
          <Container>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-6xl">
              <div className="rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-10 shadow-[0_30px_80px_-40px_rgba(2,6,23,0.08)] relative overflow-visible">
                {/* ambient fragments reflect selected configuration */}
                <div className="pointer-events-none absolute -right-6 top-6 hidden w-44 lg:block">
                  {Array.from({ length: Math.min(3, Math.max(1, (watched.businessType?.length ?? 0))) }).map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 0.06 + i * 0.06, y: -6 - i * 6 }} transition={{ duration: 1.2 + i * 0.4 }} className="mb-3 h-10 w-full rounded-xl bg-white/60 blur-sm" />
                  ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
                  <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">OPERATIONAL INTAKE SYSTEM</p>
                      <h3 className="mt-4 text-2xl font-semibold text-slate-900">Inquiry — Workflow — Structure</h3>
                      <p className="mt-3 text-sm text-slate-600">Better systems begin with operational clarity.</p>

                      <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">Inquiry</div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">Workflow</div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">Structure</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ambient Preview</p>
                      <p className="mt-3 text-sm text-slate-600">A spatial, restrained operational layer with floating interface fragments.</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Composition</p>
                      <p className="mt-3 text-sm text-slate-200">Layered fragments, restrained geometry, and premium spacing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </SectionWrapper>

        <SectionWrapper id="configuration" className="pt-6 pb-28">
          <Container>
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                  <SectionHeading eyebrow="Project Configuration" title="Business Information" subtitle="Provide the core information so we can shape an operational estimate." />

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-slate-700">Full Name</label>
                      <Input {...register("name")} className="rounded-2xl border-slate-200" placeholder="Your full name" />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{String(errors.name.message)}</p>}
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-slate-700">Business Name</label>
                      <Input {...register("businessName")} className="rounded-2xl border-slate-200" placeholder="Company or brand" />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-slate-700">Email Address</label>
                      <Input {...register("email")} type="email" className="rounded-2xl border-slate-200" placeholder="you@company.com" />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{String(errors.email.message)}</p>}
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-slate-700">Phone / WhatsApp</label>
                      <Input {...register("phone")} className="rounded-2xl border-slate-200" placeholder="+91 9xx xxx xxxx" />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Business Type</label>
                      <div className="mt-3 grid gap-3">
                        {BUSINESS_TYPES.map((t) => {
                          const selected = (watched.businessType || []).includes(t);
                          return (
                            <motion.button
                              key={t}
                              type="button"
                              onClick={() => {
                                const current = Array.isArray(watched.businessType) ? watched.businessType : [];
                                if (current.includes(t)) setValue("businessType", current.filter((x: string) => x !== t) as any);
                                else setValue("businessType", [...current, t] as any);
                              }}
                              whileHover={{ y: -3 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className={`inline-flex items-center gap-3 rounded-2xl px-4 py-2 text-sm shadow-sm transform-gpu transition-all ${selected ? "bg-slate-900 text-white shadow-lg ring-1 ring-sky-400" : "bg-white text-slate-700 border border-slate-100"}`}
                            >
                              <span className={`inline-block h-3 w-3 rounded-full ${selected ? "bg-emerald-400 shadow-[0_6px_18px_-8px_rgba(56,189,248,0.28)]" : "bg-slate-200"}`} />
                              <span>{t}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700">Operational Goal</label>
                      <div className="mt-3 grid gap-3">
                        {GOAL_OPTIONS.map((g) => {
                          const selected = (watched.operationalGoal || []).includes(g);
                          return (
                            <motion.button
                              key={g}
                              type="button"
                              onClick={() => {
                                const current = Array.isArray(watched.operationalGoal) ? watched.operationalGoal : [];
                                if (current.includes(g)) setValue("operationalGoal", current.filter((x: string) => x !== g) as any);
                                else setValue("operationalGoal", [...current, g] as any);
                              }}
                              whileHover={{ y: -3 }}
                              transition={{ type: "spring", stiffness: 280, damping: 22 }}
                              className={`inline-flex items-center gap-3 rounded-2xl px-4 py-2 text-sm shadow-sm transform-gpu transition-all ${selected ? "bg-slate-900 text-white shadow-lg ring-1 ring-sky-400" : "bg-white text-slate-700 border border-slate-100"}`}
                            >
                              <span className={`inline-block h-3 w-3 rounded-full ${selected ? "bg-sky-400 shadow-[0_6px_18px_-8px_rgba(59,130,246,0.22)]" : "bg-slate-200"}`} />
                              <span>{g}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                              
                    <div>
                      <label className="text-sm font-medium text-slate-700">Current Website</label>
                      <div className="mt-3 grid gap-3">
                        {WEBSITE_OPTIONS.map((w) => {
                          const selected = (watched.currentWebsite || []).includes(w);
                          const disabledNoWebsite = w !== "No website" && (watched.currentWebsite || []).includes("No website");
                          return (
                            <motion.button
                              key={w}
                              type="button"
                              onClick={() => {
                                const current = Array.isArray(watched.currentWebsite) ? watched.currentWebsite : [];
                                if (w === "No website") {
                                  if (current.includes("No website")) setValue("currentWebsite", [] as any);
                                  else setValue("currentWebsite", ["No website"] as any);
                                } else {
                                  let base = current.filter((x: string) => x !== "No website");
                                  if (base.includes(w)) base = base.filter((x: string) => x !== w);
                                  else base = [...base, w];
                                  setValue("currentWebsite", base as any);
                                }
                              }}
                              whileHover={{ y: -2 }}
                              transition={{ type: "spring", stiffness: 260, damping: 24 }}
                              disabled={disabledNoWebsite}
                              className={`inline-flex items-center gap-3 rounded-2xl px-4 py-2 text-sm transform-gpu transition-all ${selected ? "bg-slate-900 text-white shadow-lg ring-1 ring-sky-400" : "bg-white text-slate-700 border border-slate-100"} ${disabledNoWebsite ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                              <span className={`inline-block h-3 w-3 rounded-full ${selected ? "bg-violet-400 shadow-[0_6px_18px_-8px_rgba(167,139,250,0.2)]" : "bg-slate-200"}`} />
                              <span>{w}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Website Structure</p>
                      <div className="mt-4 grid gap-3">
                        {PAGE_OPTIONS.map((p) => (
                          <label key={p} className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-3">
                            <input type="checkbox" value={p} {...register("pages")} className="h-4 w-4" />
                            <span className="text-sm text-slate-700">{p}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Operational Features</p>
                      <div className="mt-4 grid gap-3">
                        {FEATURE_OPTIONS.map((f) => (
                          <label key={f} className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-3">
                            <input type="checkbox" value={f} {...register("features")} className="h-4 w-4" />
                            <span className="text-sm text-slate-700">{f}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Infrastructure Layer</p>
                      <div className="mt-4 grid gap-3">
                        {INFRA_OPTIONS.map((i) => (
                          <label key={i} className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-3">
                            <input type="checkbox" value={i} {...register("infrastructure")} className="h-4 w-4" />
                            <span className="text-sm text-slate-700">{i}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Support Layer</p>
                      <div className="mt-4 grid gap-3">
                        {SUPPORT_OPTIONS.map((s) => (
                          <label key={s} className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-3">
                            <input type="radio" value={s} {...register("support")} name="support" className="h-4 w-4" />
                            <span className="text-sm text-slate-700">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Custom Request Layer</p>
                    <p className="mt-2 text-sm text-slate-600">Describe any custom workflow, automation, integrations, or tooling.</p>
                    <Textarea {...register("customRequests")} className="mt-4 min-h-[120px] rounded-2xl border-slate-200" placeholder="Describe advanced operational requirements" />
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div className="text-sm text-slate-500">Pricing depends on operational complexity.</div>
                    <div className="flex items-center gap-3">
                      <Button type="submit" size="lg" className="rounded-full px-6">
                        Send Inquiry
                        <ArrowUpRight className="ml-3" />
                      </Button>
                    </div>
                  </div>
                </motion.form>

                <motion.aside initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6 relative">
                  {/* ambient topology fragments — reflect selection intensity */}
                  <div className="pointer-events-none absolute -right-6 -top-12 hidden w-48 transform-gpu lg:block">
                    {Array.from({ length: Math.min(4, Math.max(1, (watched.businessType?.length ?? 0) + (watched.operationalGoal?.length ?? 0))) }).map((_, i) => (
                      <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 0.08 + i * 0.05, y: -6 - i * 6 }} transition={{ duration: 1.6 + i * 0.4 }} className="mb-3 h-12 w-full rounded-xl bg-gradient-to-r from-white to-slate-50" />
                    ))}
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Live Operational Estimate</p>
                    <h4 className="mt-3 text-lg font-semibold">Estimated Operational Scope</h4>
                    <p className="mt-1 text-sm text-slate-600">{estimate.label} • {estimate.range}</p>

                    <div className="mt-6">
                      <p className="text-xs font-medium text-slate-500">Structure Layer</p>
                      <div className="mt-3 h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                        <motion.div className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600" animate={{ width: `${estimate.meter}%` }} transition={{ duration: 0.9 }} style={{ width: `${estimate.meter}%` }} />
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>Foundational</span>
                        <span>Operational</span>
                        <span>Scalable</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-xs font-medium text-slate-500">Operational Complexity</p>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <motion.div className="rounded-full bg-slate-100 px-3 py-1 text-slate-700" animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity }}>{`Pages: ${watched.pages?.length ?? 0}`}</motion.div>
                        <motion.div className="rounded-full bg-slate-100 px-3 py-1 text-slate-700" animate={{ y: [0, -3, 0] }} transition={{ duration: 3.6, repeat: Infinity, delay: 0.3 }}>{`Features: ${watched.features?.length ?? 0}`}</motion.div>
                        <motion.div className="rounded-full bg-slate-100 px-3 py-1 text-slate-700" animate={{ y: [0, -2, 0] }} transition={{ duration: 3.2, repeat: Infinity, delay: 0.6 }}>{`Infra: ${watched.infrastructure?.length ?? 0}`}</motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Complexity Meter</p>
                    <div className="mt-4">
                      <div className="relative h-3 w-full rounded-full bg-white/60 overflow-hidden">
                        <motion.div className="absolute left-0 top-0 h-3 rounded-full bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-600" animate={{ width: `${estimate.meter}%` }} transition={{ duration: 0.9 }} style={{ width: `${estimate.meter}%` }} />
                        <motion.div className="absolute top-[-8px] h-5 w-5 rounded-full border-2 border-white bg-slate-900 shadow-md" animate={{ left: `${estimate.meter}%`, translateX: '-50%' }} transition={{ duration: 0.9 }} />
                      </div>
                      <div className="mt-3 flex justify-between text-xs text-slate-600">
                        <span>Foundational</span>
                        <span>Operational</span>
                        <span>Scalable</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white p-6">
                    <p className="text-sm font-semibold">Estimated Project Range</p>
                    <p className="mt-2 text-sm text-slate-600">{estimate.range} — pricing adapts dynamically with complexity.</p>
                  </div>
                </motion.aside>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="py-28">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-5xl font-semibold text-slate-900">Better systems begin with clearer structure.</h2>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="pt-6 pb-20">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Response Structure</p>
                  <p className="mt-4 text-sm text-slate-600">Initial inquiries are reviewed before project discussion begins. Typical response time: 24–48 hours.</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Contact Channels</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <div className="flex items-center gap-3"><Mail className="text-sky-600" /> hello@aurionlabs.in</div>
                    <div className="flex items-center gap-3"><MapPinned className="text-sky-600" /> +91 XXXXX XXXXX</div>
                    <div className="flex items-center gap-3">Instagram: @aurionlabs</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </SectionWrapper>

        <SectionWrapper className="py-20">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <h3 className="text-2xl font-semibold">Quieter Systems</h3>
              <p className="mt-4 text-slate-600">The goal is not more digital complexity. The goal is calmer operational movement.</p>
              <div className="mt-8">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/services">Start A Project</Link>
                </Button>
              </div>
            </div>
          </Container>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
