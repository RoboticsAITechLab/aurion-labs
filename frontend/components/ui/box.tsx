import * as React from "react";

import { cn } from "@/lib/utils";

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "card" | "plain";
  radius?: "md" | "lg" | "none";
  shadow?: boolean;
  as?: React.ElementType;
};

export default function Box({
  className,
  variant = "card",
  radius = "lg",
  shadow = true,
  as: Comp = "div",
  ...props
}: BoxProps) {
  const radiusClass = radius === "none" ? "rounded-none" : radius === "md" ? "rounded-md" : "rounded-lg";
  const base =
    variant === "card"
      ? `bg-card text-card-foreground border border-slate-200 ${radiusClass} p-4`
      : `bg-transparent text-foreground ${radiusClass}`;
  const shadowClass = shadow ? "shadow-sm hover:shadow-md transition-shadow duration-200" : "";

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <Comp data-slot="box" className={cn(base, shadowClass, className)} {...props} />
  );
}

export { Box };
