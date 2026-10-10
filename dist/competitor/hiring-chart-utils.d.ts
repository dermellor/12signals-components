import { JobFunctionVariant } from './job-functions.js';

type JobFunctionMeta = {
    id: string;
    label: string;
    variant: JobFunctionVariant;
    tintIndex?: number;
};
type WeeklyJobPoint = {
    label: string;
    detail: string;
    groups: {
        id: string;
        value: number;
        detail: string;
    }[];
};
type JobLifecycleInput = {
    first_detected: string | null;
    ended: string | null;
    linkedin_job_function_code: string | null;
};
declare const startOfIsoWeek: (date: Date) => Date;
declare const addDays: (date: Date, days: number) => Date;
declare const addWeeks: (date: Date, weeks: number) => Date;
declare const getIsoWeekMeta: (date: Date) => {
    week: number;
    year: number;
};
declare function formatJobCount(value: number, locale?: string): string;
declare function buildWeeklyJobData(jobs: JobLifecycleInput[], maxWeeks?: number, locale?: "en" | "de"): {
    weeklyJobData: WeeklyJobPoint[];
    jobFunctionGroups: JobFunctionMeta[];
};

export { type JobFunctionMeta, type JobLifecycleInput, type WeeklyJobPoint, addDays, addWeeks, buildWeeklyJobData, formatJobCount, getIsoWeekMeta, startOfIsoWeek };
