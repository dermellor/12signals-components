// src/design-system/components/Table.tsx
import * as React from "react";
import { jsx } from "react/jsx-runtime";
function cx(base, className) {
  return className ? `${base} ${className}` : base;
}
function withSticky(base, sticky) {
  if (!sticky) return base;
  const suffix = sticky === "start" ? "Start" : "End";
  return `${base} ds-TableSticky ds-TableSticky${suffix}`;
}
var TableContainer = React.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx("div", { ref, className: cx("ds-TableContainer", className), ...rest });
});
TableContainer.displayName = "TableContainer";
var Table = React.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx("table", { ref, className: cx("ds-Table", className), ...rest });
});
Table.displayName = "Table";
var TableHeader = React.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx("thead", { ref, className: cx("ds-TableHeader", className), ...rest });
});
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx("tbody", { ref, className: cx("ds-TableBody", className), ...rest });
});
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx("tfoot", { ref, className: cx("ds-TableFooter", className), ...rest });
});
TableFooter.displayName = "TableFooter";
var TableRow = React.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx("tr", { ref, className: cx("ds-TableRow", className), ...rest });
});
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef(
  ({ className, sticky, ...rest }, ref) => {
    return /* @__PURE__ */ jsx("th", { ref, className: cx(withSticky("ds-TableHead", sticky), className), ...rest });
  }
);
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef(
  ({ className, sticky, ...rest }, ref) => {
    return /* @__PURE__ */ jsx("td", { ref, className: cx(withSticky("ds-TableCell", sticky), className), ...rest });
  }
);
TableCell.displayName = "TableCell";
var TableCaption = React.forwardRef(({ className, ...rest }, ref) => {
  return /* @__PURE__ */ jsx("caption", { ref, className: cx("ds-TableCaption", className), ...rest });
});
TableCaption.displayName = "TableCaption";

export {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
};
//# sourceMappingURL=chunk-OJ7Y6XSL.js.map