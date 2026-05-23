import Link from "next/link";

import { ArrowUpRight, MonitorSmartphone, ShieldCheck, Workflow } from "lucide-react";

import SectionHeading from "@/components/common/section-heading";
import SectionWrapper from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Business Websites",
    description: "A clear front door for your company. Fast pages, sharp hierarchy, and a structure people can use without hesitation.",
    icon: MonitorSmartphone,
    emphasis: "lg:col-span-2",
  },
  {
    title: "Booking Systems",
    description: "Scheduling, intake, and confirmations arranged so your team spends less time chasing replies.",
    icon: Workflow,
    emphasis: "",
  },
  {
    title: "SEO + Site Structure",
    description: "Performance, metadata, and page structure that keep the site easy to maintain and easy to find.",
    icon: ShieldCheck,
    emphasis: "",
  },
];

export default function ServicesSection() {
  return (
    <SectionWrapper id="services">
      <SectionHeading eyebrow="Core Offerings" title="Core Offerings" subtitle="The work stays focused on the parts that shape trust, speed, and day-to-day usability." />

      <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:auto-rows-[minmax(180px,auto)]">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isFeatured = index === 0;
          const cardSpan = index === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5";

          return (
            <article
              key={service.title}
              className={`${service.emphasis} ${cardSpan} group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.35)]`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-md">
                  <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{service.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{service.description}</p>
                </div>

                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 md:block">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                    <ArrowUpRight className="size-4 text-blue-600" />
                    {isFeatured ? "Lead page" : "Supporting layer"}
                  </div>
                  <div className="mt-8 h-24 w-36 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(219,234,254,0.55))] shadow-inner" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Detailed service architecture lives on the dedicated page.</p>
        <Button asChild variant="outline" className="rounded-full border-slate-200 px-5 text-slate-700">
          <Link href="/services">
            View All Services
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
