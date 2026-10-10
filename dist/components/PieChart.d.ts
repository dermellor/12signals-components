import * as react_jsx_runtime from 'react/jsx-runtime';

type PieChartSliceVariant = "primary" | "accent" | "success" | "warning" | "secondary" | "neutral";
type PieChartSlice = {
    id: string;
    label: string;
    value: number;
    detail?: string;
    variant?: PieChartSliceVariant;
};
type PieChartCenterLabel = {
    value: string;
    description?: string;
};
type PieChartProps = {
    data: PieChartSlice[];
    ariaLabel: string;
    valueFormatter?: (value: number) => string;
    centerLabel?: PieChartCenterLabel;
    showLegend?: boolean;
    variant?: "default" | "plain";
};
declare function PieChart({ data, ariaLabel, valueFormatter, centerLabel, showLegend, variant, }: PieChartProps): react_jsx_runtime.JSX.Element | null;

export { PieChart, type PieChartCenterLabel, type PieChartSlice, type PieChartSliceVariant };
