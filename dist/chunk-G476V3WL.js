import {
  Text
} from "./chunk-MTQGJRER.js";

// src/design-system/components/EntityListRow.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function getGridTemplate(columns) {
  const columnTemplate = columns.length ? columns.map((column) => {
    var _a;
    return (_a = column.width) != null ? _a : "minmax(7rem, 1fr)";
  }).join(" ") : "minmax(0, 1fr)";
  return `${columnTemplate} 2rem`;
}
function getGridStyle(columns, style) {
  return {
    "--ds-EntityList-grid-template": getGridTemplate(columns),
    ...style
  };
}
function EntityListHeader({
  columns,
  sortKey,
  sortDirection = "asc",
  onSortChange,
  className,
  style,
  ...rest
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "row",
      className: ["ds-EntityListHeader", className].filter(Boolean).join(" "),
      style: getGridStyle(columns, style),
      ...rest,
      children: [
        columns.map((column) => {
          var _a, _b;
          const isActive = sortKey === column.key;
          const ariaSort = isActive ? sortDirection === "asc" ? "ascending" : "descending" : "none";
          return /* @__PURE__ */ jsx(
            "div",
            {
              role: "columnheader",
              "aria-sort": ariaSort,
              className: "ds-EntityListHeader-cell",
              "data-align": (_a = column.align) != null ? _a : "start",
              style: { "--ds-EntityListHeader-cell-offset": (_b = column.headerOffset) != null ? _b : "0px" },
              children: column.sortable && onSortChange ? /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: "ds-EntityListHeader-sortButton",
                  "data-active": isActive ? "true" : "false",
                  onClick: () => onSortChange(column.key),
                  children: [
                    /* @__PURE__ */ jsx("span", { children: column.label }),
                    isActive && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "ds-EntityListHeader-sortIcon", children: sortDirection === "asc" ? "\u2191" : "\u2193" })
                  ]
                }
              ) : /* @__PURE__ */ jsx(Text, { as: "span", size: "sm", tone: "muted", weight: "medium", children: column.label })
            },
            column.key
          );
        }),
        /* @__PURE__ */ jsx("div", { "aria-hidden": "true", className: "ds-EntityListHeader-trailing" })
      ]
    }
  );
}
function EntityListRow({
  columns,
  icon,
  title,
  detail,
  cells = [],
  trailingIcon,
  ariaLabel,
  href,
  renderLink,
  className,
  style,
  ...rest
}) {
  var _a, _b;
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "ds-EntityListRow-cell ds-EntityListRow-primary", "data-align": (_b = (_a = columns[0]) == null ? void 0 : _a.align) != null ? _b : "start", children: [
      icon && /* @__PURE__ */ jsx("div", { className: "ds-EntityListRow-icon", children: icon }),
      /* @__PURE__ */ jsxs("div", { className: "ds-EntityListRow-mainContent", children: [
        /* @__PURE__ */ jsx(Text, { as: "span", size: "md", weight: "semibold", className: "ds-EntityListRow-title", children: title }),
        detail && /* @__PURE__ */ jsx("div", { className: "ds-EntityListRow-detail", children: detail })
      ] })
    ] }),
    columns.slice(1).map((column, index) => {
      var _a2, _b2;
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: "ds-EntityListRow-cell",
          "data-align": (_a2 = column.align) != null ? _a2 : "start",
          "data-secondary": "true",
          children: /* @__PURE__ */ jsx("div", { className: "ds-EntityListRow-cellContent", children: (_b2 = cells[index]) != null ? _b2 : null })
        },
        column.key
      );
    }),
    /* @__PURE__ */ jsx("div", { className: "ds-EntityListRow-trailing", "aria-hidden": "true", children: trailingIcon })
  ] });
  const main = /* @__PURE__ */ jsx(Fragment, { children: href ? /* @__PURE__ */ jsx("a", { href, className: "ds-EntityListRow-link", "aria-label": ariaLabel, children: content }) : renderLink ? renderLink(content, "ds-EntityListRow-link") : /* @__PURE__ */ jsx("div", { className: "ds-EntityListRow-static", children: content }) });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      className: ["ds-EntityListRow group/row", className].filter(Boolean).join(" "),
      "data-clickable": href || renderLink ? "true" : "false",
      style: getGridStyle(columns, style),
      children: main
    }
  );
}

export {
  EntityListHeader,
  EntityListRow
};
//# sourceMappingURL=chunk-G476V3WL.js.map