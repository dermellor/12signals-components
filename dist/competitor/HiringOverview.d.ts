import * as react_jsx_runtime from 'react/jsx-runtime';
import React__default from 'react';
import { KpiEntry } from './kpi-utils.js';
import { JobFunctionVariant } from './job-functions.js';

type FunctionBreakdown = {
    label: string;
    count: number;
};
type CategorySegment = {
    variant: JobFunctionVariant;
    label: string;
    count: number;
    percent: number;
    functions: FunctionBreakdown[];
};
type ActiveJob = {
    linkedin_job_function_code: string | null;
};
type JobLifecycleEntry = {
    first_detected: string | null;
    ended: string | null;
};
declare function buildCategorySegments(jobs: ActiveJob[]): CategorySegment[];
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
    employeesIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for open roles stat (e.g. lucide Briefcase) */
    rolesIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for trending up (e.g. lucide TrendingUp) */
    trendUpIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for trending down (e.g. lucide TrendingDown) */
    trendDownIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Icon for no change (e.g. lucide Minus) */
    unchangedIcon?: React__default.ComponentType<{
        className?: string;
    }>;
    /** Hide the period/year below the employees value */
    hidePeriod?: boolean;
};
declare function HiringOverview({ segments: segmentsProp, activeJobs, activeJobCount, jobLifecycle, employees, employeesIcon: EmployeesIcon, rolesIcon: RolesIcon, trendUpIcon: TrendUpIcon, trendDownIcon: TrendDownIcon, unchangedIcon: UnchangedIcon, hidePeriod, }: Props): react_jsx_runtime.JSX.Element;

export { type ActiveJob, type CategorySegment, HiringOverview, type JobLifecycleEntry, buildCategorySegments };
