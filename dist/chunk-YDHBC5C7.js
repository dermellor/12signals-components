// src/design-system/components/RichText.tsx
import { jsx } from "react/jsx-runtime";
function RichText({ as, children, ...rest }) {
  const Comp = as || "div";
  return /* @__PURE__ */ jsx(Comp, { className: "ds-RichText", ...rest, children });
}

export {
  RichText
};
//# sourceMappingURL=chunk-YDHBC5C7.js.map