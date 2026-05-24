import SectionWrapper from "@/components/common/section-wrapper";
import SectionHeading from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SupportPage() {
  return (
    <SectionWrapper>
      <SectionHeading eyebrow="Support & SLA" title="Support packages, response times, and scope" subtitle="Clear boundaries and predictable response times so you know what to expect after launch." />

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h4 className="text-lg font-semibold text-slate-900">Basic Support</h4>
          <p className="mt-3 text-sm text-slate-600">48–72 hour response window. Minor fixes only. No structural changes.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h4 className="text-lg font-semibold text-slate-900">Managed Support</h4>
          <p className="mt-3 text-sm text-slate-600">24–48 hour response. Content edits, monitoring, and small workflow improvements.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h4 className="text-lg font-semibold text-slate-900">Infrastructure Support</h4>
          <p className="mt-3 text-sm text-slate-600">Priority queue, workflow troubleshooting, operational assistance, dashboard and automation support.</p>
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <h4 className="text-lg font-semibold text-slate-900">Support rules</h4>
        <ul className="mt-3 list-inside list-disc text-sm text-slate-600">
          <li>Working hours and emergency definition agreed during onboarding.</li>
          <li>Emergency response is separately contracted and defined.</li>
          <li>Revision caps and scope protection apply; major workflow changes require separate quotes.</li>
        </ul>
      </div>

      <div className="mt-10">
        <p className="text-sm text-slate-600">To request support or learn which package fits your business, book a short call or send a WhatsApp message.</p>
        <div className="mt-4 flex gap-3">
          <Button asChild>
            <Link href="/contact">Book Support Call</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">WhatsApp Inquiry</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
