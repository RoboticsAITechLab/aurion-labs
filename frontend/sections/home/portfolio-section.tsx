"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowUpRight, LayoutDashboard, Monitor } from "lucide-react";

import SectionHeading from "@/components/common/section-heading";
import SectionWrapper from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Website Interface",
    description: "A neutral visual composition for a business homepage.",
    accent: "from-blue-50 to-white",
    icon: Monitor,
  },
  {
    title: "Operations Dashboard",
    description: "An abstract enterprise shell with layered panels and calm structure.",
    accent: "from-slate-50 to-white",
    icon: LayoutDashboard,
  },
];

export default function PortfolioSection() {
  return (
    <SectionWrapper id="portfolio" className="bg-slate-50/70">
      <SectionHeading eyebrow="Featured Projects" title="Featured Projects" subtitle="Large-format preview cards built as neutral visual mockups, with no fabricated clients or results." />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        {projects.map((project, index) => {
          const Icon = project.icon;
          const cardClass = index === 0 ? "lg:translate-y-0" : "lg:mt-20";

          return (
            <motion.article
              key={project.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ${cardClass}`}
            >
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${project.accent} p-6 sm:p-8 ${index === 0 ? "lg:min-h-[34rem]" : "lg:min-h-[28rem]"}`}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/75 p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Visual mockup</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{project.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">{project.description}</p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-blue-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="h-3 w-16 rounded-full bg-slate-200" />
                      <div className="mt-4 h-20 rounded-2xl bg-white shadow-inner" />
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="h-3 w-20 rounded-full bg-slate-200" />
                      <div className="mt-4 h-20 rounded-2xl bg-gradient-to-b from-blue-100 to-white" />
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="h-3 w-14 rounded-full bg-slate-200" />
                      <div className="mt-4 h-20 rounded-2xl bg-slate-950/90" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
                <span className="text-sm font-medium text-slate-600">Neutral visual composition</span>
                <ArrowUpRight className="size-4 text-slate-400" />
              </div>
            </motion.article>
          );
        })}
      </div>
      <div className="mt-8 flex justify-start">
        <Button asChild variant="outline" className="rounded-full border-slate-200 px-5 text-slate-700">
          <Link href="/portfolio">
            See Portfolio
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}