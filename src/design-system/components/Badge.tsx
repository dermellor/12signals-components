import * as React from "react";

type BadgeProps = {
  variant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent" | "secondary";
  tone?: "solid" | "subtle";
  size?: "sm" | "md";
} & React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ variant = "solid", tone = "solid", size = "md", children, ...rest }: BadgeProps) {
  return (
    <span className="ds-Badge" data-variant={variant} data-tone={tone} data-size={size} {...rest}>
      {children}
    </span>
  );
}
