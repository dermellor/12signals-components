import * as React from "react";
import {
  ResponsiveContainer,
  PieChart as RCPieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import type { TooltipProps } from "recharts";

export type PieChartSliceVariant =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "secondary"
  | "neutral";

export type PieChartSlice = {
  id: string;
  label: string;
  value: number;
  detail?: string;
  variant?: PieChartSliceVariant;
};

export type PieChartCenterLabel = {
  value: string;
  description?: string;
};

type ChartTooltipPayload = {
  id: string;
  label: string;
  value: number;
  variant: PieChartSliceVariant;
  detail?: string;
};

type PieChartProps = {
  data: PieChartSlice[];
  ariaLabel: string;
  valueFormatter?: (value: number) => string;
  centerLabel?: PieChartCenterLabel;
};

const VARIANT_CYCLE: PieChartSliceVariant[] = [
  "primary",
  "accent",
  "success",
  "warning",
  "secondary",
  "neutral",
];

const VARIANT_COLORS: Record<PieChartSliceVariant, string> = {
  primary: "color-mix(in oklab, var(--color-primary-bg) 75%, transparent)",
  accent: "color-mix(in oklab, var(--color-accent-bg) 75%, transparent)",
  success: "color-mix(in oklab, var(--color-success-bg) 75%, transparent)",
  warning: "color-mix(in oklab, var(--color-warning-bg) 75%, transparent)",
  secondary: "color-mix(in oklab, var(--color-secondary-bg) 75%, transparent)",
  neutral: "color-mix(in oklab, var(--color-border-default) 65%, transparent)",
};

const getVariantColor = (variant: PieChartSliceVariant = "primary") =>
  VARIANT_COLORS[variant] ?? VARIANT_COLORS.primary;

const ChartTooltip = ({
  active,
  payload,
  valueFormatter,
}: TooltipProps<number, string> & {
  valueFormatter: (value: number) => string;
}) => {
  if (!active || !payload?.length) return null;
  const entries: ChartTooltipPayload[] = payload
    .filter((item) => typeof item.value === "number")
    .map((item) => ({
      id: String(item.payload?.id ?? item.dataKey ?? item.name ?? "slice"),
      label: String(item.payload?.label ?? item.name ?? item.dataKey ?? "Slice"),
      value: Number(item.value ?? 0),
      variant: (item.payload?.variant as PieChartSliceVariant) ?? "primary",
      detail: item.payload?.detail as string | undefined,
    }))
    .filter((entry) => entry.value > 0);
  if (entries.length === 0) return null;
  return (
    <div className="ds-PieChartTooltip">
      <div className="ds-PieChartTooltipLabel">{entries[0]?.label}</div>
      {entries[0]?.detail && (
        <div className="ds-PieChartTooltipDetail">{entries[0].detail}</div>
      )}
      <ul className="ds-PieChartTooltipList">
        {entries.map((entry) => (
          <li key={`${entry.id}-${entry.label}`} className="ds-PieChartTooltipItem">
            <span className="ds-PieChartLegendSwatch" data-variant={entry.variant} aria-hidden />
            <span className="ds-PieChartTooltipName">{entry.label}</span>
            <span className="ds-PieChartTooltipValue">{valueFormatter(entry.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

type NormalizedSlice = PieChartSlice & {
  variant: PieChartSliceVariant;
};

const normalizeSlices = (data: PieChartSlice[]): NormalizedSlice[] => {
  return data.map((slice, index) => ({
    ...slice,
    variant: slice.variant ?? VARIANT_CYCLE[index % VARIANT_CYCLE.length],
  }));
};

export function PieChart({
  data,
  ariaLabel,
  valueFormatter = (value) => `${value}`,
  centerLabel,
}: PieChartProps) {
  const slices = React.useMemo<NormalizedSlice[]>(() => normalizeSlices(data), [data]);
  const total = React.useMemo(
    () => slices.reduce((sum, slice) => sum + Math.max(0, slice.value), 0),
    [slices]
  );

  if (slices.length === 0) {
    return null;
  }

  return (
    <figure className="ds-PieChart" role="group" aria-label={ariaLabel}>
      <div className="ds-PieChartChart">
        <ResponsiveContainer width="100%" height="100%">
          <RCPieChart>
            <Pie
              data={slices}
              dataKey="value"
              nameKey="label"
              innerRadius="55%"
              outerRadius="85%"
              stroke="var(--color-border-default)"
              strokeWidth={1}
              paddingAngle={1}
              isAnimationActive={false}
            >
              {slices.map((slice) => (
                <Cell key={slice.id} fill={getVariantColor(slice.variant)} />
              ))}
            </Pie>
            <Tooltip
              cursor={{ fill: "transparent" }}
              wrapperStyle={{ outline: "none" }}
              content={<ChartTooltip valueFormatter={valueFormatter} />}
            />
          </RCPieChart>
        </ResponsiveContainer>
        {centerLabel && (
          <div className="ds-PieChartCenter">
            <div className="ds-PieChartCenterValue">{centerLabel.value}</div>
            {centerLabel.description && (
              <div className="ds-PieChartCenterDescription">{centerLabel.description}</div>
            )}
          </div>
        )}
        {!centerLabel && (
          <div className="ds-PieChartCenter">
            <div className="ds-PieChartCenterValue">{valueFormatter(total)}</div>
            <div className="ds-PieChartCenterDescription">Total</div>
          </div>
        )}
      </div>
      <ul className="ds-PieChartLegend" role="list">
        {slices.map((slice) => (
          <li key={`legend-${slice.id}`} className="ds-PieChartLegendItem">
            <span className="ds-PieChartLegendSwatch" data-variant={slice.variant} aria-hidden />
            <span className="ds-PieChartLegendLabel">{slice.label}</span>
            <span className="ds-PieChartLegendValue">{valueFormatter(slice.value)}</span>
          </li>
        ))}
      </ul>
      <dl className="ds-PieChartTable">
        {slices.map((slice) => (
          <div key={`table-${slice.id}`} className="ds-PieChartTableRow">
            <dt>{slice.label}</dt>
            <dd>{valueFormatter(slice.value)}</dd>
          </div>
        ))}
        <div className="ds-PieChartTableRow">
          <dt>Total</dt>
          <dd>{valueFormatter(total)}</dd>
        </div>
      </dl>
    </figure>
  );
}
