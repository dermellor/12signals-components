// src/design-system/components/Alert.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Alert({ variant = "info", title, children, ...rest }) {
  return /* @__PURE__ */ jsxs("div", { className: "ds-Alert", role: variant === "danger" ? "alert" : "status", "data-variant": variant, ...rest, children: [
    title && /* @__PURE__ */ jsx("div", { className: "ds-AlertTitle", children: title }),
    children && /* @__PURE__ */ jsx("div", { className: "ds-AlertDescription", children })
  ] });
}

export {
  Alert
};
//# sourceMappingURL=chunk-74JKSH44.js.map