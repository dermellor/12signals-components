import {
  DateTimeInput
} from "./chunk-2J6PNNAA.js";
import {
  Dialog
} from "./chunk-QT6IWRUP.js";
import {
  Button
} from "./chunk-LRWW7BLR.js";

// src/design-system/components/DateTimeModalInput.tsx
import * as React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function DateTimeModalInput({
  label,
  value,
  onSave,
  displayValue,
  emptyLabel = "Datum setzen",
  size = "md",
  disabled,
  saving,
  saveLabel = "Speichern",
  cancelLabel = "Abbrechen",
  triggerProps
}) {
  const isDisabled = disabled || saving;
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const draftRef = React.useRef(value);
  const inputRef = React.useRef(null);
  const inputId = React.useId();
  React.useEffect(() => {
    if (open) {
      setDraft(value);
      draftRef.current = value;
    }
  }, [open, value]);
  const handleOpen = () => {
    if (isDisabled) return;
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    var _a, _b;
    const liveValue = (_b = (_a = inputRef.current) == null ? void 0 : _a.value) != null ? _b : draftRef.current;
    onSave(liveValue);
    setOpen(false);
  };
  const triggerLabel = (displayValue && displayValue.trim().length > 0 ? displayValue : "") || emptyLabel;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        size,
        variant: "ghost",
        onClick: handleOpen,
        "aria-label": label,
        disabled: isDisabled,
        ...triggerProps,
        children: triggerLabel
      }
    ),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        open,
        onClose: handleClose,
        title: label,
        footer: /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "var(--space-sm)", justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: handleClose, disabled: saving, children: cancelLabel }),
          /* @__PURE__ */ jsx(Button, { onClick: handleSave, disabled: saving, children: saveLabel })
        ] }),
        children: /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-xs)" }, children: /* @__PURE__ */ jsx(
          DateTimeInput,
          {
            id: inputId,
            size,
            value: draft,
            ref: inputRef,
            onChange: (event) => {
              const nextValue = event.currentTarget.value;
              draftRef.current = nextValue;
              setDraft(nextValue);
            },
            onInput: (event) => {
              const nextValue = event.currentTarget.value;
              draftRef.current = nextValue;
              setDraft(nextValue);
            },
            disabled: disabled || saving,
            "aria-label": label,
            autoFocus: true
          }
        ) })
      }
    )
  ] });
}

export {
  DateTimeModalInput
};
//# sourceMappingURL=chunk-J4G4KOTX.js.map