// src/design-system/components/FilterBadge.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function FilterBadge({
  label,
  active,
  removable = false,
  onToggle,
  onEdit,
  onRemove,
  variant = "default",
  size = "md",
  toggleAriaLabel,
  editAriaLabel = "Edit filter",
  removeAriaLabel = "Remove filter",
  children
}) {
  const handle = (cb) => (e) => {
    e.stopPropagation();
    cb == null ? void 0 : cb();
  };
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: "ds-FilterBadge",
      "data-variant": variant,
      "data-size": size,
      "data-state": active ? "active" : "inactive",
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "ds-FilterBadgeToggle",
            "aria-pressed": variant === "add" ? void 0 : active,
            "aria-label": toggleAriaLabel,
            onClick: onToggle,
            children: [
              /* @__PURE__ */ jsx("span", { className: "ds-FilterBadgeLabel", children: label }),
              children
            ]
          }
        ),
        onEdit && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "ds-FilterBadgeAction",
            "aria-label": editAriaLabel,
            onClick: handle(onEdit),
            children: /* @__PURE__ */ jsx("svg", { width: "11", height: "11", viewBox: "0 0 12 12", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M8.5 1.5l2 2L4 10l-2.5.5L2 8l6.5-6.5z",
                stroke: "currentColor",
                strokeWidth: "1.2",
                strokeLinejoin: "round",
                fill: "none"
              }
            ) })
          }
        ),
        removable && onRemove ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "ds-FilterBadgeAction",
            "aria-label": removeAriaLabel,
            onClick: handle(onRemove),
            children: /* @__PURE__ */ jsx("svg", { width: "10", height: "10", viewBox: "0 0 10 10", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M1 1l8 8M9 1L1 9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
          }
        ) : null
      ]
    }
  );
}

export {
  FilterBadge
};
//# sourceMappingURL=chunk-6VT2LBFU.js.map