// src/design-system/components/Select.tsx
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function textFromNode(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (React.isValidElement(node)) {
    return textFromNode(node.props.children);
  }
  return "";
}
function selectValueToString(value) {
  if (Array.isArray(value)) return value[0] == null ? void 0 : String(value[0]);
  return value == null ? void 0 : String(value);
}
function selectedOptionLabel(children, value) {
  var _a;
  const options = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child)
  );
  const selectedValue = selectValueToString(value);
  const selected = selectedValue == null ? (_a = options.find((option) => option.props.selected)) != null ? _a : options[0] : options.find((option) => {
    var _a2;
    const optionText = textFromNode(option.props.children);
    return String((_a2 = option.props.value) != null ? _a2 : optionText) === selectedValue;
  });
  return selected ? textFromNode(selected.props.children).trim() : "";
}
var Select = React.forwardRef(
  ({
    size = "md",
    variant = "default",
    children,
    className,
    style,
    value,
    defaultValue,
    onChange,
    ...rest
  }, ref) => {
    var _a;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const classNames = (_a = className == null ? void 0 : className.split(" ").filter(Boolean)) != null ? _a : [];
    const isIconSelect = classNames.includes("ds-Select--icon");
    const withChevron = isIconSelect || variant === "plain";
    const currentValue = value !== void 0 ? value : uncontrolledValue;
    const plainLabel = variant === "plain" ? selectedOptionLabel(children, currentValue) : "";
    const handleChange = (event) => {
      if (value === void 0) setUncontrolledValue(event.currentTarget.value);
      onChange == null ? void 0 : onChange(event);
    };
    return /* @__PURE__ */ jsxs("div", { className: "ds-SelectWrap", "data-variant": variant, children: [
      variant === "plain" ? /* @__PURE__ */ jsx("span", { className: "ds-SelectPlainSizer", "aria-hidden": true, children: plainLabel || "\xA0" }) : null,
      /* @__PURE__ */ jsx(
        "select",
        {
          ref,
          className: ["ds-Select", className].filter(Boolean).join(" "),
          "data-size": size,
          "data-variant": variant,
          value,
          defaultValue,
          onChange: handleChange,
          style: {
            ...style,
            ...withChevron ? { backgroundImage: "none", appearance: "none", WebkitAppearance: "none" } : null
          },
          ...rest,
          children
        }
      ),
      withChevron && /* @__PURE__ */ jsx("span", { className: "ds-SelectChevron", "aria-hidden": true, children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M6 8l4 4 4-4" }) }) })
    ] });
  }
);
Select.displayName = "Select";
var SelectOption = (props) => /* @__PURE__ */ jsx("option", { ...props });

export {
  Select,
  SelectOption
};
//# sourceMappingURL=chunk-MGQ3E3GI.js.map