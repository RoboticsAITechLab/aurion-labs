import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
};

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p> : null}
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}