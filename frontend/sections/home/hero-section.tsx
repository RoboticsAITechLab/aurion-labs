"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import Container from "@/components/common/container";
import SectionWrapper from "@/components/common/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <SectionWrapper contained={false} className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.1),_transparent_45%)]" />
      <Container>
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge variant="outline" className="rounded-full border-slate-200 bg-white/90 px-4 py-1.5 text-slate-700 shadow-sm">
              <Sparkles className="mr-1.5 size-3.5 text-blue-600" />
              Built for serious operations
            </Badge>

            <h1 className="mx-auto mt-8 max-w-5xl text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-8xl">
              Web systems with an engineer's discipline
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-pretty text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
              We build the parts customers actually touch: the site, the booking flow, the forms, and the handoff between teams. Clear structure, fast pages, and a system your staff can run without friction.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/contact">
                  Start Project
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-slate-200 px-6 text-slate-700">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mt-20"
          >
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_140px_-70px_rgba(15,23,42,0.42)]">
              <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-5 sm:px-10">
                <div>
                  <p className="text-sm font-semibold text-slate-950">Business Control Center</p>
                  <p className="text-sm text-slate-500">Abstract workspace preview for client operations</p>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 sm:flex">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Visual Shell
                </div>
              </div>

              <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Workspace overview</p>
                      <p className="text-xs text-slate-500">Neutral shell for scheduling, intake, and follow-up</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full bg-blue-50 text-blue-700">
                      Interface shell
                    </Badge>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="h-3 w-32 rounded-full bg-slate-200" />
                      <div className="mt-6 grid grid-cols-6 items-end gap-3">
                        {[42, 60, 50, 70, 58, 66].map((height) => (
                          <div key={height} className="rounded-t-2xl bg-gradient-to-t from-slate-200 to-blue-500/40" style={{ height: `${height}px` }} />
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="h-3 w-24 rounded-full bg-slate-200" />
                        <div className="mt-4 space-y-3">
                          <div className="h-10 rounded-xl bg-slate-50" />
                          <div className="h-10 rounded-xl bg-slate-50" />
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="h-3 w-20 rounded-full bg-slate-200" />
                        <div className="mt-4 grid gap-3">
                          <div className="h-4 w-3/4 rounded-full bg-slate-100" />
                          <div className="h-4 w-2/3 rounded-full bg-slate-100" />
                          <div className="h-4 w-1/2 rounded-full bg-slate-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-700">Key modules</p>
                    <div className="mt-4 space-y-3">
                      {["Appointments", "Intake", "Follow-up"].map((item) => (
                        <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <div className="h-3 w-24 rounded-full bg-slate-200" />
                          <div className="mt-3 h-2 w-full rounded-full bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_60px_-36px_rgba(15,23,42,0.45)]">
                    <p className="text-sm text-slate-300">Operations shell</p>
                    <div className="mt-4 space-y-3 text-sm">
                      {["Request queue", "Work queue", "Review queue"].map((item, index) => (
                        <div key={`${item}-${index}`} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          <div className="h-3 w-24 rounded-full bg-white/20" />
                          <div className="mt-3 h-2 w-2/3 rounded-full bg-white/10" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}