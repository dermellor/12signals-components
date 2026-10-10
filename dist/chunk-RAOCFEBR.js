import {
  JOB_FUNCTION_LABELS,
  JOB_FUNCTION_VARIANT_MAP,
  UNKNOWN_JOB_FUNCTION_CODE
} from "./chunk-7P3TCSGI.js";

// src/competitor/hiring-chart-utils.ts
var MS_IN_DAY = 864e5;
var startOfIsoWeek = (date) => {
  const result = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = result.getUTCDay() || 7;
  if (day !== 1) {
    result.setUTCDate(result.getUTCDate() - (day - 1));
  }
  return result;
};
var addDays = (date, days) => new Date(date.getTime() + days * MS_IN_DAY);
var addWeeks = (date, weeks) => addDays(date, weeks * 7);
var getIsoWeekMeta = (date) => {
  const target = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((target.getTime() - yearStart.getTime()) / MS_IN_DAY + 1) / 7
  );
  return { week, year: target.getUTCFullYear() };
};
function formatJobCount(value, locale = "de-DE") {
  if (locale.startsWith("de")) {
    return `${value} Stelle${value === 1 ? "" : "n"}`;
  }
  return `${value} position${value === 1 ? "" : "s"}`;
}
function buildWeeklyJobData(jobs, maxWeeks = 12, locale = "en") {
  const empty = { weeklyJobData: [], jobFunctionGroups: [] };
  const now = /* @__PURE__ */ new Date();
  const lifecycles = jobs.filter((job) => typeof job.first_detected === "string").map((job) => {
    var _a;
    const start = new Date(job.first_detected);
    const resolvedEnd = job.ended ? new Date(job.ended) : now;
    const end = resolvedEnd.getTime() < start.getTime() ? start : resolvedEnd;
    const code = (_a = job.linkedin_job_function_code) != null ? _a : UNKNOWN_JOB_FUNCTION_CODE;
    return { start, end, code };
  });
  if (lifecycles.length === 0) return empty;
  const jobFunctions = /* @__PURE__ */ new Map();
  lifecycles.forEach((job) => {
    var _a;
    if (!jobFunctions.has(job.code))
      jobFunctions.set(job.code, (_a = JOB_FUNCTION_LABELS[job.code]) != null ? _a : job.code);
  });
  const variantOrder = [
    "primary",
    "accent",
    "success",
    "warning",
    "secondary",
    "neutral"
  ];
  const groupedByVariant = /* @__PURE__ */ new Map();
  Array.from(jobFunctions.entries()).map(([code, label]) => {
    var _a;
    return {
      id: code,
      label,
      variant: (_a = JOB_FUNCTION_VARIANT_MAP[code]) != null ? _a : "neutral"
    };
  }).sort((a, b) => {
    const d = variantOrder.indexOf(a.variant) - variantOrder.indexOf(b.variant);
    if (d !== 0) return d;
    return a.label.localeCompare(b.label, void 0, { sensitivity: "base" });
  }).forEach((entry) => {
    if (!groupedByVariant.has(entry.variant)) groupedByVariant.set(entry.variant, []);
    groupedByVariant.get(entry.variant).push(entry);
  });
  const groups = [];
  groupedByVariant.forEach(
    (list) => list.forEach((meta, idx) => groups.push({ ...meta, tintIndex: idx % 3 }))
  );
  if (groups.length === 0) return empty;
  const lifecyclesByType = /* @__PURE__ */ new Map();
  lifecycles.forEach((job) => {
    if (!lifecyclesByType.has(job.code)) lifecyclesByType.set(job.code, []);
    lifecyclesByType.get(job.code).push({ start: job.start, end: job.end });
  });
  const earliestStart = lifecycles.reduce(
    (e, i) => i.start < e ? i.start : e,
    lifecycles[0].start
  );
  const latestEnd = lifecycles.reduce(
    (l, i) => i.end > l ? i.end : l,
    lifecycles[0].end
  );
  const latestWeekStart = startOfIsoWeek(latestEnd);
  const earliestWeekStart = startOfIsoWeek(earliestStart);
  const desiredStart = addWeeks(latestWeekStart, -(maxWeeks - 1));
  const rangeStart = desiredStart.getTime() < earliestWeekStart.getTime() ? earliestWeekStart : desiredStart;
  const weeks = [];
  for (let cursor = rangeStart; cursor.getTime() <= latestWeekStart.getTime(); cursor = addWeeks(cursor, 1)) {
    weeks.push(cursor);
  }
  if (weeks.length === 0) weeks.push(latestWeekStart);
  const dayMonthFmt = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" });
  let lastIsoYear = null;
  const weeklyJobData = weeks.map((weekStart) => {
    const weekEndExclusive = addWeeks(weekStart, 1);
    const weekEndInclusive = addDays(weekEndExclusive, -1);
    const { week, year } = getIsoWeekMeta(weekStart);
    const label = lastIsoYear === null || year !== lastIsoYear ? `${locale === "de" ? "KW" : "CW"} ${week} (${year})` : `${locale === "de" ? "KW" : "CW"} ${week}`;
    lastIsoYear = year;
    const rangeLabel = `${dayMonthFmt.format(weekStart)} \u2013 ${dayMonthFmt.format(weekEndInclusive)}`;
    const g = groups.map((gm) => {
      var _a;
      const items = (_a = lifecyclesByType.get(gm.id)) != null ? _a : [];
      const value = items.reduce((acc, job) => {
        return job.start < weekEndExclusive && job.end >= weekStart ? acc + 1 : acc;
      }, 0);
      return { id: gm.id, value, detail: `${gm.label} \xB7 ${rangeLabel}` };
    });
    return { label, detail: rangeLabel, groups: g };
  });
  return { weeklyJobData, jobFunctionGroups: groups };
}

export {
  startOfIsoWeek,
  addDays,
  addWeeks,
  getIsoWeekMeta,
  formatJobCount,
  buildWeeklyJobData
};
//# sourceMappingURL=chunk-RAOCFEBR.js.map