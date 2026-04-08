// Types

export type KpiEntry = {
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

export type KpiSnapshot = {
  metrics: Record<string, KpiEntry[]>;
};

// Formatting

export function formatKpiValue(
  value: number,
  unit: string,
  locale = "de-DE",
): string {
  const fmt = (opts: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(locale, opts).format(value);
  const m = locale.startsWith("de") ? "Mio." : "M";
  const b = locale.startsWith("de") ? "Mrd." : "B";

  switch (unit) {
    case "USD":
      return fmt({ style: "currency", currency: "USD", maximumFractionDigits: 0 });
    case "EUR":
      return fmt({ style: "currency", currency: "EUR", maximumFractionDigits: 0 });
    case "USD_millions":
      return `$${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "EUR_millions":
      return `€${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "USD_billions":
      return `$${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "EUR_billions":
      return `€${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "CHF":
      return `CHF ${fmt({ maximumFractionDigits: 0 })}`;
    case "CHF_millions":
      return `CHF ${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "CHF_billions":
      return `CHF ${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "percent":
      return `${fmt({ maximumFractionDigits: 1 })}%`;
    case "count":
      if (value >= 1_000_000_000) {
        return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1_000_000_000)} ${b}`;
      }
      if (value >= 1_000_000) {
        return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1_000_000)} ${m}`;
      }
      if (value >= 10_000) {
        return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.round(value / 1_000) * 1_000);
      }
      return fmt({ maximumFractionDigits: 0 });
    case "ratio":
    case "multiple":
      return `${fmt({ maximumFractionDigits: 1 })}x`;
    default:
      return new Intl.NumberFormat(locale).format(value);
  }
}

export function qualifierPrefix(qualifier?: string): string {
  switch (qualifier) {
    case "approximately":
      return "~";
    case "over":
      return ">";
    case "under":
      return "<";
    default:
      return "";
  }
}

// Lookup: first match wins (revenue_arr preferred over revenue_total over revenue_mrr)

const REVENUE_KEYS = ["revenue_arr", "revenue_total", "revenue_mrr"];

export function getRevenue(snapshot: KpiSnapshot | null): { entry: KpiEntry; key: string } | null {
  if (!snapshot) return null;
  for (const key of REVENUE_KEYS) {
    if (snapshot.metrics[key]?.length) return { entry: snapshot.metrics[key][0], key };
  }
  return null;
}

export function getEmployees(snapshot: KpiSnapshot | null): KpiEntry | null {
  return snapshot?.metrics["employees"]?.[0] ?? null;
}

/**
 * Returns the most relevant audience metric.
 * For B2C products (high user counts or extreme user/customer ratio),
 * users_total is more meaningful than customers_total.
 */
export function getCustomers(snapshot: KpiSnapshot | null): { entry: KpiEntry; key: string } | null {
  if (!snapshot) return null;
  const customers = snapshot.metrics["customers_total"]?.[0];
  const users = snapshot.metrics["users_total"]?.[0];

  if (users && customers) {
    const ratio = users.value / customers.value;
    if (users.value >= 1_000_000 || ratio >= 100) {
      return { entry: users, key: "users_total" };
    }
  } else if (users && !customers) {
    return { entry: users, key: "users_total" };
  }

  if (customers) return { entry: customers, key: "customers_total" };
  return null;
}

export function getRevenueGrowthYoY(snapshot: KpiSnapshot | null): KpiEntry | null {
  return snapshot?.metrics["revenue_growth_yoy"]?.[0] ?? null;
}

// Category catalog

export type KpiCategoryDef = {
  category: string;
  label: string;
};

export const KPI_CATEGORIES: Record<string, KpiCategoryDef> = {
  revenue_arr: { category: "revenue", label: "ARR" },
  revenue_mrr: { category: "revenue", label: "MRR" },
  revenue_total: { category: "revenue", label: "Umsatz gesamt" },
  revenue_growth_yoy: { category: "revenue", label: "Umsatzwachstum YoY" },
  valuation: { category: "funding", label: "Bewertung" },
  funding_total: { category: "funding", label: "Funding gesamt" },
  funding_round: { category: "funding", label: "Letzte Runde" },
  funding_stage: { category: "funding", label: "Stage" },
  ebitda: { category: "profitability", label: "EBITDA" },
  net_income: { category: "profitability", label: "Nettoergebnis" },
  gross_margin: { category: "profitability", label: "Bruttomarge" },
  burn_rate: { category: "profitability", label: "Burn Rate" },
  customers_total: { category: "customers", label: "Kunden gesamt" },
  customers_enterprise: { category: "customers", label: "Enterprise-Kunden" },
  nrr: { category: "customers", label: "NRR" },
  churn_rate: { category: "customers", label: "Churn Rate" },
  market_share: { category: "customers", label: "Marktanteil" },
  nps: { category: "customers", label: "NPS" },
  users_total: { category: "users", label: "User gesamt" },
  users_paying: { category: "users", label: "Zahlende User" },
  gmv: { category: "users", label: "GMV" },
  employees: { category: "team", label: "Mitarbeiter" },
};

export const CATEGORY_LABELS: Record<string, string> = {
  revenue: "Revenue",
  funding: "Funding",
  profitability: "Profitability",
  customers: "Customers",
  users: "Users",
  team: "Team",
};

// Accessor

export function getKpiSnapshot(competitor: Record<string, unknown>): KpiSnapshot | null {
  const raw = competitor?.kpi_snapshot;
  if (!raw || typeof raw !== "object" || !("metrics" in raw)) return null;
  return raw as KpiSnapshot;
}
