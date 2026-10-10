// src/design-system/components/Button.tsx
import * as React from "react";
import { Loader2 } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = React.forwardRef(function Button2({
  variant = "primary",
  size = "md",
  loading = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  className,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      "data-variant": variant,
      "data-size": size,
      "data-loading": loading ? "true" : void 0,
      className: ["ds-Button", className].filter(Boolean).join(" "),
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      ...rest,
      children: [
        loading ? /* @__PURE__ */ jsx(Loader2, { "aria-hidden": true, focusable: false, className: "ds-ButtonSpinner" }) : iconLeft ? /* @__PURE__ */ jsx("span", { className: "ds-ButtonIcon", "aria-hidden": true, children: iconLeft }) : null,
        /* @__PURE__ */ jsx("span", { className: "ds-ButtonLabel", children }),
        !loading && iconRight && /* @__PURE__ */ jsx("span", { className: "ds-ButtonIcon", "aria-hidden": true, children: iconRight })
      ]
    }
  );
});

export {
  Button
};
//# sourceMappingURL=chunk-LRWW7BLR.js.map