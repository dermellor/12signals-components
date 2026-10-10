import {
  Heading
} from "./chunk-LPOOXJF6.js";

// src/design-system/components/BarChart.tsx
import * as React from "react";
import {
  ResponsiveContainer,
  BarChart as RCBarChart,
  Bar,
  XAxis,
  YAxis,
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
var isGroupedPoint = (point) => "groups" in point;
var ChartTooltip = ({
  active,
  payload,
  label,
  groups,
  valueFormatter,
  tooltipFilter
}) => {
  var _a, _b;
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  if (tooltipFilter && !tooltipFilter(String(label))) return null;
  const detail = (_b = (_a = payload[0]) == null ? void 0 : _a.payload) == null ? void 0 : _b.detail;
  const entries = payload.filter((item) => typeof item.value === "number" && item.value > 0).map((item) => {
    var _a2, _b2;
    const meta = groups.find((group) => group.id === item.dataKey);
    return {
      id: item.dataKey,
      label: (_a2 = meta == null ? void 0 : meta.label) != null ? _a2 : String(item.dataKey),
      value: Number(item.value),
      variant: (_b2 = meta == null ? void 0 : meta.variant) != null ? _b2 : "primary"
    };
  });
  if (entries.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "ds-BarChartTooltip", children: [
    /* @__PURE__ */ jsx("div", { className: "ds-BarChartTooltipLabel", children: label }),
    detail && /* @__PURE__ */ jsx("div", { className: "ds-BarChartTooltipDetail", children: detail }),
    /* @__PURE__ */ jsx("ul", { className: "ds-BarChartTooltipList", children: entries.map((entry) => /* @__PURE__ */ jsxs("li", { className: "ds-BarChartTooltipItem", children: [
      /* @__PURE__ */ jsx("span", { className: "ds-BarChartLegendSwatch", "data-variant": entry.variant, "aria-hidden": true }),
      /* @__PURE__ */ jsx("span", { className: "ds-BarChartTooltipName", children: entry.label }),
      /* @__PURE__ */ jsx("span", { className: "ds-BarChartTooltipValue", children: valueFormatter(entry.value) })
    ] }, `${entry.id}-${entry.label}`)) })
  ] });
};
var FilteredCursor = (props) => {
  var _a;
  const { tooltipFilter, x, y, width, height, payload } = props;
  const label = (_a = payload == null ? void 0 : payload[0]) == null ? void 0 : _a.payload;
  const labelStr = label == null ? void 0 : label.label;
  if (!labelStr || !tooltipFilter(labelStr)) return null;
  return /* @__PURE__ */ jsx(
    "rect",
    {
      x,
      y,
      width,
      height,
      fill: "color-mix(in oklab, var(--color-border-default) 25%, transparent)"
    }
  );
};
function BarChart({
  data,
  ariaLabel,
  xAxisLabel,
  yAxisLabel,
  valueFormatter = (value) => `${value}`,
  groups: providedGroups,
  tooltipFilter
}) {
  const hasGroupedData = data.length > 0 && data.every(isGroupedPoint);
  const derivedGroupOrder = React.useMemo(() => {
    if (!hasGroupedData) return [];
    const seen = /* @__PURE__ */ new Set();
    const order = [];
    for (const point of data) {
      if (!isGroupedPoint(point)) continue;
      for (const group of point.groups) {
        if (!seen.has(group.id)) {
          seen.add(group.id);
          order.push(group.id);
        }
      }
    }
    return order;
  }, [data, hasGroupedData, providedGroups]);
  const resolvedGroups = React.useMemo(() => {
    var _a;
    if (hasGroupedData && derivedGroupOrder.length === 0) return [];
    const metaById = new Map(providedGroups == null ? void 0 : providedGroups.map((group) => [group.id, group]));
    if (hasGroupedData) {
      return derivedGroupOrder.map((id, index) => {
        var _a2, _b, _c;
        const meta = metaById.get(id);
        const variant = (_a2 = meta == null ? void 0 : meta.variant) != null ? _a2 : VARIANT_CYCLE[index % VARIANT_CYCLE.length];
        return {
          id,
          label: (_b = meta == null ? void 0 : meta.label) != null ? _b : id,
          variant,
          tintIndex: (_c = meta == null ? void 0 : meta.tintIndex) != null ? _c : 0
        };
      });
    }
    const fallback = (_a = providedGroups == null ? void 0 : providedGroups[0]) != null ? _a : {
      id: "default",
      label: "Value",
      variant: "primary",
      tintIndex: 0
    };
    return [fallback];
  }, [derivedGroupOrder, hasGroupedData, providedGroups]);
  const normalizedData = React.useMemo(() => {
    if (data.length === 0) return [];
    if (!hasGroupedData) {
      return data.map((point) => {
        var _a, _b, _c, _d, _e, _f;
        return {
          label: point.label,
          detail: "detail" in point ? point.detail : void 0,
          bars: [
            {
              id: (_b = (_a = resolvedGroups[0]) == null ? void 0 : _a.id) != null ? _b : "default",
              value: "value" in point ? point.value : 0,
              detail: "detail" in point ? point.detail : void 0,
              variant: (_d = (_c = resolvedGroups[0]) == null ? void 0 : _c.variant) != null ? _d : "primary",
              tintIndex: (_f = (_e = resolvedGroups[0]) == null ? void 0 : _e.tintIndex) != null ? _f : 0
            }
          ]
        };
      });
    }
    const groupedData = data.filter(isGroupedPoint);
    return groupedData.map((point) => ({
      label: point.label,
      detail: point.detail,
      bars: resolvedGroups.map((group) => {
        var _a, _b;
        const match = point.groups.find((item) => item.id === group.id);
        return {
          id: group.id,
          value: (_a = match == null ? void 0 : match.value) != null ? _a : 0,
          detail: (_b = match == null ? void 0 : match.detail) != null ? _b : point.detail,
          variant: group.variant
        };
      })
    }));
  }, [data, resolvedGroups, hasGroupedData]);
  const chartData = React.useMemo(
    () => normalizedData.map((point) => {
      const entry = {
        label: point.label,
        detail: point.detail
      };
      point.bars.forEach((bar) => {
        entry[bar.id] = bar.value;
      });
      return entry;
    }),
    [normalizedData]
  );
  const axisTickStyle = {
    fill: "hsl(var(--muted-foreground))",
    fontSize: 12
  };
  return /* @__PURE__ */ jsxs("figure", { className: "ds-BarChart", role: "group", "aria-label": ariaLabel, children: [
    /* @__PURE__ */ jsxs("div", { className: "ds-BarChartGrid", children: [
      yAxisLabel && /* @__PURE__ */ jsx(Heading, { level: 3, "aria-hidden": true, children: yAxisLabel }),
      /* @__PURE__ */ jsx("div", { className: "ds-BarChartChart", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(RCBarChart, { data: chartData, margin: { top: 24, right: 16, left: 0, bottom: 0 }, children: [
        /* @__PURE__ */ jsx(
          XAxis,
          {
            dataKey: "label",
            tick: axisTickStyle,
            tickLine: { stroke: "var(--color-border-default)" },
            axisLine: { stroke: "var(--color-border-default)" },
            interval: 0
          }
        ),
        /* @__PURE__ */ jsx(
          YAxis,
          {
            tick: axisTickStyle,
            tickLine: { stroke: "var(--color-border-default)" },
            axisLine: { stroke: "var(--color-border-default)" },
            allowDecimals: false,
            width: 44
          }
        ),
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            cursor: tooltipFilter ? /* @__PURE__ */ jsx(FilteredCursor, { tooltipFilter }) : { fill: "color-mix(in oklab, var(--color-border-default) 25%, transparent)" },
            content: /* @__PURE__ */ jsx(ChartTooltip, { groups: resolvedGroups, valueFormatter, tooltipFilter })
          }
        ),
        resolvedGroups.map((group, index) => {
          var _a;
          return /* @__PURE__ */ jsx(
            Bar,
            {
              dataKey: group.id,
              stackId: "jobs",
              fill: getVariantColor((_a = group.variant) != null ? _a : "primary"),
              isAnimationActive: false,
              radius: index === resolvedGroups.length - 1 ? [8, 8, 0, 0] : 0,
              maxBarSize: 48
            },
            group.id
          );
        })
      ] }) }) }),
      xAxisLabel && /* @__PURE__ */ jsx("div", { className: "ds-BarChartAxisCaption", "aria-hidden": true, children: xAxisLabel })
    ] }),
    /* @__PURE__ */ jsx("dl", { className: "ds-BarChartTable", children: normalizedData.map(
      (point, pointIndex) => point.bars.map((bar, barIndex) => {
        var _a;
        const groupMeta = resolvedGroups.find((group) => group.id === bar.id);
        return /* @__PURE__ */ jsxs("div", { className: "ds-BarChartTableRow", children: [
          /* @__PURE__ */ jsx("dt", { children: `${point.label} \u2013 ${(_a = groupMeta == null ? void 0 : groupMeta.label) != null ? _a : bar.id}` }),
          /* @__PURE__ */ jsx("dd", { children: valueFormatter(bar.value) })
        ] }, `table-${point.label}-${bar.id}-${pointIndex}-${barIndex}`);
      })
    ) })
  ] });
}

export {
  BarChart
};
//# sourceMappingURL=chunk-CNDC6HIM.js.map