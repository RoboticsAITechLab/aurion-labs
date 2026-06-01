import Container from "@/components/common/container";
import { cn } from "@/lib/utils";

type SectionWrapperProps = React.ComponentProps<"section"> & {
  contained?: boolean;
  density?: "default" | "compact" | "relaxed";
};

const densityClasses = {
  compact: "py-12 sm:py-16 lg:py-16",
  default: "py-20 sm:py-24 lg:py-28",
  relaxed: "py-24 sm:py-28 lg:py-32",
} as const;

export default function SectionWrapper({ className, children, contained = true, density = "default", ...props }: SectionWrapperProps) {
  return (
    <section className={cn(densityClasses[density], className)} {...props}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}

