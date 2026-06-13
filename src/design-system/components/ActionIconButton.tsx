import * as React from "react";
import { Eye, Trash2, Save, Pencil, Loader2, Power, Star } from "lucide-react";

const actionMeta = {
  view: { label: "Ansehen", Icon: Eye },
  delete: { label: "Löschen", Icon: Trash2 },
  save: { label: "Speichern", Icon: Save },
  edit: { label: "Editieren", Icon: Pencil },
  deactivate: { label: "Deaktivieren", Icon: Power },
  star: { label: "Stern setzen", Icon: Star },
} as const;

export type ActionIcon = keyof typeof actionMeta;

type ActionIconButtonProps = {
  action: ActionIcon;
  size?: "default" | "sm";
  tone?: "default" | "subtle";
  loading?: boolean;
  selected?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function ActionIconButton({
  action,
  size = "default",
  tone = "default",
  loading = false,
  selected = false,
  "aria-label": ariaLabel,
  title,
  className,
  ...rest
}: ActionIconButtonProps) {
  const { Icon, label } = actionMeta[action];
  const resolvedLabel = ariaLabel ?? label;
  const cn = ["ds-ActionIconButton", className].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      data-action={action}
      data-size={size}
      data-tone={tone}
      data-selected={selected ? "true" : undefined}
      data-loading={loading ? "true" : undefined}
      className={cn}
      aria-label={resolvedLabel}
      aria-busy={loading || undefined}
      title={title ?? label}
      {...rest}
    >
      {loading ? (
        <Loader2 aria-hidden focusable={false} className="ds-ActionIconButtonSpinner" />
      ) : (
        <Icon aria-hidden focusable={false} />
      )}
    </button>
  );
}
