// src/design-system/components/Text.tsx
import { jsx } from "react/jsx-runtime";
function Text({
  as,
  size = "sm",
  weight = "regular",
  tone = "default",
  children,
  className,
  ...rest
}) {
  const Comp = as || "p";
  const mergedClassName = ["ds-Text", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-size": size,
      "data-weight": weight,
      "data-tone": tone,
      className: mergedClassName,
      ...rest,
      children
    }
  );
}

export {
  Text
};
//# sourceMappingURL=chunk-MTQGJRER.js.map