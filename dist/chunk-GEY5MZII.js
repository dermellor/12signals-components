// src/design-system/components/TabNav.tsx
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function TabNav({ items, value, onValueChange, ariaLabel, className, style }) {
  const listRef = React.useRef(null);
  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const update = () => {
      const nav = el.closest(".ds-TabNav");
      if (!nav) return;
      const triggers = el.querySelectorAll(".ds-TabNavTrigger");
      const tabCount = triggers.length;
      const containerWidth = el.clientWidth;
      triggers.forEach((t) => {
        t.style.minWidth = "";
        t.style.maxWidth = "";
      });
      if (el.scrollWidth > containerWidth && tabCount > 1) {
        const gap = parseFloat(getComputedStyle(el).gap) || 8;
        const visibleFull = Math.min(tabCount - 1, containerWidth < 360 ? 2 : 3);
        const w = Math.floor((containerWidth - visibleFull * gap) / (visibleFull + 0.35));
        triggers.forEach((t) => {
          t.style.minWidth = `${w}px`;
          t.style.maxWidth = `${w}px`;
        });
      }
      requestAnimationFrame(() => {
        nav.toggleAttribute("data-scroll-start", el.scrollLeft > 2);
        nav.toggleAttribute("data-scroll-end", el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsx("nav", { className: ["ds-TabNav", className].filter(Boolean).join(" "), "aria-label": ariaLabel, style, children: /* @__PURE__ */ jsx("ul", { className: "ds-TabNavList", role: "tablist", ref: listRef, children: items.map((item) => {
    const active = item.value === value;
    return /* @__PURE__ */ jsx("li", { className: "ds-TabNavItem", children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "ds-TabNavTrigger",
        role: "tab",
        "aria-selected": active,
        "data-state": active ? "active" : "inactive",
        onClick: () => onValueChange == null ? void 0 : onValueChange(item.value),
        children: [
          /* @__PURE__ */ jsx("span", { className: "ds-TabNavLabel", children: item.label }),
          item.description && /* @__PURE__ */ jsx("span", { className: "ds-TabNavDescription", children: item.description }),
          item.badge && /* @__PURE__ */ jsx("span", { className: "ds-TabNavBadge", children: item.badge })
        ]
      }
    ) }, item.value);
  }) }) });
}

export {
  TabNav
};
//# sourceMappingURL=chunk-GEY5MZII.js.map