"use client";

import Link from "next/link";
import { MessageCircle, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "";
const whatsappMessage = encodeURIComponent(
  "Hi Aurion Labs, I want to discuss a website, booking system, or WhatsApp lead flow for my business."
);

const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
  : "/contact";

export default function ActionRail() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4 sm:bottom-6 sm:px-6 lg:bottom-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-end justify-end gap-3">
        <div className="pointer-events-auto hidden rounded-full border border-slate-200 bg-white/90 p-1.5 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl lg:flex lg:items-center lg:gap-2">
          <Button asChild variant="outline" size="sm" className="rounded-full border-slate-200 px-4 text-slate-700">
            <Link href="/contact">
              Book Consultation
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="sm" className="rounded-full px-4">
            <Link href={whatsappHref} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined}>
              <MessageCircle className="size-4" />
              WhatsApp
            </Link>
          </Button>
        </div>

        <div className="pointer-events-auto flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl lg:hidden">
          <Button asChild variant="outline" size="sm" className="flex-1 rounded-xl border-slate-200 px-3 text-slate-700">
            <Link href="/contact">
              Book Consultation
            </Link>
          </Button>
          <Button asChild size="sm" className="flex-1 rounded-xl px-3">
            <Link href={whatsappHref} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined}>
              <MessageCircle className="size-4" />
              WhatsApp
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}