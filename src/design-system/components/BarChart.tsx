import * as React from "react";
import {
  ResponsiveContainer,
  BarChart as RCBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { TooltipProps } from "recharts";

export type BarChartGroupVariant =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "secondary"
  | "neutral";

export type BarChartGroupMeta = {
  id: string;
  label: string;
  variant?: BarChartGroupVariant;
  tintIndex?: number;
};

export type BarChartDataPoint =
  | {
      label: string;
      value: number;
      detail?: string;
    }
  | {
      label: string;
      detail?: string;
      groups: { id: string; value: number; detail?: string }[];
    };

type NormalizedPoint = {
  label: string;
  detail?: string;
  bars: {
    id: string;
    value: number;
    detail?: string;
    variant?: BarChartGroupVariant;
    tintIndex?: number;
  }[];
};

type ChartDataPoint = {
  label: string;
  detail?: string;
} & Record<string, string | number | undefined>;

type BarChartProps = {
  data: BarChartDataPoint[];
  ariaLabel: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  valueFormatter?: (value: number) => string;
  groups?: BarChartGroupMeta[];
};

const VARIANT_CYCLE: BarChartGroupVariant[] = [
  "primary",
  "accent",
  "success",
  "warning",
  "secondary",
  "neutral",
];

const VARIANT_COLORS: Record<BarChartGroupVariant, string> = {
  primary: "color-mix(in oklab, var(--color-primary-bg) 75%, transparent)",
  accent: "color-mix(in oklab, var(--color-accent-bg) 75%, transparent)",
  success: "color-mix(in oklab, var(--color-success-bg) 75%, transparent)",
  warning: "color-mix(in oklab, var(--color-warning-bg) 75%, transparent)",
  secondary: "color-mix(in oklab, var(--color-secondary-bg) 75%, transparent)",
  neutral: "color-mix(in oklab, var(--color-border-default) 65%, transparent)",
};

const getVariantColor = (variant: BarChartGroupVariant = "primary") =>
  VARIANT_COLORS[variant] ?? VARIANT_COLORS.primary;

const isGroupedPoint = (
  point: BarChartDataPoint
): point is Extract<BarChartDataPoint, { groups: unknown }> => "groups" in point;

const ChartTooltip = ({
  active,
  payload,
  label,
  groups,
  valueFormatter,
}: TooltipProps<number, string> & {
  groups: BarChartGroupMeta[];
  valueFormatter: (value: number) => string;
}) => {
  if (!active || !payload?.length) return null;
  const detail = payload[0]?.payload?.detail as string | undefined;
  const entries = payload
    .filter((item) => typeof item.value === "number" && (item.value as number) > 0)
    .map((item) => {
      const meta = groups.find((group) => group.id === item.dataKey);
      return {
        id: item.dataKey,
        label: meta?.label ?? String(item.dataKey),
        value: Number(item.value),
        variant: meta?.variant ?? "primary",
      };
    });

  if (entries.length === 0) return null;

  return (
    <div className="ds-BarChartTooltip">
      <div className="ds-BarChartTooltipLabel">{label}</div>
      {detail && <div className="ds-BarChartTooltipDetail">{detail}</div>}
      <ul className="ds-BarChartTooltipList">
        {entries.map((entry) => (
          <li key={`${entry.id}-${entry.label}`} className="ds-BarChartTooltipItem">
            <span className="ds-BarChartLegendSwatch" data-variant={entry.variant} aria-hidden />
            <span className="ds-BarChartTooltipName">{entry.label}</span>
            <span className="ds-BarChartTooltipValue">{valueFormatter(entry.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function BarChart({
  data,
  ariaLabel,
  xAxisLabel,
  yAxisLabel,
  valueFormatter = (value) => `${value}`,
  groups: providedGroups,
}: BarChartProps) {
  const hasGroupedData = data.length > 0 && data.every(isGroupedPoint);

  const derivedGroupOrder = React.useMemo(() => {
    if (!hasGroupedData) return [];
    const seen = new Set<string>();
    const order: string[] = [];
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

  const resolvedGroups = React.useMemo<BarChartGroupMeta[]>(() => {
    if (hasGroupedData && derivedGroupOrder.length === 0) return [];
    const metaById = new Map(providedGroups?.map((group) => [group.id, group]));

    if (hasGroupedData) {
      return derivedGroupOrder.map((id, index) => {
        const meta = metaById.get(id);
        const variant = meta?.variant ?? VARIANT_CYCLE[index % VARIANT_CYCLE.length];
        return {
          id,
          label: meta?.label ?? id,
          variant,
          tintIndex: meta?.tintIndex ?? 0,
        };
      });
    }

    const fallback = providedGroups?.[0] ?? {
      id: "default",
      label: "Value",
      variant: "primary" as BarChartGroupVariant,
      tintIndex: 0,
    };
    return [fallback];
  }, [derivedGroupOrder, hasGroupedData, providedGroups]);

  const normalizedData: NormalizedPoint[] = React.useMemo(() => {
    if (data.length === 0) return [];
    if (!hasGroupedData) {
      return data.map((point) => ({
        label: point.label,
        detail: "detail" in point ? point.detail : undefined,
        bars: [
          {
            id: resolvedGroups[0]?.id ?? "default",
            value: "value" in point ? point.value : 0,
            detail: "detail" in point ? point.detail : undefined,
            variant: resolvedGroups[0]?.variant ?? "primary",
            tintIndex: resolvedGroups[0]?.tintIndex ?? 0,
          },
        ],
      }));
    }

    const groupedData = data.filter(isGroupedPoint);
    return groupedData.map((point) => ({
      label: point.label,
      detail: point.detail,
      bars: resolvedGroups.map((group) => {
        const match = point.groups.find((item) => item.id === group.id);
        return {
          id: group.id,
          value: match?.value ?? 0,
          detail: match?.detail ?? point.detail,
          variant: group.variant,
        };
      }),
    }));
  }, [data, resolvedGroups, hasGroupedData]);

  const chartData: ChartDataPoint[] = React.useMemo(
    () =>
      normalizedData.map((point) => {
        const entry: ChartDataPoint = {
          label: point.label,
          detail: point.detail,
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
    fontSize: 12,
  };

  return (
    <figure className="ds-BarChart" role="group" aria-label={ariaLabel}>
      <div className="ds-BarChartGrid">
        {yAxisLabel && (
          <div className="ds-BarChartAxisLabel" aria-hidden>
            {yAxisLabel}
          </div>
        )}
        <div className="ds-BarChartChart">
          <ResponsiveContainer width="100%" height="100%">
            <RCBarChart data={chartData} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="label"
                tick={axisTickStyle}
                tickLine={{ stroke: "var(--color-border-default)" }}
                axisLine={{ stroke: "var(--color-border-default)" }}
                interval={0}
              />
              <YAxis
                tick={axisTickStyle}
                tickLine={{ stroke: "var(--color-border-default)" }}
                axisLine={{ stroke: "var(--color-border-default)" }}
                allowDecimals={false}
                width={32}
              />
              <Tooltip
                cursor={{ fill: "color-mix(in oklab, var(--color-border-default) 25%, transparent)" }}
                content={<ChartTooltip groups={resolvedGroups} valueFormatter={valueFormatter} />}
              />
              {resolvedGroups.map((group, index) => (
                <Bar
                  key={group.id}
                  dataKey={group.id}
                  stackId="jobs"
                  fill={getVariantColor(group.variant ?? "primary")}
                  isAnimationActive={false}
                  radius={index === resolvedGroups.length - 1 ? [8, 8, 0, 0] : 0}
                  maxBarSize={48}
                />
              ))}
            </RCBarChart>
          </ResponsiveContainer>
        </div>
        {xAxisLabel && (
          <div className="ds-BarChartAxisCaption" aria-hidden>
            {xAxisLabel}
          </div>
        )}
      </div>

      <dl className="ds-BarChartTable">
        {normalizedData.map((point, pointIndex) =>
          point.bars.map((bar, barIndex) => {
            const groupMeta = resolvedGroups.find((group) => group.id === bar.id);
            return (
              <div key={`table-${point.label}-${bar.id}-${pointIndex}-${barIndex}`} className="ds-BarChartTableRow">
                <dt>{`${point.label} – ${groupMeta?.label ?? bar.id}`}</dt>
                <dd>{valueFormatter(bar.value)}</dd>
              </div>
            );
          })
        )}
      </dl>
    </figure>
  );
}
