// src/design-system/components/Skeleton.tsx
import { jsx } from "react/jsx-runtime";
function Skeleton({ round, style, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: "ds-Skeleton", style: { borderRadius: round ? "var(--radius-pill)" : void 0, ...style }, ...rest });
}

export {
  Skeleton
};
//# sourceMappingURL=chunk-2INBPIYL.js.map