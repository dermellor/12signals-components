// src/design-system/components/NavigationToggle.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function NavigationToggle({ ariaLabel = "Toggle navigation", icon, ...rest }) {
  return /* @__PURE__ */ jsx("button", { type: "button", className: "ds-NavigationToggle", "aria-label": ariaLabel, ...rest, children: /* @__PURE__ */ jsx("span", { className: "ds-NavigationToggleIcon", "aria-hidden": true, children: icon != null ? icon : /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx("path", { d: "M4 7h16" }),
    /* @__PURE__ */ jsx("path", { d: "M4 12h16" }),
    /* @__PURE__ */ jsx("path", { d: "M4 17h16" })
  ] }) }) });
}

export {
  NavigationToggle
};
//# sourceMappingURL=chunk-MRWSUFND.js.map