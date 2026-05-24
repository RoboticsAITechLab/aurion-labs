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
            <motion.div initial={{ opacity: 0, y: 18, scale: 0.995 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_40px_120px_-60px_rgba(2,6,23,0.08)]">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/70 to-slate-50 p-6">
                <div className="absolute -right-12 -top-10 h-40 w-40 rotate-12 rounded-xl bg-gradient-to-br from-sky-50 to-white/30 opacity-70 blur-sm" />

                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Growth system preview</p>
                      <p className="text-xs text-slate-500">website, booking, and WhatsApp flow</p>
                    </div>
                    <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:flex">Business Front Door</div>
                  </div>

                  <div className="mt-2 grid gap-3">
                    <div className="rounded-xl bg-white/60 p-3 ring-1 ring-slate-100">
                      <div className="h-2 w-28 rounded-full bg-slate-200" />
                      <div className="mt-4 grid grid-cols-6 gap-2">
                        {[60, 48, 68, 54, 42, 58].map((h, i) => (
                          <motion.div key={i} className="rounded-t-2xl bg-gradient-to-t from-slate-200 to-sky-400/20" style={{ height: h }} animate={{ y: [0, -6, 0] }} transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }} />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1 rounded-xl bg-white/60 p-3 ring-1 ring-slate-100">
                        <div className="h-2 w-20 rounded-full bg-slate-200" />
                        <div className="mt-3 grid gap-2">
                          <div className="h-3 w-3/4 rounded-full bg-slate-100" />
                          <div className="h-3 w-1/2 rounded-full bg-slate-100" />
                        </div>
                      </div>
                      <div className="w-32 rounded-xl bg-slate-950 p-3 text-white">
                        <div className="h-2 w-16 rounded-full bg-white/20" />
                        <div className="mt-3 h-2 w-24 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="absolute -left-8 -bottom-12 hidden transform-gpu sm:block">
              <div className="h-36 w-44 rounded-2xl bg-white/6 backdrop-blur-md border border-white/6 shadow-md" />
            </motion.div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}