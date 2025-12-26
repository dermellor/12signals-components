import * as React from "react";

type ButtonProps = {
  variant?: "primary" | "ghost" | "danger" | "accent" | "success";
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-variant={variant}
      data-size={size}
      className="ds-Button"
      {...rest}
    >
      {iconLeft && <span className="ds-ButtonIcon" aria-hidden>{iconLeft}</span>}
      <span className="ds-ButtonLabel">{children}</span>
      {iconRight && <span className="ds-ButtonIcon" aria-hidden>{iconRight}</span>}
    </button>
  );
}
