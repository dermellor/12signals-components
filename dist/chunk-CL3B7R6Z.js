// src/design-system/components/Tooltip.tsx
import * as React from "react";
import { createPortal } from "react-dom";
import { jsx, jsxs } from "react/jsx-runtime";
function Tooltip({ content, children, className, style, multiline }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  React.useEffect(() => {
    if (!open || !ref.current) {
      setPos(null);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: rect.left + rect.width / 2
    });
  }, [open]);
  const rootClass = className ? `ds-TooltipRoot ${className}` : "ds-TooltipRoot";
  const contentClass = multiline ? "ds-TooltipContent ds-TooltipContent--portal ds-TooltipContent--multiline" : "ds-TooltipContent ds-TooltipContent--portal";
  return /* @__PURE__ */ jsxs("div", { className: rootClass, style, ref, onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), children: [
    children,
    open && pos && createPortal(
      /* @__PURE__ */ jsx(
        "div",
        {
          role: "tooltip",
          className: contentClass,
          style: { top: pos.top, left: pos.left },
          children: content
        }
      ),
      document.body
    )
  ] });
}

export {
  Tooltip
};
//# sourceMappingURL=chunk-CL3B7R6Z.js.map