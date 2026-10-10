// src/design-system/components/DevButton.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function DevButton({
  children,
  type = "button",
  ...rest
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type,
      className: "ds-DevButton",
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "[" }),
        /* @__PURE__ */ jsx("span", { className: "ds-DevButtonLabel", children }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "]" })
      ]
    }
  );
}

export {
  DevButton
};
//# sourceMappingURL=chunk-CPG7W4TS.js.map