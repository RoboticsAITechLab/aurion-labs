import Container from "@/components/common/container";
import { cn } from "@/lib/utils";

type SectionWrapperProps = React.ComponentProps<"section"> & {
  contained?: boolean;
  density?: "default" | "compact" | "relaxed";
};

const densityClasses = {
  compact: "py-14 sm:py-18 lg:py-20",
  default: "py-24 sm:py-28 lg:py-36",
  relaxed: "py-28 sm:py-32 lg:py-40",
} as const;

export default function SectionWrapper({ className, children, contained = true, density = "default", ...props }: SectionWrapperProps) {
  return (
    <section className={cn(densityClasses[density], className)} {...props}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
