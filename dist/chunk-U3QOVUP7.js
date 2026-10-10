// src/design-system/components/Navigation.tsx
import * as React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function Navigation({
  items,
  value,
  onValueChange,
  ariaLabel,
  orientation = "vertical",
  className,
  style
}) {
  const handleSelect = React.useCallback(
    (item) => {
      var _a;
      if (item.disabled) return;
      (_a = item.onSelect) == null ? void 0 : _a.call(item, item.value);
      onValueChange == null ? void 0 : onValueChange(item.value);
    },
    [onValueChange]
  );
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: ["ds-Navigation", className].filter(Boolean).join(" "),
      "aria-label": ariaLabel,
      "data-orientation": orientation,
      style,
      children: /* @__PURE__ */ jsx("ul", { className: "ds-NavigationList", children: items.map((item) => {
        const active = item.value === value;
        const content = /* @__PURE__ */ jsxs(Fragment, { children: [
          item.icon && /* @__PURE__ */ jsx("span", { className: "ds-NavigationIcon", "aria-hidden": true, children: item.icon }),
          /* @__PURE__ */ jsxs("span", { className: "ds-NavigationText", children: [
            /* @__PURE__ */ jsx("span", { className: "ds-NavigationLabel", children: item.label }),
            item.description && /* @__PURE__ */ jsx("span", { className: "ds-NavigationDescription", children: item.description })
          ] }),
          item.badge && /* @__PURE__ */ jsx("span", { className: "ds-NavigationBadge", children: item.badge })
        ] });
        return /* @__PURE__ */ jsx("li", { className: "ds-NavigationItem", children: item.href ? /* @__PURE__ */ jsx(
          "a",
          {
            href: item.href,
            className: "ds-NavigationLink",
            "data-state": active ? "active" : "inactive",
            "aria-current": active ? "page" : void 0,
            "aria-disabled": item.disabled || void 0,
            onClick: (event) => {
              if (item.disabled) {
                event.preventDefault();
                return;
              }
              handleSelect(item);
            },
            children: content
          }
        ) : /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "ds-NavigationLink",
            "data-state": active ? "active" : "inactive",
            "aria-current": active ? "page" : void 0,
            disabled: item.disabled,
            onClick: () => handleSelect(item),
            children: content
          }
        ) }, item.value);
      }) })
    }
  );
}

export {
  Navigation
};
//# sourceMappingURL=chunk-U3QOVUP7.js.map