import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
  density?: "default" | "compact";
};

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  centered = false,
  className,
  density = "default",
}: SectionHeadingProps) {
  return (
    <div className={cn(density === "compact" ? "max-w-2xl" : "max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p> : null}
      <h2 className={cn("text-balance font-semibold tracking-[-0.03em] text-foreground", density === "compact" ? "mt-2 text-2xl sm:text-3xl lg:text-4xl" : "mt-3 text-3xl sm:text-4xl lg:text-5xl")}>{title}</h2>
      {subtitle ? <p className={cn("max-w-2xl text-pretty text-muted-foreground", density === "compact" ? "mt-3 text-sm leading-7 sm:text-base" : "mt-5 text-base leading-7 sm:text-lg")}>{subtitle}</p> : null}
    </div>
  );
}