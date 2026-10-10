// src/design-system/components/SelectMenu.tsx
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function SelectMenu({
  options,
  value,
  onValueChange,
  ariaLabel = "Open menu",
  align = "right",
  label,
  className
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current || !event.target) return;
      if (!rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref: rootRef, className: ["ds-SelectMenu", className].filter(Boolean).join(" "), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "ds-SelectMenuTrigger",
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-label": ariaLabel,
        onClick: () => setOpen((prev) => !prev),
        children: [
          label && /* @__PURE__ */ jsx("span", { className: "ds-SelectMenuLabel", children: label }),
          /* @__PURE__ */ jsx("span", { className: "ds-SelectMenuChevron", "aria-hidden": true, children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M6 8l4 4 4-4" }) }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "ds-SelectMenuContent", role: "listbox", "data-align": align, children: options.map((option) => {
      const selected = option.value === value;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": selected,
          className: "ds-SelectMenuOption",
          disabled: option.disabled,
          onClick: () => {
            if (option.disabled) return;
            onValueChange == null ? void 0 : onValueChange(option.value);
            setOpen(false);
          },
          children: /* @__PURE__ */ jsx("span", { className: "ds-SelectMenuOptionLabel", children: option.label })
        },
        option.value
      );
    }) })
  ] });
}

export {
  SelectMenu
};
//# sourceMappingURL=chunk-XKWS2UOZ.js.map