// src/design-system/components/Logo.tsx
import { useId } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function LogoSvg({ uid, variant, sizeStyle, className, ...rest }) {
  const cls = ["ds-Logo", className].filter(Boolean).join(" ");
  const shared = { xmlns: "http://www.w3.org/2000/svg", className: cls, "data-variant": variant, role: "img", "aria-label": "12signals", style: sizeStyle, ...rest };
  switch (variant) {
    case "inverted":
      return /* @__PURE__ */ jsxs("svg", { viewBox: "-9 -9 117 117", ...shared, children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("linearGradient", { id: `${uid}-bg`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: `${uid}-inv-arc`, x1: "30%", y1: "100%", x2: "70%", y2: "0%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.8" }),
            /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "white", stopOpacity: "0.55" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "white", stopOpacity: "0.3" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: `${uid}-inv-ring`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.75" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "white", stopOpacity: "0.4" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: `${uid}-inv-main`, gradientUnits: "userSpaceOnUse", x1: "42.6", y1: "53.1", x2: "82.8", y2: "36.4", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "white", stopOpacity: "0.85" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "white", stopOpacity: "0.3" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("rect", { x: "-9", y: "-9", width: "117", height: "117", rx: "26", ry: "26", fill: `url(#${uid}-bg)` }),
        /* @__PURE__ */ jsx("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: `url(#${uid}-inv-arc)`, strokeWidth: "5.5", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: `url(#${uid}-inv-ring)` }),
        /* @__PURE__ */ jsxs("mask", { id: `${uid}-inv-needle`, children: [
          /* @__PURE__ */ jsx("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: "white", strokeWidth: "5.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "7", fill: "white" })
        ] }),
        /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: "100", height: "100", fill: `url(#${uid}-inv-main)`, mask: `url(#${uid}-inv-needle)` }),
        /* @__PURE__ */ jsx("circle", { cx: "67.0", cy: "20.5", r: "2.8", fill: "white", opacity: "0.8" }),
        /* @__PURE__ */ jsx("circle", { cx: "77.8", cy: "30.5", r: "2.8", fill: "white", opacity: "0.7" }),
        /* @__PURE__ */ jsx("circle", { cx: "83.5", cy: "44.1", r: "2.8", fill: "white", opacity: "0.65" }),
        /* @__PURE__ */ jsx("circle", { cx: "82.8", cy: "58.8", r: "2.8", fill: "white", opacity: "0.5" }),
        /* @__PURE__ */ jsx("circle", { cx: "76.0", cy: "71.8", r: "2.8", fill: "white", opacity: "0.4" }),
        /* @__PURE__ */ jsx("circle", { cx: "64.3", cy: "80.8", r: "2.8", fill: "white", opacity: "0.35" })
      ] });
    case "monochrome":
      return /* @__PURE__ */ jsxs("svg", { viewBox: "8 10 82 80", ...shared, children: [
        /* @__PURE__ */ jsx("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: "#1A1C1E", strokeWidth: "6", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: "#1A1C1E" }),
        /* @__PURE__ */ jsx("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: "#1A1C1E", strokeWidth: "6", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "7", fill: "#1A1C1E" }),
        /* @__PURE__ */ jsx("circle", { cx: "67.0", cy: "20.5", r: "3", fill: "#333333" }),
        /* @__PURE__ */ jsx("circle", { cx: "77.8", cy: "30.5", r: "3", fill: "#555555" }),
        /* @__PURE__ */ jsx("circle", { cx: "83.5", cy: "44.1", r: "3", fill: "#777777" }),
        /* @__PURE__ */ jsx("circle", { cx: "82.8", cy: "58.8", r: "3", fill: "#999999" }),
        /* @__PURE__ */ jsx("circle", { cx: "76.0", cy: "71.8", r: "3", fill: "#BBBBBB" }),
        /* @__PURE__ */ jsx("circle", { cx: "64.3", cy: "80.8", r: "3", fill: "#DDDDDD" })
      ] });
    // "default" = V2 Gradient Flow
    default:
      return /* @__PURE__ */ jsxs("svg", { viewBox: "8 10 82 80", ...shared, children: [
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs("linearGradient", { id: `${uid}-main`, gradientUnits: "userSpaceOnUse", x1: "42.6", y1: "53.1", x2: "82.8", y2: "36.4", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: `${uid}-arc`, x1: "30%", y1: "100%", x2: "70%", y2: "0%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#441B67" }),
            /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#7D3BA3" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#E838A2" })
          ] }),
          /* @__PURE__ */ jsxs("linearGradient", { id: `${uid}-ring`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#5C2580" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#C835A5" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("path", { d: "M 56.5 16.6 A 34 34 0 1 0 54.1 83.8", fill: "none", stroke: `url(#${uid}-arc)`, strokeWidth: "6", strokeLinecap: "butt" }),
        /* @__PURE__ */ jsx("path", { d: "M 66.6 35.5 A 22 22 0 1 0 71.9 48.5 L 66.0 51.0 A 16 16 0 1 1 60.6 38.0 Z", fill: `url(#${uid}-ring)` }),
        /* @__PURE__ */ jsx("line", { x1: "50", y1: "50", x2: "82.8", y2: "36.4", stroke: `url(#${uid}-main)`, strokeWidth: "6", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "7", fill: `url(#${uid}-main)` }),
        /* @__PURE__ */ jsx("circle", { cx: "67.0", cy: "20.5", r: "3", fill: "#441B67" }),
        /* @__PURE__ */ jsx("circle", { cx: "77.8", cy: "30.5", r: "3", fill: "#5C2580" }),
        /* @__PURE__ */ jsx("circle", { cx: "83.5", cy: "44.1", r: "3", fill: "#7D3BA3" }),
        /* @__PURE__ */ jsx("circle", { cx: "82.8", cy: "58.8", r: "3", fill: "#A832A8" }),
        /* @__PURE__ */ jsx("circle", { cx: "76.0", cy: "71.8", r: "3", fill: "#C835A5" }),
        /* @__PURE__ */ jsx("circle", { cx: "64.3", cy: "80.8", r: "3", fill: "#E838A2" })
      ] });
  }
}
function Logo({ variant = "default", size = 36, sprite, className, style, ...rest }) {
  const reactId = useId();
  const uid = reactId.replace(/:/g, "");
  const sizeStyle = { width: size, height: size, ...style };
  const cls = ["ds-Logo", className].filter(Boolean).join(" ");
  if (sprite) {
    return /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: cls,
        "data-variant": variant,
        role: "img",
        "aria-label": "12signals",
        style: sizeStyle,
        ...rest,
        children: /* @__PURE__ */ jsx("use", { href: `${sprite}#logo-${variant}`, width: "100%", height: "100%" })
      }
    );
  }
  return /* @__PURE__ */ jsx(LogoSvg, { uid, variant, sizeStyle, className, ...rest });
}
var LOGO_VARIANTS = [
  { value: "default", label: "Gradient Flow" },
  { value: "inverted", label: "Inverted" },
  { value: "monochrome", label: "Monochrome" }
];

export {
  Logo,
  LOGO_VARIANTS
};
//# sourceMappingURL=chunk-R446RLAQ.js.map