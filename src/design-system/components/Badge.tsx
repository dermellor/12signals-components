import * as React from "react";

type BadgeProps<T extends keyof JSX.IntrinsicElements = "span"> = {
  as?: T;
  variant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent" | "secondary" | "homepage" | "advertising";
  tone?: "solid" | "subtle";
  size?: "sm" | "md";
} & React.ComponentPropsWithoutRef<T>;

export function Badge<T extends keyof JSX.IntrinsicElements = "span">({
  as,
  variant = "solid",
  tone = "solid",
  size = "md",
  children,
  ...rest
}: BadgeProps<T>) {
  const Comp = (as || "span") as React.ElementType;
  return (
    <Comp className="ds-Badge" data-variant={variant} data-tone={tone} data-size={size} {...rest}>
      {children}
    </Comp>
  );
}
