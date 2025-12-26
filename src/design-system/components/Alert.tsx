import * as React from "react";

type AlertProps = {
  variant?: "info" | "success" | "warning" | "danger";
  title?: React.ReactNode;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Alert({ variant = "info", title, children, ...rest }: AlertProps) {
  return (
    <div className="ds-Alert" role={variant === 'danger' ? 'alert' : 'status'} data-variant={variant} {...rest}>
      {title && <div className="ds-AlertTitle">{title}</div>}
      {children && <div className="ds-AlertDescription">{children}</div>}
    </div>
  );
}

