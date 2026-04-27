import * as React from "react";
import { Loader2 } from "lucide-react";

type ButtonProps = {
  variant?: "primary" | "ghost" | "danger" | "accent" | "success" | "link";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { children?: React.ReactNode };

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-variant={variant}
      data-size={size}
      data-loading={loading ? "true" : undefined}
      className={["ds-Button", className].filter(Boolean).join(" ")}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Loader2 aria-hidden focusable={false} className="ds-ButtonSpinner" />
      ) : iconLeft ? (
        <span className="ds-ButtonIcon" aria-hidden>{iconLeft}</span>
      ) : null}
      <span className="ds-ButtonLabel">{children}</span>
      {!loading && iconRight && <span className="ds-ButtonIcon" aria-hidden>{iconRight}</span>}
    </button>
  );
}
