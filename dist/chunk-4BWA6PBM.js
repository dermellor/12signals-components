// src/design-system/components/Tabs.tsx
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var TabsCtx = React.createContext(null);
function TabsRoot({ value, defaultValue, onValueChange, children, ...rest }) {
  const [internal, setInternal] = React.useState(defaultValue || "");
  const isControlled = value !== void 0;
  const current = isControlled ? value : internal;
  const set = (v) => {
    if (!isControlled) setInternal(v);
    onValueChange == null ? void 0 : onValueChange(v);
  };
  return /* @__PURE__ */ jsx(TabsCtx.Provider, { value: { value: current, onChange: set }, children: /* @__PURE__ */ jsx("div", { className: "ds-Tabs", ...rest, children }) });
}
function TabsList({ children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: "ds-TabsList", role: "tablist", ...rest, children });
}
function TabsTrigger({ value, children, ...rest }) {
  const ctx = React.useContext(TabsCtx);
  const selected = ctx.value === value;
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": selected,
      "data-state": selected ? "active" : "inactive",
      className: "ds-TabsTrigger",
      onClick: () => ctx.onChange(value),
      ...rest,
      children
    }
  );
}
function TabsContent({ value, children, ...rest }) {
  const ctx = React.useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return /* @__PURE__ */ jsx("div", { className: "ds-TabsContent", role: "tabpanel", ...rest, children });
}
var Tabs = Object.assign(TabsRoot, { List: TabsList, Trigger: TabsTrigger, Content: TabsContent });

export {
  Tabs
};
//# sourceMappingURL=chunk-4BWA6PBM.js.map