import {
  AB_TEST_COLORS,
  detectABTestGroups
} from "./chunk-APIHSY7T.js";
import {
  Text
} from "./chunk-MTQGJRER.js";
import {
  Badge
} from "./chunk-O7AERZ63.js";

// src/competitor/ClaimTimeline.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function ClaimTimeline({
  claimRanges,
  loading = false,
  error = false,
  locale = "de-DE",
  tickInterval,
  loadingIcon
}) {
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      loadingIcon,
      " Lade Positionierung\u2026"
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsx(Text, { size: "sm", className: "text-destructive", children: "Konnte Positionierung nicht laden." });
  }
  if (claimRanges.length === 0) {
    return /* @__PURE__ */ jsx(Text, { size: "sm", tone: "muted", children: "Keine Claims gefunden." });
  }
  const ranges = [...claimRanges].sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime()
  );
  const start = new Date(
    ranges.reduce(
      (min, r) => Math.min(min, new Date(r.from).getTime()),
      Infinity
    )
  );
  const end = new Date(
    ranges.reduce(
      (max, r) => {
        var _a;
        return Math.max(max, new Date((_a = r.to) != null ? _a : (/* @__PURE__ */ new Date()).toISOString()).getTime());
      },
      -Infinity
    )
  );
  const totalMs = Math.max(1, end.getTime() - start.getTime());
  const totalMonths = Math.round(totalMs / (30.44 * 864e5));
  const fmtShort = (d) => d.toLocaleDateString(locale, { month: "short", year: "2-digit" });
  const fmtFull = (d) => d.toLocaleDateString(locale);
  const percent = (dateStr) => {
    const ms = new Date(dateStr).getTime() - start.getTime();
    return Math.max(0, Math.min(100, ms / totalMs * 100));
  };
  const percentDate = (d) => {
    const ms = d.getTime() - start.getTime();
    return Math.max(0, Math.min(100, ms / totalMs * 100));
  };
  const interval = tickInterval != null ? tickInterval : totalMonths <= 6 ? 1 : totalMonths <= 12 ? 3 : totalMonths <= 24 ? 6 : 12;
  const ticks = (() => {
    const out = [];
    const startMonth = Math.ceil(start.getMonth() / interval) * interval;
    let d = new Date(start.getFullYear(), startMonth, 1);
    if (percentDate(d) < 5) {
      d = new Date(d.getFullYear(), d.getMonth() + interval, 1);
    }
    while (d <= end) {
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const y = String(d.getFullYear() % 100).padStart(2, "0");
      out.push({ left: percentDate(d), label: `${m}/${y}` });
      d = new Date(d.getFullYear(), d.getMonth() + interval, 1);
    }
    return out;
  })();
  const barStyles = (idx) => {
    const isPrimary = idx % 2 === 0;
    return {
      background: isPrimary ? "hsl(var(--tl-bar-1) / 0.18)" : "hsl(var(--tl-bar-2) / 0.18)",
      borderColor: isPrimary ? "hsl(var(--tl-bar-1) / 0.35)" : "hsl(var(--tl-bar-2) / 0.35)"
    };
  };
  const timelineEntries = detectABTestGroups(ranges);
  const entryMinHeight = (entry) => entry.kind === "abtest" ? Math.max(48, 28 + entry.variants.length * 24) : 48;
  const renderMobile = () => /* @__PURE__ */ jsx("div", { className: "ds-claim-timeline-mobile flex flex-col gap-3", children: timelineEntries.map((entry, idx) => {
    if (entry.kind === "normal") {
      const r = entry.range;
      const left2 = percent(r.from);
      const rightPt2 = r.to ? percent(r.to) : 100;
      const width2 = Math.max(2, rightPt2 - left2);
      return /* @__PURE__ */ jsxs("div", { className: "border-b border-border/40 pb-3 last:border-b-0 last:pb-0", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium mb-1", children: r.claim }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mb-2", children: [
          fmtShort(new Date(r.from)),
          " \u2013 ",
          r.to ? fmtShort(new Date(r.to)) : "today"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative h-5 rounded overflow-hidden", style: { background: "hsl(var(--border) / 0.3)" }, children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 rounded border",
            style: { left: `${left2}%`, width: `${width2}%`, ...barStyles(idx) }
          }
        ) })
      ] }, idx);
    }
    const left = percent(entry.from);
    const rightPt = entry.to ? percent(entry.to) : 100;
    const width = Math.max(2, rightPt - left);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "border-b border-border/40 pb-3 last:border-b-0 last:pb-0 border-l-2 pl-2",
        style: { borderLeftColor: "hsl(var(--accent) / 0.5)" },
        children: [
          /* @__PURE__ */ jsx(Badge, { variant: "accent", tone: "subtle", size: "sm", children: "A/B Test" }),
          entry.variants.map((v, vi) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "inline-block w-2.5 h-2.5 rounded-full flex-shrink-0",
                style: { background: AB_TEST_COLORS[vi % AB_TEST_COLORS.length].border }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: v.displayClaim })
          ] }, v.key)),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mt-1 mb-2", children: [
            fmtShort(new Date(entry.from)),
            " \u2013 ",
            entry.to ? fmtShort(new Date(entry.to)) : "today"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative h-5 rounded overflow-hidden", style: { background: "hsl(var(--border) / 0.3)" }, children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-0 bottom-0 rounded border",
              style: {
                left: `${left}%`,
                width: `${width}%`,
                background: `repeating-linear-gradient(135deg, ${AB_TEST_COLORS[0].bg}, ${AB_TEST_COLORS[0].bg} 4px, ${AB_TEST_COLORS[1].bg} 4px, ${AB_TEST_COLORS[1].bg} 8px)`,
                borderColor: "hsl(var(--accent) / 0.45)"
              }
            }
          ) })
        ]
      },
      idx
    );
  }) });
  const lineColor = "hsl(var(--foreground) / 0.2)";
  const renderDesktop = () => /* @__PURE__ */ jsx("div", { className: "ds-claim-timeline-desktop", style: { "--tl-line": lineColor }, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_4fr] gap-x-4 items-center", children: [
    /* @__PURE__ */ jsx("div", {}),
    /* @__PURE__ */ jsx("div", { className: "relative h-6 text-xs text-muted-foreground", children: ticks.map((t, i) => /* @__PURE__ */ jsx(
      "span",
      {
        className: "absolute -translate-x-1/2 top-0 whitespace-nowrap",
        style: { left: `${t.left}%` },
        children: t.label
      },
      i
    )) }),
    /* @__PURE__ */ jsx("div", { children: timelineEntries.map((entry, idx) => {
      const isLast = idx === timelineEntries.length - 1;
      const rowBorder = isLast ? void 0 : "1px solid var(--tl-line)";
      return entry.kind === "normal" ? /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex items-center h-12 pr-2",
          style: { borderBottom: rowBorder },
          children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium truncate", children: entry.range.claim })
        },
        `left-${idx}`
      ) : /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-col justify-center gap-1 py-2 pr-2 border-l-2",
          style: {
            borderLeftColor: "hsl(var(--accent) / 0.5)",
            borderBottom: rowBorder,
            paddingLeft: 8,
            minHeight: entryMinHeight(entry)
          },
          children: [
            /* @__PURE__ */ jsx(Badge, { variant: "accent", tone: "subtle", size: "sm", children: "A/B Test" }),
            entry.variants.map((v, vi) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-block w-2.5 h-2.5 rounded-full flex-shrink-0",
                  style: {
                    "--dot-bg": AB_TEST_COLORS[vi % AB_TEST_COLORS.length].border,
                    background: "var(--dot-bg)"
                  }
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs truncate text-muted-foreground", children: v.displayClaim })
            ] }, v.key))
          ]
        },
        `left-${idx}`
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", children: ticks.map((t, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-0 bottom-0",
          style: {
            left: `${t.left}%`,
            width: 1,
            background: "var(--tl-line)"
          }
        },
        i
      )) }),
      /* @__PURE__ */ jsx("div", { children: timelineEntries.map((entry, idx) => {
        const isLast = idx === timelineEntries.length - 1;
        const rowBorder = isLast ? void 0 : "1px solid var(--tl-line)";
        return entry.kind === "normal" ? (() => {
          const r = entry.range;
          const left = percent(r.from);
          const rightPoint = r.to ? percent(r.to) : 100;
          const width = Math.max(1, rightPoint - left);
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex items-center h-12",
              style: { borderBottom: rowBorder },
              children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-8", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute top-1 bottom-1 rounded border",
                  style: {
                    left: `${left}%`,
                    width: `${width}%`,
                    ...barStyles(idx)
                  },
                  title: `${r.claim} \u2014 ${r.to ? `${fmtFull(new Date(r.from))} \u2013 ${fmtFull(new Date(r.to))}` : `seit ${fmtFull(new Date(r.from))}`}`
                }
              ) })
            },
            `right-${idx}`
          );
        })() : (() => {
          const left = percent(entry.from);
          const rightPoint = entry.to ? percent(entry.to) : 100;
          const width = Math.max(1, rightPoint - left);
          const variantLabels = entry.variants.map((v) => v.displayClaim).join(" / ");
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex items-center",
              style: { borderBottom: rowBorder, minHeight: entryMinHeight(entry) },
              children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-8", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute top-1 bottom-1 rounded border",
                  style: {
                    left: `${left}%`,
                    width: `${width}%`,
                    background: `repeating-linear-gradient(135deg, ${AB_TEST_COLORS[0].bg}, ${AB_TEST_COLORS[0].bg} 4px, ${AB_TEST_COLORS[1].bg} 4px, ${AB_TEST_COLORS[1].bg} 8px)`,
                    borderColor: "hsl(var(--accent) / 0.45)"
                  },
                  title: `A/B Test: ${variantLabels} \u2014 ${entry.to ? `${fmtFull(new Date(entry.from))} \u2013 ${fmtFull(new Date(entry.to))}` : `seit ${fmtFull(new Date(entry.from))}`}`
                }
              ) })
            },
            `right-${idx}`
          );
        })();
      }) })
    ] })
  ] }) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    renderMobile(),
    renderDesktop()
  ] });
}

export {
  ClaimTimeline
};
//# sourceMappingURL=chunk-4DK3PNPV.js.map