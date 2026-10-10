import {
  formatKpiValue,
  qualifierPrefix
} from "./chunk-OCIO7S25.js";
import {
  JOB_FUNCTION_LABELS,
  JOB_FUNCTION_VARIANT_MAP
} from "./chunk-7P3TCSGI.js";
import {
  Tooltip
} from "./chunk-CL3B7R6Z.js";
import {
  Card
} from "./chunk-OO3JNWQC.js";
import {
  Text
} from "./chunk-MTQGJRER.js";

// src/competitor/HiringOverview.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var VARIANT_CATEGORY_LABELS = {
  primary: "Management & Strategy",
  accent: "Marketing & Sales",
  success: "Engineering & R&D",
  warning: "Production & Logistics",
  secondary: "HR & Administration",
  neutral: "Other"
};
var VARIANT_BG_CLASSES = {
  primary: "ds-bg-primary",
  accent: "ds-bg-accent",
  success: "ds-bg-success",
  warning: "ds-bg-warning",
  secondary: "ds-bg-secondary",
  neutral: "ds-bg-neutral"
};
var COMPARE_WEEKS = 4;
function countActiveAt(jobs, date) {
  const iso = date.toISOString();
  return jobs.filter((j) => {
    if (!j.first_detected || j.first_detected > iso) return false;
    if (j.ended && j.ended < iso) return false;
    return true;
  }).length;
}
function buildCategorySegments(jobs) {
  var _a, _b, _c, _d;
  const groups = /* @__PURE__ */ new Map();
  for (const job of jobs) {
    const code = (_a = job.linkedin_job_function_code) != null ? _a : "__unknown";
    const variant = (_b = JOB_FUNCTION_VARIANT_MAP[code]) != null ? _b : "neutral";
    const fnLabel = (_c = JOB_FUNCTION_LABELS[code]) != null ? _c : code;
    let group = groups.get(variant);
    if (!group) {
      group = { total: 0, byFunction: /* @__PURE__ */ new Map() };
      groups.set(variant, group);
    }
    group.total++;
    group.byFunction.set(fnLabel, ((_d = group.byFunction.get(fnLabel)) != null ? _d : 0) + 1);
  }
  const total = jobs.length;
  return [...groups.entries()].sort((a, b) => {
    if (a[0] === "neutral") return 1;
    if (b[0] === "neutral") return -1;
    return b[1].total - a[1].total;
  }).map(([variant, { total: count, byFunction }]) => ({
    variant,
    label: VARIANT_CATEGORY_LABELS[variant],
    count,
    percent: count / total * 100,
    functions: [...byFunction.entries()].sort((a, b) => b[1] - a[1]).map(([label, c]) => ({ label, count: c }))
  }));
}
function HiringOverview({
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
  hidePeriod
}) {
  var _a;
  const segments = segmentsProp != null ? segmentsProp : activeJobs ? buildCategorySegments(activeJobs) : [];
  const currentCount = (_a = activeJobCount != null ? activeJobCount : activeJobs == null ? void 0 : activeJobs.length) != null ? _a : 0;
  const compareDate = /* @__PURE__ */ new Date();
  compareDate.setDate(compareDate.getDate() - COMPARE_WEEKS * 7);
  const previousCount = jobLifecycle ? countActiveAt(jobLifecycle, compareDate) : 0;
  const diff = jobLifecycle ? currentCount - previousCount : 0;
  const hasTrend = !!jobLifecycle;
  const hasJobs = segments.length > 0;
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(Card.Header, { children: /* @__PURE__ */ jsx(Card.Title, { as: "h2", children: "Team & Hiring" }) }),
    /* @__PURE__ */ jsx(Card.Content, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-xl", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-sm mb-xs", children: [
            EmployeesIcon && /* @__PURE__ */ jsx(EmployeesIcon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Text, { size: "sm", tone: "muted", children: "Employees" })
          ] }),
          employees ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(Text, { size: "xl", weight: "bold", children: [
              qualifierPrefix(employees.qualifier),
              formatKpiValue(employees.value, employees.unit)
            ] }),
            employees.period && !hidePeriod && /* @__PURE__ */ jsx(Text, { size: "sm", tone: "muted", children: employees.period })
          ] }) : /* @__PURE__ */ jsx(Text, { size: "xl", weight: "bold", tone: "muted", children: "?" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-sm mb-xs", children: [
            RolesIcon && /* @__PURE__ */ jsx(RolesIcon, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Text, { size: "sm", tone: "muted", children: "Open Roles" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-sm", children: [
            /* @__PURE__ */ jsx(Text, { size: "xl", weight: "bold", children: currentCount }),
            hasTrend && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              diff > 0 && TrendUpIcon ? /* @__PURE__ */ jsx(TrendUpIcon, { className: "h-3.5 w-3.5 text-success" }) : diff < 0 && TrendDownIcon ? /* @__PURE__ */ jsx(TrendDownIcon, { className: "h-3.5 w-3.5 text-destructive" }) : UnchangedIcon ? /* @__PURE__ */ jsx(UnchangedIcon, { className: "h-3.5 w-3.5 text-muted-foreground" }) : null,
              /* @__PURE__ */ jsx(Text, { size: "sm", tone: "muted", children: diff === 0 ? "unchanged" : `${diff > 0 ? "+" : ""}${diff} vs. ${COMPARE_WEEKS}w ago` })
            ] })
          ] })
        ] })
      ] }),
      hasJobs && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-sm", children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", tone: "muted", weight: "medium", children: "Open roles by function" }),
        /* @__PURE__ */ jsx("div", { className: "flex h-3 w-full rounded-full overflow-hidden", children: segments.map((seg) => /* @__PURE__ */ jsx(
          Tooltip,
          {
            className: `h-full block ${VARIANT_BG_CLASSES[seg.variant]}`,
            style: { width: `${seg.percent}%` },
            multiline: true,
            content: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: seg.label }),
              seg.functions.map((fn) => /* @__PURE__ */ jsxs("span", { children: [
                fn.label,
                ": ",
                fn.count
              ] }, fn.label))
            ] }),
            children: /* @__PURE__ */ jsx("div", { className: "h-full w-full cursor-default" })
          },
          seg.variant
        )) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-x-md gap-y-xs", children: segments.map((seg) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-xs", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `inline-block h-2.5 w-2.5 rounded-full shrink-0 ${VARIANT_BG_CLASSES[seg.variant]}`
            }
          ),
          /* @__PURE__ */ jsx(Text, { size: "xs", tone: "muted", children: seg.label })
        ] }, seg.variant)) })
      ] })
    ] }) })
  ] });
}

export {
  buildCategorySegments,
  HiringOverview
};
//# sourceMappingURL=chunk-XVEINTNP.js.map