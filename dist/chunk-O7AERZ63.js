// src/design-system/components/Badge.tsx
import { jsx } from "react/jsx-runtime";
function Badge({
  as,
  variant = "solid",
  tone = "solid",
  size = "md",
  children,
  ...rest
}) {
  const Comp = as || "span";
  return /* @__PURE__ */ jsx(Comp, { className: "ds-Badge", "data-variant": variant, "data-tone": tone, "data-size": size, ...rest, children });
}

export {
  Badge
};
//# sourceMappingURL=chunk-O7AERZ63.js.map