import React from "react";
import { Card } from "../design-system/components/Card";
import { Text } from "../design-system/components/Text";
import { Tooltip } from "../design-system/components/Tooltip";
import type { KpiEntry } from "./kpi-utils";
import { formatKpiValue, qualifierPrefix } from "./kpi-utils";
import type { JobFunctionVariant } from "./job-functions";
import { JOB_FUNCTION_LABELS, JOB_FUNCTION_VARIANT_MAP } from "./job-functions";

// ── Types ────────────────────────────────────────────────────────────────────

type FunctionBreakdown = { label: string; count: number };

export type CategorySegment = {
  variant: JobFunctionVariant;
  label: string;
  count: number;
  percent: number;
  functions: FunctionBreakdown[];
};

export type ActiveJob = {
  linkedin_job_function_code: string | null;
};

export type JobLifecycleEntry = {
  first_detected: string | null;
  ended: string | null;
};

// ── Constants ────────────────────────────────────────────────────────────────

const VARIANT_CATEGORY_LABELS: Record<JobFunctionVariant, string> = {
  primary: "Management & Strategy",
  accent: "Marketing & Sales",
  success: "Engineering & R&D",
  warning: "Production & Logistics",
  secondary: "HR & Administration",
  neutral: "Other",
};

const VARIANT_BG_CLASSES: Record<JobFunctionVariant, string> = {
  primary: "ds-bg-primary",
  accent: "ds-bg-accent",
  success: "ds-bg-success",
  warning: "ds-bg-warning",
  secondary: "ds-bg-secondary",
  neutral: "ds-bg-neutral",
};

const COMPARE_WEEKS = 4;

// ── Pure functions ───────────────────────────────────────────────────────────

function countActiveAt(jobs: JobLifecycleEntry[], date: Date): number {
  const iso = date.toISOString();
  return jobs.filter((j) => {
    if (!j.first_detected || j.first_detected > iso) return false;
    if (j.ended && j.ended < iso) return false;
    return true;
  }).length;
}

export function buildCategorySegments(jobs: ActiveJob[]): CategorySegment[] {
  const groups = new Map<
    JobFunctionVariant,
    { total: number; byFunction: Map<string, number> }
  >();

  for (const job of jobs) {
    const code = job.linkedin_job_function_code ?? "__unknown";
    const variant = JOB_FUNCTION_VARIANT_MAP[code] ?? "neutral";
    const fnLabel = JOB_FUNCTION_LABELS[code] ?? code;

    let group = groups.get(variant);
    if (!group) {
      group = { total: 0, byFunction: new Map() };
      groups.set(variant, group);
    }
    group.total++;
    group.byFunction.set(fnLabel, (group.byFunction.get(fnLabel) ?? 0) + 1);
  }

  const total = jobs.length;
  return [...groups.entries()]
    .sort((a, b) => {
      if (a[0] === "neutral") return 1;
      if (b[0] === "neutral") return -1;
      return b[1].total - a[1].total;
    })
    .map(([variant, { total: count, byFunction }]) => ({
      variant,
      label: VARIANT_CATEGORY_LABELS[variant],
      count,
      percent: (count / total) * 100,
      functions: [...byFunction.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([label, c]) => ({ label, count: c })),
    }));
}

// ── Component ────────────────────────────────────────────────────────────────

type Props = {
  /** Pre-computed segments, or pass activeJobs to compute automatically */
  segments?: CategorySegment[];
  /** Active jobs — used to compute segments if not provided */
  activeJobs?: ActiveJob[];
  /** Total active job count (overrides activeJobs.length) */
  activeJobCount?: number | null;
  /** Job lifecycle data for trend calculation */
  jobLifecycle?: JobLifecycleEntry[];
  /** Employee KPI entry */
  employees: KpiEntry | null;
  /** Icon for employees stat (e.g. lucide Building2) */
  employeesIcon?: React.ComponentType<{ className?: string }>;
  /** Icon for open roles stat (e.g. lucide Briefcase) */
  rolesIcon?: React.ComponentType<{ className?: string }>;
  /** Icon for trending up (e.g. lucide TrendingUp) */
  trendUpIcon?: React.ComponentType<{ className?: string }>;
  /** Icon for trending down (e.g. lucide TrendingDown) */
  trendDownIcon?: React.ComponentType<{ className?: string }>;
  /** Icon for no change (e.g. lucide Minus) */
  unchangedIcon?: React.ComponentType<{ className?: string }>;
  /** Hide the period/year below the employees value */
  hidePeriod?: boolean;
};

