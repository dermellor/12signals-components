// src/design-system/components/Heading.tsx
import { jsx } from "react/jsx-runtime";
function Heading({ level = 2, className, children, ...rest }) {
  const Comp = `h${level}`;
  const cn = ["ds-Heading", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx(Comp, { className: cn, "data-level": level, ...rest, children });
}

export {
  Heading
};
//# sourceMappingURL=chunk-LPOOXJF6.js.map