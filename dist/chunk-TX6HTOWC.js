// src/design-system/components/NavigationBrand.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function NavigationBrand({ href, logo, label, className, ...rest }) {
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    logo && /* @__PURE__ */ jsx("span", { className: "ds-NavigationBrandLogo", "aria-hidden": true, children: logo }),
    label && /* @__PURE__ */ jsx("span", { className: "ds-NavigationBrandLabel", children: label })
  ] });
  return /* @__PURE__ */ jsx("div", { className: ["ds-NavigationBrand", className].filter(Boolean).join(" "), ...rest, children: href ? /* @__PURE__ */ jsx("a", { className: "ds-NavigationBrandLink", href, children: content }) : /* @__PURE__ */ jsx("div", { className: "ds-NavigationBrandLink", children: content }) });
}

export {
  NavigationBrand
};
//# sourceMappingURL=chunk-TX6HTOWC.js.map