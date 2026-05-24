import Link from "next/link";

import SectionHeading from "@/components/common/section-heading";
import SectionWrapper from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";

export default function ProcessSection() {
  return (
    <SectionWrapper id="process" density="compact">
      <SectionHeading eyebrow="How we work" title="Discover, Build, Operate" subtitle="A focused, repeatable process so launches are predictable and support is clear." />

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h4 className="text-lg font-semibold text-slate-900">1. Discover</h4>
          <p className="mt-3 text-sm text-slate-600">20-minute qualification call, outcomes, and access checklist. We confirm fit and expected results.</p>
          <div className="mt-4">
            <Button asChild variant="link" className="px-0 text-sm">
              <Link href="/contact?source=discover">Start qualification</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h4 className="text-lg font-semibold text-slate-900">2. Build</h4>
          <p className="mt-3 text-sm text-slate-600">We implement the site, booking flow and WhatsApp handoff. You receive preview links and a launch checklist.</p>
          <div className="mt-4">
            <Button asChild variant="link" className="px-0 text-sm">
              <Link href="/services#build">See deliverables</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h4 className="text-lg font-semibold text-slate-900">3. Operate</h4>
          <p className="mt-3 text-sm text-slate-600">Monthly monitoring, small updates and routing to keep leads answered and bookings steady.</p>
          <div className="mt-4">
            <Button asChild variant="link" className="px-0 text-sm">
              <Link href="/pricing">View pricing ranges</Link>
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}