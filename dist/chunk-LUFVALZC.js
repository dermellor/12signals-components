// src/design-system/components/MatrixTable.tsx
import * as React from "react";
import { createPortal } from "react-dom";
import { Plus } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
function cx(base, className) {
  return className ? `${base} ${className}` : base;
}
var MatrixTableShell = React.forwardRef(
  ({ className, ...rest }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cx("ds-MatrixTableShell", className), ...rest })
);
MatrixTableShell.displayName = "MatrixTableShell";
var MatrixTableToolbar = React.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cx("ds-MatrixTableToolbar", className), ...rest }));
MatrixTableToolbar.displayName = "MatrixTableToolbar";
function MatrixViewControl({
  className,
  label,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { className: cx("ds-MatrixViewControl", className), ...rest, children: [
    /* @__PURE__ */ jsx("span", { className: "ds-MatrixViewControlLabel", children: label }),
    /* @__PURE__ */ jsx("div", { className: "ds-MatrixViewControlInput", children })
  ] });
}
var MatrixTableContainer = React.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cx("ds-MatrixTableContainer", className), ...rest }));
MatrixTableContainer.displayName = "MatrixTableContainer";
var MatrixTable = React.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx("table", { ref, className: cx("ds-MatrixTable", className), ...rest }));
MatrixTable.displayName = "MatrixTable";
var MatrixTableHeader = React.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cx("ds-MatrixTableHeader", className), ...rest }));
MatrixTableHeader.displayName = "MatrixTableHeader";
var MatrixTableBody = React.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cx("ds-MatrixTableBody", className), ...rest }));
MatrixTableBody.displayName = "MatrixTableBody";
var MatrixTableRow = React.forwardRef(({ className, ...rest }, ref) => /* @__PURE__ */ jsx("tr", { ref, className: cx("ds-MatrixTableRow", className), ...rest }));
MatrixTableRow.displayName = "MatrixTableRow";
var MatrixTableHead = React.forwardRef(
  ({ className, columnRole = "dimension", depth, align = "left", separator, ...rest }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cx("ds-MatrixTableHead", className),
      "data-column-role": columnRole,
      "data-depth": depth,
      "data-align": align,
      "data-separator": separator ? "true" : void 0,
      ...rest
    }
  )
);
MatrixTableHead.displayName = "MatrixTableHead";
var MatrixTableCell = React.forwardRef(
  ({
    className,
    columnRole = "dimension",
    depth,
    align = "left",
    separator,
    repeated,
    ...rest
  }, ref) => /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      className: cx("ds-MatrixTableCell", className),
      "data-column-role": columnRole,
      "data-depth": depth,
      "data-align": align,
      "data-separator": separator ? "true" : void 0,
      "data-repeated": repeated ? "true" : void 0,
      ...rest
    }
  )
);
MatrixTableCell.displayName = "MatrixTableCell";
function MatrixColumnLabel({
  className,
  depth,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx("ds-MatrixColumnLabel", className),
      "data-depth": depth,
      ...rest,
      children: /* @__PURE__ */ jsx("span", { className: "ds-MatrixColumnLabelText", children })
    }
  );
}
function MatrixTableAction({
  as,
  icon,
  label,
  className,
  ...rest
}) {
  const Comp = as != null ? as : "button";
  return /* @__PURE__ */ jsxs(Comp, { className: cx("ds-MatrixTableAction", className), ...rest, children: [
    /* @__PURE__ */ jsx("span", { className: "ds-MatrixTableActionIcon", "aria-hidden": true, children: icon }),
    /* @__PURE__ */ jsx("span", { className: "ds-SrOnly", children: label })
  ] });
}
function MatrixDrilldownMenu({
  options,
  onValueChange,
  ariaLabel,
  align = "right",
  disabled,
  className
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  const isDisabled = disabled || options.length === 0;
  React.useEffect(() => {
    if (!open || !rootRef.current) {
      setPos(null);
      return;
    }
    const updatePosition = () => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 6,
        left: align === "right" ? rect.right : rect.left
      });
    };
    updatePosition();
    const onPointerDown = (event) => {
      var _a;
      if (!rootRef.current || !event.target) return;
      const target = event.target;
      if (!rootRef.current.contains(target) && !((_a = contentRef.current) == null ? void 0 : _a.contains(target))) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [align, open]);
  return /* @__PURE__ */ jsxs("div", { ref: rootRef, className: cx("ds-MatrixDrilldownMenu", className), children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "ds-MatrixDrilldownTrigger",
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-label": ariaLabel,
        title: ariaLabel,
        disabled: isDisabled,
        "data-open": open ? "true" : void 0,
        onClick: () => {
          if (!isDisabled) setOpen((prev) => !prev);
        },
        children: /* @__PURE__ */ jsx(Plus, { "aria-hidden": true, focusable: false, className: "ds-MatrixDrilldownPrimaryIcon" })
      }
    ),
    open && !isDisabled && pos ? createPortal(
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: contentRef,
          className: "ds-MatrixDrilldownContent ds-MatrixDrilldownContent--portal",
          role: "menu",
          "data-align": align,
          style: {
            top: pos.top,
            left: pos.left
          },
          children: options.map((option) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "menuitem",
              className: "ds-MatrixDrilldownOption",
              disabled: option.disabled,
              onClick: () => {
                if (option.disabled) return;
                onValueChange == null ? void 0 : onValueChange(option.value);
                setOpen(false);
              },
              children: option.label
            },
            option.value
          ))
        }
      ),
      document.body
    ) : null
  ] });
}
function MatrixDrilldownPath({
  items,
  resetLabel,
  onReset,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { className: cx("ds-MatrixDrilldownPath", className), ...rest, children: [
    /* @__PURE__ */ jsx("button", { type: "button", className: "ds-MatrixDrilldownPathReset", onClick: onReset, children: resetLabel }),
    items.map((item) => /* @__PURE__ */ jsxs("span", { className: "ds-MatrixDrilldownPathItem", children: [
      /* @__PURE__ */ jsx("span", { className: "ds-MatrixDrilldownPathLabel", children: item.label }),
      /* @__PURE__ */ jsx("span", { className: "ds-MatrixDrilldownPathValue", children: item.value })
    ] }, item.id))
  ] });
}

export {
  MatrixTableShell,
  MatrixTableToolbar,
  MatrixViewControl,
  MatrixTableContainer,
  MatrixTable,
  MatrixTableHeader,
  MatrixTableBody,
  MatrixTableRow,
  MatrixTableHead,
  MatrixTableCell,
  MatrixColumnLabel,
  MatrixTableAction,
  MatrixDrilldownMenu,
  MatrixDrilldownPath
};
//# sourceMappingURL=chunk-LUFVALZC.js.map