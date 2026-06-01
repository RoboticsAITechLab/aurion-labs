import { cn } from "@/lib/utils";

type ProofItem = {
  label: string;
  value: string;
  detail?: string;
};

type ProofStripProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: ProofItem[];
  className?: string;
};

export default function ProofStrip({ eyebrow, title, subtitle, items, className }: ProofStripProps) {
  return (
    <div className={cn("rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8", className)}>
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{eyebrow}</p> : null}
          <h3 className="mt-4 text-balance text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">{title}</h3>
          {subtitle ? <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">{subtitle}</p> : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="rounded-[1.2rem] border border-slate-100 bg-slate-50 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{item.value}</p>
              {item.detail ? <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}