// src/competitor/kpi-utils.ts
function formatKpiValue(value, unit, locale = "de-DE") {
  const fmt = (opts) => new Intl.NumberFormat(locale, opts).format(value);
  const m = locale.startsWith("de") ? "Mio." : "M";
  const b = locale.startsWith("de") ? "Mrd." : "B";
  const compactCurrency = (symbol, symbolPrefix) => {
    const fmtN = (n, frac) => new Intl.NumberFormat(locale, { maximumFractionDigits: frac }).format(n);
    const wrap = (n, suffix) => symbolPrefix ? `${symbol} ${n} ${suffix}` : `${n} ${suffix} ${symbol}`;
    if (value >= 1e9) return wrap(fmtN(value / 1e9, 1), b);
    if (value >= 1e6) return wrap(fmtN(value / 1e6, 1), m);
    if (symbolPrefix) return `${symbol} ${fmtN(value, 0)}`;
    return `${fmtN(value, 0)} ${symbol}`;
  };
  const deLocale = locale.startsWith("de");
  switch (unit) {
    case "USD":
      return compactCurrency("$", !deLocale);
    case "EUR":
      return compactCurrency("\u20AC", !deLocale);
    case "USD_millions":
      return `$${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "EUR_millions":
      return `\u20AC${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "USD_billions":
      return `$${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "EUR_billions":
      return `\u20AC${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "CHF":
      return compactCurrency("CHF", true);
    case "CHF_millions":
      return `CHF ${fmt({ maximumFractionDigits: 1 })} ${m}`;
    case "CHF_billions":
      return `CHF ${fmt({ maximumFractionDigits: 1 })} ${b}`;
    case "percent":
      return `${fmt({ maximumFractionDigits: 1 })}%`;
    case "count":
      if (value >= 1e9) {
        return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1e9)} ${b}`;
      }
      if (value >= 1e6) {
        return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1e6)} ${m}`;
      }
      if (value >= 1e4) {
        return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.round(value / 1e3) * 1e3);
      }
      return fmt({ maximumFractionDigits: 0 });
    case "ratio":
    case "multiple":
      return `${fmt({ maximumFractionDigits: 1 })}x`;
    default:
      return new Intl.NumberFormat(locale).format(value);
  }
}
function qualifierPrefix(qualifier) {
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
var REVENUE_KEYS = ["revenue_arr", "revenue_total", "revenue_mrr"];
function getRevenue(snapshot) {
  var _a;
  if (!snapshot) return null;
  for (const key of REVENUE_KEYS) {
    if ((_a = snapshot.metrics[key]) == null ? void 0 : _a.length) return { entry: snapshot.metrics[key][0], key };
  }
  return null;
}
function getEmployees(snapshot) {
  var _a, _b;
  return (_b = (_a = snapshot == null ? void 0 : snapshot.metrics["employees"]) == null ? void 0 : _a[0]) != null ? _b : null;
}
function getCustomers(snapshot) {
  var _a, _b, _c;
  if (!snapshot) return null;
  const customers = (_a = snapshot.metrics["customers_total"]) == null ? void 0 : _a[0];
  const users = (_b = snapshot.metrics["users_total"]) == null ? void 0 : _b[0];
  const enterprise = (_c = snapshot.metrics["customers_enterprise"]) == null ? void 0 : _c[0];
  if (users && customers) {
    const ratio = users.value / customers.value;
    if (users.value >= 1e6 || ratio >= 100) {
      return { entry: users, key: "users_total" };
    }
  } else if (users && !customers) {
    return { entry: users, key: "users_total" };
  }
  if (customers) return { entry: customers, key: "customers_total" };
  if (enterprise) return { entry: enterprise, key: "customers_enterprise" };
  return null;
}
function getRevenueGrowthYoY(snapshot) {
  var _a, _b;
  return (_b = (_a = snapshot == null ? void 0 : snapshot.metrics["revenue_growth_yoy"]) == null ? void 0 : _a[0]) != null ? _b : null;
}
var KPI_CATEGORIES = {
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
  employees: { category: "team", label: "Mitarbeiter" }
};
var CATEGORY_LABELS = {
  revenue: "Revenue",
  funding: "Funding",
  profitability: "Profitability",
  customers: "Customers",
  users: "Users",
  team: "Team"
};
function getKpiSnapshot(competitor) {
  const raw = competitor == null ? void 0 : competitor.kpi_snapshot;
  if (!raw || typeof raw !== "object" || !("metrics" in raw)) return null;
  return raw;
}

export {
  formatKpiValue,
  qualifierPrefix,
  getRevenue,
  getEmployees,
  getCustomers,
  getRevenueGrowthYoY,
  KPI_CATEGORIES,
  CATEGORY_LABELS,
  getKpiSnapshot
};
//# sourceMappingURL=chunk-OCIO7S25.js.map