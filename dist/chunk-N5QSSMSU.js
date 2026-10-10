// src/design-system/components/Breadcrumb.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Breadcrumb({ items, renderLink, className, style }) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: ["ds-Breadcrumb", className].filter(Boolean).join(" "),
      style,
      children: /* @__PURE__ */ jsx("ol", { className: "ds-BreadcrumbList", children: items.map((item, i) => {
        const isLast = i === items.length - 1;
        return /* @__PURE__ */ jsxs("li", { className: "ds-BreadcrumbItem", children: [
          item.href && !isLast ? renderLink ? /* @__PURE__ */ jsx("span", { className: "ds-BreadcrumbLink", children: renderLink(item.href, item.label) }) : /* @__PURE__ */ jsx("a", { className: "ds-BreadcrumbLink", href: item.href, children: item.label }) : /* @__PURE__ */ jsx("span", { className: "ds-BreadcrumbCurrent", "aria-current": isLast ? "page" : void 0, children: item.label }),
          !isLast && /* @__PURE__ */ jsx("span", { className: "ds-BreadcrumbSeparator", "aria-hidden": "true", children: "/" })
        ] }, i);
      }) })
    }
  );
}

export {
  Breadcrumb
};
//# sourceMappingURL=chunk-N5QSSMSU.js.map