export function HiringOverview({
  segments: segmentsProp,
  activeJobs,
  activeJobCount,
  jobLifecycle,
  employees,
  employeesIcon: EmployeesIcon,
  rolesIcon: RolesIcon,
  trendUpIcon: TrendUpIcon,
  trendDownIcon: TrendDownIcon,
  unchangedIcon: UnchangedIcon,
  hidePeriod,
}: Props) {
  const segments = segmentsProp ?? (activeJobs ? buildCategorySegments(activeJobs) : []);
  const currentCount = activeJobCount ?? activeJobs?.length ?? 0;

  const compareDate = new Date();
  compareDate.setDate(compareDate.getDate() - COMPARE_WEEKS * 7);
  const previousCount = jobLifecycle ? countActiveAt(jobLifecycle, compareDate) : 0;
  const diff = jobLifecycle ? currentCount - previousCount : 0;
  const hasTrend = !!jobLifecycle;

  const hasJobs = segments.length > 0;

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h2">Team & Hiring</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-md">
          {/* Stats row */}
          <div className="flex gap-xl">
            {/* Employees */}
            <div>
              <div className="flex items-center gap-sm mb-xs">
                {EmployeesIcon && <EmployeesIcon className="h-4 w-4 text-muted-foreground" />}
                <Text size="sm" tone="muted">Employees</Text>
              </div>
              {employees ? (
                <>
                  <Text size="xl" weight="bold">
                    {qualifierPrefix(employees.qualifier)}
                    {formatKpiValue(employees.value, employees.unit)}
                  </Text>
                  {employees.period && !hidePeriod && (
                    <Text size="sm" tone="muted">{employees.period}</Text>
                  )}
                </>
              ) : (
                <Text size="xl" weight="bold" tone="muted">?</Text>
              )}
            </div>

            {/* Open Roles */}
            <div>
              <div className="flex items-center gap-sm mb-xs">
                {RolesIcon && <RolesIcon className="h-4 w-4 text-muted-foreground" />}
                <Text size="sm" tone="muted">Open Roles</Text>
              </div>
              <div className="flex items-baseline gap-sm">
                <Text size="xl" weight="bold">{currentCount}</Text>
                {hasTrend && (
                  <div className="flex items-center gap-1">
                    {diff > 0 && TrendUpIcon ? (
                      <TrendUpIcon className="h-3.5 w-3.5 text-success" />
                    ) : diff < 0 && TrendDownIcon ? (
                      <TrendDownIcon className="h-3.5 w-3.5 text-destructive" />
                    ) : UnchangedIcon ? (
                      <UnchangedIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : null}
                    <Text size="sm" tone="muted">
                      {diff === 0
                        ? "unchanged"
                        : `${diff > 0 ? "+" : ""}${diff} vs. ${COMPARE_WEEKS}w ago`}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stacked horizontal bar + legend */}
          {hasJobs && (
            <div className="flex flex-col gap-sm">
              <Text size="xs" tone="muted" weight="medium">Open roles by function</Text>
              <div className="flex h-3 w-full rounded-full overflow-hidden">
                {segments.map((seg) => (
                  <Tooltip
                    key={seg.variant}
                    className={`h-full block ${VARIANT_BG_CLASSES[seg.variant]}`}
                    style={{ width: `${seg.percent}%` }}
                    multiline
                    content={
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold">{seg.label}</span>
                        {seg.functions.map((fn) => (
                          <span key={fn.label}>{fn.label}: {fn.count}</span>
                        ))}
                      </div>
                    }
                  >
                    <div className="h-full w-full cursor-default" />
                  </Tooltip>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-x-md gap-y-xs">
                {segments.map((seg) => (
                  <div key={seg.variant} className="flex items-center gap-xs">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full shrink-0 ${VARIANT_BG_CLASSES[seg.variant]}`}
                    />
                    <Text size="xs" tone="muted">{seg.label}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
