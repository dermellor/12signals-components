// src/design-system/components/TextField.tsx
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function TextField({ label, description, error, inputProps, ...rest }) {
  const id = React.useId();
  const describedBy = [];
  if (description) describedBy.push(`${id}-desc`);
  if (error) describedBy.push(`${id}-err`);
  return /* @__PURE__ */ jsxs("div", { className: "ds-TextField", ...rest, children: [
    /* @__PURE__ */ jsx("label", { className: "ds-TextFieldLabel", htmlFor: id, children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id,
        "aria-invalid": !!error,
        "aria-describedby": describedBy.join(" ") || void 0,
        className: "ds-TextFieldInput",
        ...inputProps
      }
    ),
    description && /* @__PURE__ */ jsx("div", { id: `${id}-desc`, className: "ds-TextFieldDescription", children: description }),
    error && /* @__PURE__ */ jsx("div", { id: `${id}-err`, className: "ds-TextFieldError", role: "alert", children: error })
  ] });
}

export {
  TextField
};
//# sourceMappingURL=chunk-T2LAZ7D5.js.map