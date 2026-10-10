// src/design-system/components/Toast.tsx
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var ToastCtx = React.createContext(null);
function ToastProvider({ children }) {
  const [items, setItems] = React.useState([]);
  const idRef = React.useRef(1);
  const show = (t) => {
    const id = idRef.current++;
    setItems((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 3500);
  };
  return /* @__PURE__ */ jsxs(ToastCtx.Provider, { value: { show }, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "ds-ToastViewport", "aria-live": "polite", "aria-atomic": "true", children: items.map((i) => /* @__PURE__ */ jsxs("div", { className: "ds-Toast", "data-variant": i.variant || "info", children: [
      i.title && /* @__PURE__ */ jsx("div", { className: "ds-ToastTitle", children: i.title }),
      i.description && /* @__PURE__ */ jsx("div", { className: "ds-ToastDescription", children: i.description })
    ] }, i.id)) })
  ] });
}
function useToast() {
  const ctx = React.useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export {
  ToastProvider,
  useToast
};
//# sourceMappingURL=chunk-JHTQGBJI.js.map