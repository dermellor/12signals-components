type JobFunctionVariant = "primary" | "accent" | "success" | "warning" | "secondary" | "neutral";
declare const UNKNOWN_JOB_FUNCTION_CODE = "__unknown";
declare const JOB_FUNCTION_LABELS: Record<string, string>;
declare const JOB_FUNCTION_VARIANT_MAP: Record<string, JobFunctionVariant>;

export { JOB_FUNCTION_LABELS, JOB_FUNCTION_VARIANT_MAP, type JobFunctionVariant, UNKNOWN_JOB_FUNCTION_CODE };
