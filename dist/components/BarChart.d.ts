import * as react_jsx_runtime from 'react/jsx-runtime';

type BarChartGroupVariant = "primary" | "accent" | "success" | "warning" | "secondary" | "neutral";
type BarChartGroupMeta = {
    id: string;
    label: string;
    variant?: BarChartGroupVariant;
    tintIndex?: number;
};
type BarChartDataPoint = {
    label: string;
    value: number;
    detail?: string;
} | {
    label: string;
    detail?: string;
    groups: {
        id: string;
        value: number;
        detail?: string;
    }[];
};
type BarChartProps = {
    data: BarChartDataPoint[];
    ariaLabel: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    valueFormatter?: (value: number) => string;
    groups?: BarChartGroupMeta[];
    /** Optional filter — tooltip is only shown when this returns true for the hovered label */
    tooltipFilter?: (label: string) => boolean;
};
declare function BarChart({ data, ariaLabel, xAxisLabel, yAxisLabel, valueFormatter, groups: providedGroups, tooltipFilter, }: BarChartProps): react_jsx_runtime.JSX.Element;

export { BarChart, type BarChartDataPoint, type BarChartGroupMeta, type BarChartGroupVariant };
