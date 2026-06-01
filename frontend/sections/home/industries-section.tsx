import Link from "next/link";

import {
  Briefcase,
  Building2,
  Dumbbell,
  GraduationCap,
  Home,
  Scissors,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";

import SectionHeading from "@/components/common/section-heading";
import OperationalVisual from "@/components/common/operational-visual";
import SectionWrapper from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";

const industries = [
  { label: "Gym", icon: Dumbbell },
  { label: "Clinic", icon: Stethoscope },
  { label: "Restaurant", icon: UtensilsCrossed },
  { label: "Salon", icon: Scissors },
  { label: "Real Estate", icon: Home },
  { label: "Medical", icon: Building2 },
  { label: "Coaching", icon: GraduationCap },
  { label: "Business", icon: Briefcase },
];

export default function IndustriesSection() {
  return (
    <SectionWrapper id="industries" className="bg-slate-50/70">
      <SectionHeading eyebrow="Built Around The Business" title="Pages tailored to how each business actually gets customers" subtitle="Each category needs a different path to trust, action, and follow-up. The messaging changes to match that behavior." />

      <div className="mt-10">
        <OperationalVisual
          eyebrow="Industry behavior"
          title="The visual system stays calm while the workflow changes by category."
          subtitle="A clinic, gym, restaurant, or salon should not feel like the same page with different labels. The route to action needs to match how people decide in that business."
          statusLabel="Core pattern"
          status="Trust → action → follow-up"
          steps={[
            "Clinics need a calmer path to appointments and intake.",
            "Gyms need quicker momentum from interest to trial or membership.",
            "Restaurants, salons, and coaches need faster access to the right action.",
          ]}
          highlights={[
            { label: "Clinic", value: "Trust-first" },
            { label: "Gym", value: "Momentum-first" },
            { label: "Salon", value: "Visual-first" },
          ]}
        />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => {
          const Icon = industry.icon;
          const liftClass = industry.label === "Clinic" || industry.label === "Real Estate" ? "lg:translate-y-4" : industry.label === "Salon" ? "lg:-translate-y-2" : "";

          return (
            <article
              key={industry.label}
              className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_45px_-30px_rgba(15,23,42,0.35)] ${liftClass}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-600 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-950">{industry.label}</h3>
              {industry.label === "Gym" ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">Lead with energy, simplify sign-ups, and make class or membership action easy on mobile.</p>
              ) : null}
              {industry.label === "Clinic" ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">Keep the layout calm, explain the services clearly, and make appointments easy to request.</p>
              ) : null}
              {industry.label === "Restaurant" ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">Show the menu fast, make reservations obvious, and keep ordering or calling within reach.</p>
              ) : null}
              {industry.label === "Salon" ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">Let the visuals breathe, then move visitors straight to booking, availability, and WhatsApp.</p>
              ) : null}
              {industry.label === "Real Estate" ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">Present listings with less noise and more room for detail, trust, and inquiry paths.</p>
              ) : null}
              {industry.label === "Medical" ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">Use clear navigation, plain language, and a structure that helps people find care quickly.</p>
              ) : null}
              {industry.label === "Coaching" ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">Put the offer first, explain the process simply, and make the next step feel obvious.</p>
              ) : null}
              {industry.label === "Business" ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">Anchor the message, clarify the offer, and remove the filler that slows decisions.</p>
              ) : null}
            </article>
          );
        })}
      </div>
      <div className="mt-8 flex justify-end">
        <Button asChild variant="outline" className="rounded-full border-slate-200 px-5 text-slate-700">
          <Link href="/industries">
            See Industry Pages
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}