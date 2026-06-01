"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Circle, Smartphone, TabletSmartphone } from "lucide-react";

import { cn } from "@/lib/utils";

type OperationalVisualProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  status: string;
  steps: string[];
  highlights: Array<{
    label: string;
    value: string;
  }>;
  className?: string;
};

export default function OperationalVisual({
  eyebrow,
  title,
  subtitle,
  statusLabel,
  status,
  steps,
  highlights,
  className,
}: OperationalVisualProps) {
  return (
    <div className={cn("overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white shadow-[0_40px_140px_-80px_rgba(15,23,42,0.45)]", className)}>
      <div className="border-b border-slate-200/80 px-6 py-5 sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{subtitle}</p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
            <CheckCircle2 className="size-4 text-blue-600" />
            {statusLabel}: {status}
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,250,252,1))] p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-slate-300" />
              <span className="size-2 rounded-full bg-slate-200" />
              <span className="size-2 rounded-full bg-slate-100" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              <TabletSmartphone className="size-3.5 text-slate-500" />
              Responsive flow
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Customer path</p>
              <div className="mt-4 space-y-3">
                <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                <div className="h-3 w-2/3 rounded-full bg-slate-100" />
                <div className="h-3 w-1/2 rounded-full bg-slate-100" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Website</div>
                  <div className="mt-3 h-16 rounded-2xl bg-white shadow-inner" />
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Mobile</div>
                  <div className="mt-3 h-16 rounded-2xl bg-slate-950/95" />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ y: 8, opacity: 0.9 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-10 right-6 hidden w-40 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_18px_70px_-40px_rgba(15,23,42,0.4)] lg:block"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <Smartphone className="size-3.5 text-blue-600" />
              Quick action
            </div>
            <div className="mt-4 space-y-2.5">
              <div className="h-2.5 w-24 rounded-full bg-slate-200" />
              <div className="h-2.5 w-32 rounded-full bg-slate-100" />
              <div className="rounded-2xl bg-slate-950 p-3 text-white">
                <div className="h-2 w-16 rounded-full bg-white/20" />
                <div className="mt-3 flex items-center gap-2 text-xs text-white/80">
                  <Circle className="size-2 fill-current" />
                  WhatsApp routed
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid gap-4 content-start">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_20px_60px_-36px_rgba(15,23,42,0.5)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Workflow</p>
            <div className="mt-5 space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white/80">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="text-sm leading-6 text-slate-200">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Support handoff</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">The system stays readable after launch.</p>
              </div>
              <ChevronRight className="size-4 text-slate-400" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                "Lead intake",
                "Booking action",
                "Follow-up path",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}