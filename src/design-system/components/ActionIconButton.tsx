import * as React from "react";
import { Eye, Trash2, Save, Pencil, Loader2, Power } from "lucide-react";

const actionMeta = {
  view: { label: "Ansehen", Icon: Eye },
  delete: { label: "Löschen", Icon: Trash2 },
  save: { label: "Speichern", Icon: Save },
  edit: { label: "Editieren", Icon: Pencil },
  deactivate: { label: "Deaktivieren", Icon: Power },
} as const;

export type ActionIcon = keyof typeof actionMeta;

type ActionIconButtonProps = {
  action: ActionIcon;
  loading?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function ActionIconButton({
  action,
  loading = false,
  "aria-label": ariaLabel,
  title,
  ...rest
}: ActionIconButtonProps) {
  const { Icon, label } = actionMeta[action];
  const resolvedLabel = ariaLabel ?? label;

  return (
    <button
      type="button"
      data-action={action}
      data-loading={loading ? "true" : undefined}
      className="ds-ActionIconButton"
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
