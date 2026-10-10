// src/design-system/components/TagField.tsx
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function Tag({ children, onRemove, removeAriaLabel }) {
  return /* @__PURE__ */ jsxs("span", { className: "ds-Tag", children: [
    /* @__PURE__ */ jsx("span", { className: "ds-TagLabel", children }),
    onRemove && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "ds-TagRemove",
        onClick: onRemove,
        "aria-label": removeAriaLabel != null ? removeAriaLabel : `Remove ${String(children)}`,
        children: "\xD7"
      }
    )
  ] });
}
function TagList({ tags, onRemove, emptyLabel }) {
  if (tags.length === 0 && emptyLabel) {
    return /* @__PURE__ */ jsx("div", { className: "ds-TagListEmpty", children: emptyLabel });
  }
  return /* @__PURE__ */ jsx("div", { className: "ds-TagList", children: tags.map((tag, index) => /* @__PURE__ */ jsx(
    Tag,
    {
      onRemove: onRemove ? () => onRemove(tag, index) : void 0,
      children: tag
    },
    `${tag}-${index}`
  )) });
}
function TagField({
  label,
  values,
  onChange,
  description,
  error,
  placeholder,
  disabled,
  addOnBlur = true,
  ariaLabel
}) {
  const inputId = React.useId();
  const descriptionId = description ? `${inputId}-desc` : void 0;
  const errorId = error ? `${inputId}-err` : void 0;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || void 0;
  const [inputValue, setInputValue] = React.useState("");
  const addTag = React.useCallback(
    (raw) => {
      if (disabled) return;
      const next = raw.trim();
      if (!next) return;
      if (values.includes(next)) {
        setInputValue("");
        return;
      }
      onChange([...values, next]);
      setInputValue("");
    },
    [disabled, onChange, values]
  );
  const removeTag = React.useCallback(
    (index) => {
      if (disabled) return;
      const next = values.filter((_, idx) => idx !== index);
      onChange(next);
    },
    [disabled, onChange, values]
  );
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "," || event.key === "Tab") {
      if (event.key !== "Tab") {
        event.preventDefault();
      }
      addTag(inputValue);
      return;
    }
    if (event.key === "Backspace" && !inputValue && values.length > 0) {
      event.preventDefault();
      removeTag(values.length - 1);
    }
  };
  const handleBlur = () => {
    if (addOnBlur) {
      addTag(inputValue);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "ds-TagField", children: [
    /* @__PURE__ */ jsx("label", { className: "ds-TagFieldLabel", htmlFor: inputId, children: label }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "ds-TagFieldControl",
        "data-disabled": disabled ? "true" : "false",
        "data-invalid": error ? "true" : "false",
        children: [
          /* @__PURE__ */ jsx(
            TagList,
            {
              tags: values,
              onRemove: disabled ? void 0 : (_, index) => removeTag(index)
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: inputId,
              "aria-label": ariaLabel != null ? ariaLabel : label,
              className: "ds-TagInput",
              value: inputValue,
              onChange: (event) => setInputValue(event.currentTarget.value),
              onKeyDown: handleKeyDown,
              onBlur: handleBlur,
              placeholder: values.length === 0 ? placeholder : void 0,
              "aria-invalid": error ? "true" : void 0,
              "aria-describedby": describedBy,
              disabled
            }
          )
        ]
      }
    ),
    description && /* @__PURE__ */ jsx("div", { id: descriptionId, className: "ds-TagFieldDescription", children: description }),
    error && /* @__PURE__ */ jsx("div", { id: errorId, className: "ds-TagFieldError", role: "alert", children: error })
  ] });
}

export {
  Tag,
  TagList,
  TagField
};
//# sourceMappingURL=chunk-4PPFBBHH.js.map