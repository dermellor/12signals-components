import {
  Text
} from "./chunk-MTQGJRER.js";

// src/design-system/components/NavigationBar.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function NavigationBar({
  title,
  subtitle,
  brand,
  brandAccessory,
  leading,
  actions,
  leadingPosition = "left",
  className,
  ...rest
}) {
  const showLeadingLeft = leading && leadingPosition === "left";
  const showLeadingRight = leading && leadingPosition === "right";
  return /* @__PURE__ */ jsxs("header", { className: ["ds-NavigationBar", className].filter(Boolean).join(" "), ...rest, children: [
    showLeadingLeft && /* @__PURE__ */ jsx("div", { className: "ds-NavigationBarLeading", children: leading }),
    /* @__PURE__ */ jsx("div", { className: "ds-NavigationBarBrand", children: brand ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "ds-NavigationBarBrandContent", children: [
        brand,
        brandAccessory && /* @__PURE__ */ jsx("div", { className: "ds-NavigationBarBrandAccessory", children: brandAccessory })
      ] }),
      subtitle && /* @__PURE__ */ jsx(Text, { size: "xs", tone: "muted", children: subtitle })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      title != null && /* @__PURE__ */ jsx(Text, { as: "div", weight: "semibold", children: title }),
      subtitle && /* @__PURE__ */ jsx(Text, { size: "xs", tone: "muted", children: subtitle })
    ] }) }),
    actions && /* @__PURE__ */ jsx("div", { className: "ds-NavigationBarActions", children: actions }),
    showLeadingRight && /* @__PURE__ */ jsx("div", { className: "ds-NavigationBarLeading", children: leading })
  ] });
}

export {
  NavigationBar
};
//# sourceMappingURL=chunk-XVVUA3PM.js.map