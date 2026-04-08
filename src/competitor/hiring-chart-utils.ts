import type { JobFunctionVariant } from "./job-functions";
import { JOB_FUNCTION_LABELS, JOB_FUNCTION_VARIANT_MAP, UNKNOWN_JOB_FUNCTION_CODE } from "./job-functions";

// ── Types ────────────────────────────────────────────────────────────────────

export type JobFunctionMeta = {
  id: string;
  label: string;
  variant: JobFunctionVariant;
  tintIndex?: number;
};

export type WeeklyJobPoint = {
  label: string;
  detail: string;
  groups: {
    id: string;
    value: number;
    detail: string;
  }[];
};

export type JobLifecycleInput = {
  first_detected: string | null;
  ended: string | null;
  linkedin_job_function_code: string | null;
};

// ── Date helpers ─────────────────────────────────────────────────────────────

const MS_IN_DAY = 86400000;

export const startOfIsoWeek = (date: Date) => {
  const result = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const day = result.getUTCDay() || 7;
  if (day !== 1) {
    result.setUTCDate(result.getUTCDate() - (day - 1));
  }
  return result;
};

export const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * MS_IN_DAY);

export const addWeeks = (date: Date, weeks: number) =>
  addDays(date, weeks * 7);

export const getIsoWeekMeta = (date: Date) => {
  const target = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((target.getTime() - yearStart.getTime()) / MS_IN_DAY + 1) / 7,
  );
  return { week, year: target.getUTCFullYear() };
};

export function formatJobCount(value: number, locale = "de-DE"): string {
  if (locale.startsWith("de")) {
    return `${value} Stelle${value === 1 ? "" : "n"}`;
  }
  return `${value} position${value === 1 ? "" : "s"}`;
}

// ── Build weekly chart data ──────────────────────────────────────────────────

export function buildWeeklyJobData(
  jobs: JobLifecycleInput[],
  maxWeeks = 12,
  locale: "en" | "de" = "en",
): { weeklyJobData: WeeklyJobPoint[]; jobFunctionGroups: JobFunctionMeta[] } {
  const empty = { weeklyJobData: [] as WeeklyJobPoint[], jobFunctionGroups: [] as JobFunctionMeta[] };

  const now = new Date();
  const lifecycles = jobs
    .filter((job) => typeof job.first_detected === "string")
    .map((job) => {
      const start = new Date(job.first_detected as string);
      const resolvedEnd = job.ended ? new Date(job.ended) : now;
      const end = resolvedEnd.getTime() < start.getTime() ? start : resolvedEnd;
      const code = job.linkedin_job_function_code ?? UNKNOWN_JOB_FUNCTION_CODE;
      return { start, end, code };
    });

  if (lifecycles.length === 0) return empty;

  // Build job function groups
  const jobFunctions = new Map<string, string>();
  lifecycles.forEach((job) => {
    if (!jobFunctions.has(job.code))
      jobFunctions.set(job.code, JOB_FUNCTION_LABELS[job.code] ?? job.code);
  });

  const variantOrder: JobFunctionVariant[] = [
    "primary", "accent", "success", "warning", "secondary", "neutral",
  ];
  const groupedByVariant = new Map<JobFunctionVariant, JobFunctionMeta[]>();
  Array.from(jobFunctions.entries())
    .map(([code, label]) => ({
      id: code,
      label,
      variant: (JOB_FUNCTION_VARIANT_MAP[code] ?? "neutral") as JobFunctionVariant,
    }))
    .sort((a, b) => {
      const d = variantOrder.indexOf(a.variant) - variantOrder.indexOf(b.variant);
      if (d !== 0) return d;
      return a.label.localeCompare(b.label, undefined, { sensitivity: "base" });
    })
    .forEach((entry) => {
      if (!groupedByVariant.has(entry.variant)) groupedByVariant.set(entry.variant, []);
      groupedByVariant.get(entry.variant)!.push(entry);
    });

  const groups: JobFunctionMeta[] = [];
  groupedByVariant.forEach((list) =>
    list.forEach((meta, idx) => groups.push({ ...meta, tintIndex: idx % 3 })),
  );
  if (groups.length === 0) return empty;

  // Build week range
  const lifecyclesByType = new Map<string, { start: Date; end: Date }[]>();
  lifecycles.forEach((job) => {
    if (!lifecyclesByType.has(job.code)) lifecyclesByType.set(job.code, []);
    lifecyclesByType.get(job.code)!.push({ start: job.start, end: job.end });
  });

  const earliestStart = lifecycles.reduce(
    (e, i) => (i.start < e ? i.start : e),
    lifecycles[0].start,
  );
  const latestEnd = lifecycles.reduce(
    (l, i) => (i.end > l ? i.end : l),
    lifecycles[0].end,
  );
  const latestWeekStart = startOfIsoWeek(latestEnd);
  const earliestWeekStart = startOfIsoWeek(earliestStart);
  const desiredStart = addWeeks(latestWeekStart, -(maxWeeks - 1));
  const rangeStart =
    desiredStart.getTime() < earliestWeekStart.getTime() ? earliestWeekStart : desiredStart;

  const weeks: Date[] = [];
  for (
    let cursor = rangeStart;
    cursor.getTime() <= latestWeekStart.getTime();
    cursor = addWeeks(cursor, 1)
  ) {
    weeks.push(cursor);
  }
  if (weeks.length === 0) weeks.push(latestWeekStart);

  const dayMonthFmt = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" });
  let lastIsoYear: number | null = null;

  const weeklyJobData: WeeklyJobPoint[] = weeks.map((weekStart) => {
    const weekEndExclusive = addWeeks(weekStart, 1);
    const weekEndInclusive = addDays(weekEndExclusive, -1);
    const { week, year } = getIsoWeekMeta(weekStart);
    const label =
      lastIsoYear === null || year !== lastIsoYear ? `${locale === "de" ? "KW" : "CW"} ${week} (${year})` : `${locale === "de" ? "KW" : "CW"} ${week}`;
    lastIsoYear = year;
    const rangeLabel = `${dayMonthFmt.format(weekStart)} – ${dayMonthFmt.format(weekEndInclusive)}`;
    const g = groups.map((gm) => {
      const items = lifecyclesByType.get(gm.id) ?? [];
      const value = items.reduce((acc, job) => {
        return job.start < weekEndExclusive && job.end >= weekStart ? acc + 1 : acc;
      }, 0);
      return { id: gm.id, value, detail: `${gm.label} · ${rangeLabel}` };
    });
    return { label, detail: rangeLabel, groups: g };
  });

  return { weeklyJobData, jobFunctionGroups: groups };
}
