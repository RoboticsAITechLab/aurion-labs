import SectionHeading from "@/components/common/section-heading";
import SectionWrapper from "@/components/common/section-wrapper";

const steps = ["Consultation", "Strategy", "Development", "Launch"];

export default function ProcessSection() {
  return (
    <SectionWrapper id="process" className="py-18 sm:py-20 lg:py-24">
      <SectionHeading eyebrow="How We Work" title="How We Work" subtitle="A clear four-step process that keeps delivery calm, predictable, and easy to follow from start to finish." centered />

      <div className="mx-auto mt-12 max-w-4xl">
        <div className="grid gap-6">
          {steps.map((step, index) => (
            <div key={step} className="grid grid-cols-[auto_1fr] items-start gap-5">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-500 shadow-sm">
                0{index + 1}
              </div>
              <div className="pb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">{step}</h3>
                  {index < steps.length - 1 ? <div className="h-px flex-1 bg-slate-200" /> : null}
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  {index === 0 ? "We start by defining the offer, the route to contact, and the parts of the site that need to carry weight." : null}
                  {index === 1 ? "Then we map the structure so the page reads cleanly on desktop and mobile without extra noise." : null}
                  {index === 2 ? "We build the interface with a focus on speed, spacing, and maintenance rather than decoration." : null}
                  {index === 3 ? "Launch means the site is ready to ship, simple to navigate, and easy for the team to own." : null}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}