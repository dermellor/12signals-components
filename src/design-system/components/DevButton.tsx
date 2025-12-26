import * as React from "react";

type DevButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DevButton({
  children,
  type = "button",
  ...rest
}: DevButtonProps) {
  return (
    <button
      type={type}
      className="ds-DevButton"
      {...rest}
    >
      <span aria-hidden>[</span>
      <span className="ds-DevButtonLabel">{children}</span>
      <span aria-hidden>]</span>
    </button>
  );
}
