import * as React from "react";
import { Pencil } from "lucide-react";

type InlineEditButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

export function InlineEditButton({
  "aria-label": ariaLabel,
  title,
  ...rest
}: InlineEditButtonProps) {
  return (
    <button
      type="button"
      className="ds-InlineEditButton"
      aria-label={ariaLabel ?? "Bearbeiten"}
      title={title ?? "Bearbeiten"}
      {...rest}
    >
      <Pencil aria-hidden focusable={false} />
    </button>
  );
}
