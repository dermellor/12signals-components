// src/design-system/components/InlineEditButton.tsx
import { Pencil } from "lucide-react";
import { jsx } from "react/jsx-runtime";
function InlineEditButton({
  "aria-label": ariaLabel,
  title,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: "ds-InlineEditButton",
      "aria-label": ariaLabel != null ? ariaLabel : "Bearbeiten",
      title: title != null ? title : "Bearbeiten",
      ...rest,
      children: /* @__PURE__ */ jsx(Pencil, { "aria-hidden": true, focusable: false })
    }
  );
}

export {
  InlineEditButton
};
//# sourceMappingURL=chunk-NVVYP7FD.js.map