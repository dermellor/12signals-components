import {
  Text
} from "./chunk-MTQGJRER.js";

// src/design-system/components/PageHeader.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function PageHeader({ title, subtitle, actions, ...rest }) {
  return /* @__PURE__ */ jsxs("header", { className: "ds-PageHeader", ...rest, children: [
    /* @__PURE__ */ jsxs("div", { className: "ds-PageHeaderMain", children: [
      /* @__PURE__ */ jsx(Text, { as: "h1", size: "2xl", weight: "semibold", children: title }),
      subtitle && /* @__PURE__ */ jsx(Text, { size: "sm", as: "p", children: subtitle })
    ] }),
    actions && /* @__PURE__ */ jsx("div", { className: "ds-PageHeaderActions", children: actions })
  ] });
}

export {
  PageHeader
};
//# sourceMappingURL=chunk-26UUUNEG.js.map