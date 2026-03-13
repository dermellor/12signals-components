import React from "react";
import { Badge } from "../design-system/components/Badge";
import { Text } from "../design-system/components/Text";
import type { ClaimRange, TimelineEntry } from "./claim-utils";
import { AB_TEST_COLORS, detectABTestGroups } from "./claim-utils";

type Props = {
  claimRanges: ClaimRange[];
  loading?: boolean;
  error?: boolean;
  /** Locale for date formatting (default "de-DE") */
  locale?: string;
  /** Months between tick labels (default: auto based on range) */
  tickInterval?: number;
  /** Optional loading spinner element (e.g. lucide Loader2) */
  loadingIcon?: React.ReactNode;
};

export function ClaimTimeline({
  claimRanges,
  loading = false,
  error = false,
  locale = "de-DE",
  tickInterval,
  loadingIcon,
}: Props) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        {loadingIcon} Lade Positionierung…
      </div>
    );
  }

  if (error) {
    return (
      <Text size="sm" className="text-destructive">
        Konnte Positionierung nicht laden.
      </Text>
    );
  }

  if (claimRanges.length === 0) {
    return (
      <Text size="sm" tone="muted">
        Keine Claims gefunden.
      </Text>
    );
  }

  const ranges = [...claimRanges].sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
  );

  const start = new Date(
    ranges.reduce(
      (min, r) => Math.min(min, new Date(r.from).getTime()),
      Infinity,
    ),
  );
  const end = new Date(
    ranges.reduce(
      (max, r) =>
        Math.max(max, new Date(r.to ?? new Date().toISOString()).getTime()),
      -Infinity,
    ),
  );
  const totalMs = Math.max(1, end.getTime() - start.getTime());
  const totalMonths = Math.round(totalMs / (30.44 * 86400000));

  const fmtShort = (d: Date) =>
    d.toLocaleDateString(locale, { month: "short", year: "2-digit" });

  const fmtFull = (d: Date) => d.toLocaleDateString(locale);

  const percent = (dateStr: string) => {
    const ms = new Date(dateStr).getTime() - start.getTime();
    return Math.max(0, Math.min(100, (ms / totalMs) * 100));
  };
  const percentDate = (d: Date) => {
    const ms = d.getTime() - start.getTime();
    return Math.max(0, Math.min(100, (ms / totalMs) * 100));
  };

  // Auto-calculate tick interval: aim for ~4-6 visible ticks
  const interval = tickInterval ?? (totalMonths <= 6 ? 1 : totalMonths <= 12 ? 3 : totalMonths <= 24 ? 6 : 12);

  const ticks = (() => {
    const out: { left: number; label: string }[] = [];
    const startMonth = Math.ceil(start.getMonth() / interval) * interval;
    let d = new Date(start.getFullYear(), startMonth, 1);
    // Skip first tick if it's too close to the data start (< 5% of range)
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

  const barStyles = (idx: number) => {
    const isPrimary = idx % 2 === 0;
    return {
      background: isPrimary
        ? "hsl(var(--tl-bar-1) / 0.18)"
        : "hsl(var(--tl-bar-2) / 0.18)",
      borderColor: isPrimary
        ? "hsl(var(--tl-bar-1) / 0.35)"
        : "hsl(var(--tl-bar-2) / 0.35)",
    } as React.CSSProperties;
  };

  const timelineEntries = detectABTestGroups(ranges);

  const entryMinHeight = (entry: TimelineEntry) =>
    entry.kind === "abtest"
      ? Math.max(48, 28 + entry.variants.length * 24)
      : 48;

  // ── Mobile: stacked cards ──────────────────────────────────────────────
  const renderMobile = () => (
    <div className="ds-claim-timeline-mobile flex flex-col gap-3">
      {timelineEntries.map((entry, idx) => {
        if (entry.kind === "normal") {
          const r = entry.range;
          const left = percent(r.from);
          const rightPt = r.to ? percent(r.to) : 100;
          const width = Math.max(2, rightPt - left);
          return (
            <div key={idx} className="border-b border-border/40 pb-3 last:border-b-0 last:pb-0">
              <div className="text-sm font-medium mb-1">{r.claim}</div>
              <div className="text-xs text-muted-foreground mb-2">
                {fmtShort(new Date(r.from))}
                {" – "}
                {r.to ? fmtShort(new Date(r.to)) : "today"}
              </div>
              <div className="relative h-5 rounded overflow-hidden" style={{ background: "hsl(var(--border) / 0.3)" }}>
                <div
                  className="absolute top-0 bottom-0 rounded border"
                  style={{ left: `${left}%`, width: `${width}%`, ...barStyles(idx) }}
                />
              </div>
            </div>
          );
        }
        // A/B test
        const left = percent(entry.from);
        const rightPt = entry.to ? percent(entry.to) : 100;
        const width = Math.max(2, rightPt - left);
        return (
          <div
            key={idx}
            className="border-b border-border/40 pb-3 last:border-b-0 last:pb-0 border-l-2 pl-2"
            style={{ borderLeftColor: "hsl(var(--accent) / 0.5)" }}
          >
            <Badge variant="accent" tone="subtle" size="sm">A/B Test</Badge>
            {entry.variants.map((v, vi) => (
              <div key={v.key} className="flex items-center gap-1.5 mt-1">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: AB_TEST_COLORS[vi % AB_TEST_COLORS.length].border }}
                />
                <span className="text-xs text-muted-foreground">{v.displayClaim}</span>
              </div>
            ))}
            <div className="text-xs text-muted-foreground mt-1 mb-2">
              {fmtShort(new Date(entry.from))}
              {" – "}
              {entry.to ? fmtShort(new Date(entry.to)) : "today"}
            </div>
            <div className="relative h-5 rounded overflow-hidden" style={{ background: "hsl(var(--border) / 0.3)" }}>
              <div
                className="absolute top-0 bottom-0 rounded border"
                style={{
                  left: `${left}%`, width: `${width}%`,
                  background: `repeating-linear-gradient(135deg, ${AB_TEST_COLORS[0].bg}, ${AB_TEST_COLORS[0].bg} 4px, ${AB_TEST_COLORS[1].bg} 4px, ${AB_TEST_COLORS[1].bg} 8px)`,
                  borderColor: "hsl(var(--accent) / 0.45)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  // ── Desktop: side-by-side grid ─────────────────────────────────────────
  const lineColor = "hsl(var(--foreground) / 0.2)";

  const renderDesktop = () => (
    <div className="ds-claim-timeline-desktop" style={{ "--tl-line": lineColor } as React.CSSProperties}>
      <div className="grid grid-cols-[1fr_4fr] gap-x-4 items-center">
        {/* Top axis */}
        <div />
        <div className="relative h-6 text-xs text-muted-foreground">
          {ticks.map((t, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 top-0 whitespace-nowrap"
              style={{ left: `${t.left}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* Left: claim labels */}
        <div>
          {timelineEntries.map((entry, idx) => {
            const isLast = idx === timelineEntries.length - 1;
            const rowBorder = isLast ? undefined : "1px solid var(--tl-line)";
            return entry.kind === "normal" ? (
              <div
                key={`left-${idx}`}
                className="flex items-center h-12 pr-2" style={{ borderBottom: rowBorder }}
              >
                <div className="text-sm font-medium truncate">
                  {entry.range.claim}
                </div>
              </div>
            ) : (
              <div
                key={`left-${idx}`}
                className="flex flex-col justify-center gap-1 py-2 pr-2 border-l-2"
                style={{
                  borderLeftColor: "hsl(var(--accent) / 0.5)",
                  borderBottom: rowBorder,
                  paddingLeft: 8,
                  minHeight: entryMinHeight(entry),
                }}
              >
                <Badge variant="accent" tone="subtle" size="sm">
                  A/B Test
                </Badge>
                {entry.variants.map((v, vi) => (
                  <div key={v.key} className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={
                        {
                          "--dot-bg":
                            AB_TEST_COLORS[vi % AB_TEST_COLORS.length].border,
                          background: "var(--dot-bg)",
                        } as React.CSSProperties
                      }
                    />
                    <span className="text-xs truncate text-muted-foreground">
                      {v.displayClaim}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Right: bars */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none">
            {ticks.map((t, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${t.left}%`,
                  width: 1,
                  background: "var(--tl-line)",
                }}
              />
            ))}
          </div>
          <div>
            {timelineEntries.map((entry, idx) => {
              const isLast = idx === timelineEntries.length - 1;
              const rowBorder = isLast ? undefined : "1px solid var(--tl-line)";
              return entry.kind === "normal"
                ? (() => {
                    const r = entry.range;
                    const left = percent(r.from);
                    const rightPoint = r.to ? percent(r.to) : 100;
                    const width = Math.max(1, rightPoint - left);
                    return (
                      <div
                        key={`right-${idx}`}
                        className="flex items-center h-12"
                        style={{ borderBottom: rowBorder }}
                      >
                        <div className="relative w-full h-8">
                          <div
                            className="absolute top-1 bottom-1 rounded border"
                            style={{
                              left: `${left}%`,
                              width: `${width}%`,
                              ...barStyles(idx),
                            }}
                            title={`${r.claim} — ${r.to ? `${fmtFull(new Date(r.from))} – ${fmtFull(new Date(r.to))}` : `seit ${fmtFull(new Date(r.from))}`}`}
                          />
                        </div>
                      </div>
                    );
                  })()
                : (() => {
                    const left = percent(entry.from);
                    const rightPoint = entry.to ? percent(entry.to) : 100;
                    const width = Math.max(1, rightPoint - left);
                    const variantLabels = entry.variants
                      .map((v) => v.displayClaim)
                      .join(" / ");
                    return (
                      <div
                        key={`right-${idx}`}
                        className="flex items-center"
                        style={{ borderBottom: rowBorder, minHeight: entryMinHeight(entry) }}
                      >
                        <div className="relative w-full h-8">
                          <div
                            className="absolute top-1 bottom-1 rounded border"
                            style={{
                              left: `${left}%`,
                              width: `${width}%`,
                              background: `repeating-linear-gradient(135deg, ${AB_TEST_COLORS[0].bg}, ${AB_TEST_COLORS[0].bg} 4px, ${AB_TEST_COLORS[1].bg} 4px, ${AB_TEST_COLORS[1].bg} 8px)`,
                              borderColor: "hsl(var(--accent) / 0.45)",
                            }}
                            title={`A/B Test: ${variantLabels} — ${entry.to ? `${fmtFull(new Date(entry.from))} – ${fmtFull(new Date(entry.to))}` : `seit ${fmtFull(new Date(entry.from))}`}`}
                          />
                        </div>
                      </div>
                    );
                  })();
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // Render both layouts, toggle via CSS media query (no client JS)
  return (
    <>
      {renderMobile()}
      {renderDesktop()}
    </>
  );
}
