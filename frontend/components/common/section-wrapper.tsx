import Container from "@/components/common/container";
import { cn } from "@/lib/utils";

type SectionWrapperProps = React.ComponentProps<"section"> & {
  contained?: boolean;
};

export default function SectionWrapper({ className, children, contained = true, ...props }: SectionWrapperProps) {
  return (
    <section className={cn("py-24 sm:py-28 lg:py-36", className)} {...props}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}