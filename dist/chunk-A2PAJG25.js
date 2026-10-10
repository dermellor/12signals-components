// src/design-system/components/Input.tsx
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var Input = React.forwardRef(
  ({ size = "md", invalid, className, ...rest }, ref) => {
    const composedClassName = ["ds-Input", className].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        className: composedClassName,
        "data-size": size,
        "aria-invalid": invalid || void 0,
        ...rest
      }
    );
  }
);
Input.displayName = "Input";

export {
  Input
};
//# sourceMappingURL=chunk-A2PAJG25.js.map