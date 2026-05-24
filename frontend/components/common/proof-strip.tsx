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
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{eyebrow}</p> : null}
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{title}</h3>
          {subtitle ? <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{subtitle}</p> : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
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