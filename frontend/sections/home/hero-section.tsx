"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/common/container";
import OperationalVisual from "@/components/common/operational-visual";
import SectionWrapper from "@/components/common/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <SectionWrapper contained={false} density="compact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-white/95" />
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="absolute left-1/2 top-8 -translate-x-1/2 blur-[48px] opacity-30"
          style={{ width: 800, height: 420, background: 'radial-gradient(circle at 30% 20%, rgba(14,165,233,0.06), transparent 30%), radial-gradient(circle at 70% 80%, rgba(99,102,241,0.04), transparent 25%)' }}
        />
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 6 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute -left-20 top-28 opacity-40"
        >
          <div className="h-[320px] w-[160px] rounded-2xl bg-white/6 backdrop-blur-md border border-white/6 shadow-inner" />
        </motion.div>
      </div>

      <Container>
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-1 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-100">Built for local business growth</div>

              <h1 className="mt-8 text-[clamp(2rem,5.2vw,4rem)] leading-[0.98] font-extrabold text-slate-900">
                We build operational digital systems for local businesses.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-7 text-slate-600">
                Websites, booking flows and fast WhatsApp handoffs that turn interest into reliable leads and bookings — so your team spends time serving customers, not chasing them.
              </p>

              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                {/* CTA variant and tracking handled client-side */}
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/contact?source=homepage" onClick={() => { if (typeof window !== 'undefined') window.localStorage && window.localStorage.setItem('ab_cta_click', (Number(window.localStorage.getItem('ab_cta_click')||'0')+1).toString()); }}>
                    Book a 20‑minute Strategy Call
                    <ArrowUpRight className="ml-2" />
                  </Link>
                </Button>

                {(() => {
                  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
                  const href = whatsapp
                    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi Aurion Labs, I\'m interested in a website that drives more bookings and faster replies.")}`
                    : "/contact";

                  return (
                    <Button asChild variant="outline" size="lg" className="rounded-full border-slate-200 px-6 text-slate-700">
                      <a href={href} onClick={() => { if (typeof window !== 'undefined') window.localStorage && window.localStorage.setItem('whatsapp_clicks', (Number(window.localStorage.getItem('whatsapp_clicks')||'0')+1).toString()); }}>Quick WhatsApp Inquiry</a>
                    </Button>
                  );
                })()}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div initial={{ opacity: 0, y: 18, scale: 0.995 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }}>
              <OperationalVisual
                eyebrow="Business front door"
                title="Calm interface, clear routing, cleaner handoff."
                subtitle="A premium system layer that shows how visitors move from interest to booking without visual noise or operational confusion."
                statusLabel="Live flow"
                status="Website → WhatsApp → Booking"
                steps={[
                  "Visitor lands on a clear offer and sees the next action immediately.",
                  "The mobile path stays short so inquiries do not stall on smaller screens.",
                  "Staff receive a cleaner lead handoff with fewer back-and-forth steps.",
                ]}
                highlights={[
                  { label: "Primary action", value: "Book a call" },
                  { label: "Fallback route", value: "WhatsApp inquiry" },
                  { label: "Response target", value: "24-48 hrs" },
                ]}
                className="shadow-[0_40px_120px_-60px_rgba(2,6,23,0.10)]"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}