// src/design-system/components/ActionIconButton.tsx
import { Eye, Trash2, Save, Pencil, Loader2, Power, Star } from "lucide-react";
import { jsx } from "react/jsx-runtime";
var actionMeta = {
  view: { label: "Ansehen", Icon: Eye },
  delete: { label: "L\xF6schen", Icon: Trash2 },
  save: { label: "Speichern", Icon: Save },
  edit: { label: "Editieren", Icon: Pencil },
  deactivate: { label: "Deaktivieren", Icon: Power },
  star: { label: "Stern setzen", Icon: Star }
};
function ActionIconButton({
  action,
  size = "default",
  tone = "default",
  loading = false,
  selected = false,
  "aria-label": ariaLabel,
  title,
  className,
  ...rest
}) {
  const { Icon, label } = actionMeta[action];
  const resolvedLabel = ariaLabel != null ? ariaLabel : label;
  const cn = ["ds-ActionIconButton", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "data-action": action,
      "data-size": size,
      "data-tone": tone,
      "data-selected": selected ? "true" : void 0,
      "data-loading": loading ? "true" : void 0,
      className: cn,
      "aria-label": resolvedLabel,
      "aria-busy": loading || void 0,
      title: title != null ? title : label,
      ...rest,
      children: loading ? /* @__PURE__ */ jsx(Loader2, { "aria-hidden": true, focusable: false, className: "ds-ActionIconButtonSpinner" }) : /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, focusable: false })
    }
  );
}

export {
  ActionIconButton
};
//# sourceMappingURL=chunk-ACQ5272V.js.map