// src/design-system/components/Card.tsx
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var CardNestingContext = React.createContext(false);
function CardRoot({ children, variant = "default", hover = "none", className, ...rest }) {
  const isNested = React.useContext(CardNestingContext);
  const ref = React.useRef(null);
  if (isNested) {
    throw new Error(
      "[ds-Card] Nested Card detected. Cards must not be placed inside other Cards \u2014 use a plain container (div, section) or a different visual treatment instead."
    );
  }
  React.useEffect(() => {
    const el = ref.current;
    if (!el || hover !== "glow") return;
    if (!window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hover]);
  const cn = ["ds-Card", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx(CardNestingContext.Provider, { value: true, children: /* @__PURE__ */ jsx("div", { ref, className: cn, "data-variant": variant, "data-hover": hover, ...rest, children }) });
}
function CardHeader({ children, className, variant = "default", ...rest }) {
  const cn = ["ds-CardHeader", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: cn, "data-variant": variant, ...rest, children });
}
function CardContent({ children, className, ...rest }) {
  const cn = ["ds-CardContent", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx("div", { className: cn, ...rest, children });
}
function CardTitle({
  as,
  children,
  className,
  ...rest
}) {
  const Comp = as || "h3";
  const cn = ["ds-CardTitle", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx(Comp, { className: cn, ...rest, children });
}
var Card = Object.assign(CardRoot, { Header: CardHeader, Content: CardContent, Title: CardTitle });

export {
  Card
};
//# sourceMappingURL=chunk-OO3JNWQC.js.map