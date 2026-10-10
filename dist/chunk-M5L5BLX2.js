// src/design-system/components/PieChart.tsx
import * as React from "react";
import {
  ResponsiveContainer,
  PieChart as RCPieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";
import { jsx, jsxs } from "react/jsx-runtime";
var VARIANT_CYCLE = [
  "primary",
  "accent",
  "success",
  "warning",
  "secondary",
  "neutral"
];
var VARIANT_COLORS = {
  primary: "color-mix(in oklab, var(--color-primary-bg) 75%, transparent)",
  accent: "color-mix(in oklab, var(--color-accent-bg) 75%, transparent)",
  success: "color-mix(in oklab, var(--color-success-bg) 75%, transparent)",
  warning: "color-mix(in oklab, var(--color-warning-bg) 75%, transparent)",
  secondary: "color-mix(in oklab, var(--color-secondary-bg) 75%, transparent)",
  neutral: "color-mix(in oklab, var(--color-border-default) 90%, transparent)"
};
var getVariantColor = (variant = "primary") => {
  var _a;
  return (_a = VARIANT_COLORS[variant]) != null ? _a : VARIANT_COLORS.primary;
};
var ChartTooltip = ({
  active,
  payload,
  valueFormatter
}) => {
  var _a, _b;
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const entries = payload.filter((item) => typeof item.value === "number").map((item) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    return {
      id: String((_d = (_c = (_b2 = (_a2 = item.payload) == null ? void 0 : _a2.id) != null ? _b2 : item.dataKey) != null ? _c : item.name) != null ? _d : "slice"),
      label: String((_h = (_g = (_f = (_e = item.payload) == null ? void 0 : _e.label) != null ? _f : item.name) != null ? _g : item.dataKey) != null ? _h : "Slice"),
      value: Number((_i = item.value) != null ? _i : 0),
      variant: (_k = (_j = item.payload) == null ? void 0 : _j.variant) != null ? _k : "primary",
      detail: (_l = item.payload) == null ? void 0 : _l.detail
    };
  }).filter((entry) => entry.value > 0);
  if (entries.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "ds-PieChartTooltip", children: [
    /* @__PURE__ */ jsx("div", { className: "ds-PieChartTooltipLabel", children: (_a = entries[0]) == null ? void 0 : _a.label }),
    ((_b = entries[0]) == null ? void 0 : _b.detail) && /* @__PURE__ */ jsx("div", { className: "ds-PieChartTooltipDetail", children: entries[0].detail }),
    /* @__PURE__ */ jsx("ul", { className: "ds-PieChartTooltipList", children: entries.map((entry) => /* @__PURE__ */ jsxs("li", { className: "ds-PieChartTooltipItem", children: [
      /* @__PURE__ */ jsx("span", { className: "ds-PieChartLegendSwatch", "data-variant": entry.variant, "aria-hidden": true }),
      /* @__PURE__ */ jsx("span", { className: "ds-PieChartTooltipName", children: entry.label }),
      /* @__PURE__ */ jsx("span", { className: "ds-PieChartTooltipValue", children: valueFormatter(entry.value) })
    ] }, `${entry.id}-${entry.label}`)) })
  ] });
};
var normalizeSlices = (data) => {
  return data.map((slice, index) => {
    var _a;
    return {
      ...slice,
      variant: (_a = slice.variant) != null ? _a : VARIANT_CYCLE[index % VARIANT_CYCLE.length]
    };
  });
};
function PieChart({
  data,
  ariaLabel,
  valueFormatter = (value) => `${value}`,
  centerLabel,
  showLegend = true,
  variant = "default"
}) {
  const slices = React.useMemo(() => normalizeSlices(data), [data]);
  const total = React.useMemo(
    () => slices.reduce((sum, slice) => sum + Math.max(0, slice.value), 0),
    [slices]
  );
  if (slices.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("figure", { className: "ds-PieChart", role: "group", "aria-label": ariaLabel, children: [
    /* @__PURE__ */ jsxs("div", { className: variant === "plain" ? "ds-PieChartChart ds-PieChartChart--plain" : "ds-PieChartChart", children: [
      /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(RCPieChart, { children: [
        /* @__PURE__ */ jsx(
          Pie,
          {
            data: slices,
            dataKey: "value",
            nameKey: "label",
            innerRadius: "55%",
            outerRadius: "85%",
            stroke: "var(--color-border-default)",
            strokeWidth: 1,
            paddingAngle: 1,
            isAnimationActive: false,
            children: slices.map((slice) => /* @__PURE__ */ jsx(Cell, { fill: getVariantColor(slice.variant) }, slice.id))
          }
        ),
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            cursor: { fill: "transparent" },
            wrapperStyle: { outline: "none" },
            content: /* @__PURE__ */ jsx(ChartTooltip, { valueFormatter })
          }
        )
      ] }) }),
      centerLabel && /* @__PURE__ */ jsxs("div", { className: "ds-PieChartCenter", children: [
        /* @__PURE__ */ jsx("div", { className: "ds-PieChartCenterValue", children: centerLabel.value }),
        centerLabel.description && /* @__PURE__ */ jsx("div", { className: "ds-PieChartCenterDescription", children: centerLabel.description })
      ] }),
      !centerLabel && /* @__PURE__ */ jsxs("div", { className: "ds-PieChartCenter", children: [
        /* @__PURE__ */ jsx("div", { className: "ds-PieChartCenterValue", children: valueFormatter(total) }),
        /* @__PURE__ */ jsx("div", { className: "ds-PieChartCenterDescription", children: "Total" })
      ] })
    ] }),
    showLegend && /* @__PURE__ */ jsx("ul", { className: "ds-PieChartLegend", role: "list", children: slices.map((slice) => /* @__PURE__ */ jsxs("li", { className: "ds-PieChartLegendItem", children: [
      /* @__PURE__ */ jsx("span", { className: "ds-PieChartLegendSwatch", "data-variant": slice.variant, "aria-hidden": true }),
      /* @__PURE__ */ jsx("span", { className: "ds-PieChartLegendLabel", children: slice.label }),
      /* @__PURE__ */ jsx("span", { className: "ds-PieChartLegendValue", children: valueFormatter(slice.value) })
    ] }, `legend-${slice.id}`)) }),
    /* @__PURE__ */ jsxs("dl", { className: "ds-PieChartTable", children: [
      slices.map((slice) => /* @__PURE__ */ jsxs("div", { className: "ds-PieChartTableRow", children: [
        /* @__PURE__ */ jsx("dt", { children: slice.label }),
        /* @__PURE__ */ jsx("dd", { children: valueFormatter(slice.value) })
      ] }, `table-${slice.id}`)),
      /* @__PURE__ */ jsxs("div", { className: "ds-PieChartTableRow", children: [
        /* @__PURE__ */ jsx("dt", { children: "Total" }),
        /* @__PURE__ */ jsx("dd", { children: valueFormatter(total) })
      ] })
    ] })
  ] });
}

export {
  PieChart
};
//# sourceMappingURL=chunk-M5L5BLX2.js.map