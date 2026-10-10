type KpiEntry = {
    value: number;
    unit: string;
    period?: string;
    qualifier?: "exact" | "approximately" | "over" | "under" | "projected";
    reported_at?: string;
    context?: string;
    source_url?: string;
    source_title?: string;
    source_authority?: "first_party" | "linkedin" | null;
    outlier?: boolean;
};
type KpiSnapshot = {
    metrics: Record<string, KpiEntry[]>;
};
declare function formatKpiValue(value: number, unit: string, locale?: string): string;
declare function qualifierPrefix(qualifier?: string): string;
declare function getRevenue(snapshot: KpiSnapshot | null): {
    entry: KpiEntry;
    key: string;
} | null;
declare function getEmployees(snapshot: KpiSnapshot | null): KpiEntry | null;
/**
 * Returns the most relevant audience metric.
 * For B2C products (high user counts or extreme user/customer ratio),
 * users_total is more meaningful than customers_total.
 */
declare function getCustomers(snapshot: KpiSnapshot | null): {
    entry: KpiEntry;
    key: string;
} | null;
declare function getRevenueGrowthYoY(snapshot: KpiSnapshot | null): KpiEntry | null;
type KpiCategoryDef = {
    category: string;
    label: string;
};
declare const KPI_CATEGORIES: Record<string, KpiCategoryDef>;
declare const CATEGORY_LABELS: Record<string, string>;
declare function getKpiSnapshot(competitor: Record<string, unknown>): KpiSnapshot | null;

export { CATEGORY_LABELS, KPI_CATEGORIES, type KpiCategoryDef, type KpiEntry, type KpiSnapshot, formatKpiValue, getCustomers, getEmployees, getKpiSnapshot, getRevenue, getRevenueGrowthYoY, qualifierPrefix };
