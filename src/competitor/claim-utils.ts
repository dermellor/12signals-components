// ---------------------------------------------------------------------------
// Claim Timeline – shared types & helpers
// ---------------------------------------------------------------------------

export type ClaimRange = {
  claim: string;
  from: string;
  to: string | null; // null => ongoing
};

export type NormalClaimEntry = { kind: "normal"; range: ClaimRange };
export type ABTestGroup = {
  kind: "abtest";
  ranges: ClaimRange[];
  variants: { key: string; displayClaim: string }[];
  from: string;
  to: string | null;
};
export type TimelineEntry = NormalClaimEntry | ABTestGroup;

export const AB_TEST_COLORS = [
  { bg: "hsl(var(--primary) / 0.22)", border: "hsl(var(--primary) / 0.45)" },
  { bg: "hsl(var(--accent) / 0.22)", border: "hsl(var(--accent) / 0.45)" },
  { bg: "hsl(var(--warning) / 0.22)", border: "hsl(var(--warning) / 0.45)" },
];

export const claimCompareKey = (txt: string) =>
  txt.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

const DAY_MS = 86_400_000;

/** Settle factor: threshold = factor × longest gap between flips. */
export const AB_TEST_SETTLE_FACTOR = 3;
/** Minimum stability (days) before a test can count as settled. */
export const AB_TEST_SETTLE_FLOOR_DAYS = 21;
/** Upper bound (days) for the settle threshold. */
export const AB_TEST_SETTLE_CAP_DAYS = 120;

/**
 * A test counts as settled when its current variant has been live longer
 * than AB_TEST_SETTLE_FACTOR × the longest gap between flips, plus a floor of
 * AB_TEST_SETTLE_FLOOR_DAYS, capped at AB_TEST_SETTLE_CAP_DAYS. Flip gaps are
 * measured from the first flip onward; the initial baseline range before the
 * test started is excluded. A settled group ends at the last flip and the
 * winning range continues as a normal claim.
 */
function isSettled(group: ClaimRange[], now: Date): boolean {
  const flipGaps: number[] = [];
  for (let k = 2; k < group.length; k++) {
    flipGaps.push(
      new Date(group[k].from).getTime() - new Date(group[k - 1].from).getTime()
    );
  }
  const longestGap = flipGaps.length ? Math.max(...flipGaps) : 0;
  const thresholdMs = Math.min(
    AB_TEST_SETTLE_FACTOR * longestGap +
      AB_TEST_SETTLE_FLOOR_DAYS * DAY_MS,
    AB_TEST_SETTLE_CAP_DAYS * DAY_MS
  );
  const last = group[group.length - 1];
  return now.getTime() - new Date(last.from).getTime() > thresholdMs;
}

/** Variant counts for a chain of at most two alternating claims. */
function countVariants(group: ClaimRange[]): {
  firstKey: string;
  secondKey: string;
  countA: number;
  countB: number;
} | null {
  const firstKey = claimCompareKey(group[0].claim);
  let secondKey: string | null = null;
  let countA = 0;
  let countB = 0;
  for (const r of group) {
    const key = claimCompareKey(r.claim);
    if (secondKey === null && key !== firstKey) secondKey = key;
    if (key === firstKey) countA++;
    else if (key === secondKey) countB++;
    else return null;
  }
  if (secondKey === null || countA < 2 || countB < 2) return null;
  return { firstKey, secondKey, countA, countB };
}

function variantsOf(
  group: ClaimRange[],
  firstKey: string,
  secondKey: string
): { key: string; displayClaim: string }[] {
  const variants: { key: string; displayClaim: string }[] = [
    { key: firstKey, displayClaim: group[0].claim },
  ];
  for (const r of group) {
    if (claimCompareKey(r.claim) === secondKey) {
      variants.push({ key: secondKey, displayClaim: r.claim });
      break;
    }
  }
  return variants;
}

/**
 * Detect A/B test patterns: exactly 2 claims flipping back and forth rapidly
 * (>=4 ranges, both claims appearing >=2 times). Single reverts or slowly
 * iterating through different claims are NOT flagged as A/B tests.
 */
export function detectABTestGroups(
  ranges: ClaimRange[],
  now: Date = new Date()
): TimelineEntry[] {
  const entries: TimelineEntry[] = [];
  let i = 0;

  while (i < ranges.length) {
    const firstKey = claimCompareKey(ranges[i].claim);
    let secondKey: string | null = null;
    let j = i + 1;

    while (j < ranges.length) {
      const key = claimCompareKey(ranges[j].claim);
      if (key === firstKey || key === secondKey) {
        j++;
        continue;
      }
      if (secondKey === null) {
        secondKey = key;
        j++;
        continue;
      }
      break;
    }

    if (secondKey !== null && j - i >= 4) {
      const chain = ranges.slice(i, j);
      let groupRanges = chain;
      let settledWinner: ClaimRange | null = null;
      const last = chain[chain.length - 1];
      if (last.to === null && isSettled(chain, now)) {
        groupRanges = chain.slice(0, -1);
        settledWinner = last;
      }
      const counts = countVariants(groupRanges);
      if (counts && groupRanges.length >= 4) {
        entries.push({
          kind: "abtest",
          ranges: groupRanges,
          variants: variantsOf(groupRanges, counts.firstKey, counts.secondKey),
          from: groupRanges[0].from,
          to: groupRanges[groupRanges.length - 1].to,
        });
        if (settledWinner) entries.push({ kind: "normal", range: settledWinner });
        i = j;
        continue;
      }
    }

    entries.push({ kind: "normal", range: ranges[i] });
    i++;
  }

  return entries;
}
