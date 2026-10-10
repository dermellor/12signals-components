// src/design-system/components/DateTimeInput.tsx
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var DateTimeInput = React.forwardRef(
  ({ size = "md", invalid, className, ...rest }, ref) => {
    const composedClassName = ["ds-Input", className].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        type: "datetime-local",
        className: composedClassName,
        "data-size": size,
        "aria-invalid": invalid || void 0,
        ...rest
      }
    );
  }
);
DateTimeInput.displayName = "DateTimeInput";

export {
  DateTimeInput
};
//# sourceMappingURL=chunk-2J6PNNAA.js.map