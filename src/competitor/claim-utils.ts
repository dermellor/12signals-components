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

/**
 * Detect A/B test patterns: exactly 2 claims flipping back and forth rapidly
 * (>=4 ranges, both claims appearing >=2 times). Single reverts or slowly
 * iterating through different claims are NOT flagged as A/B tests.
 */
export function detectABTestGroups(ranges: ClaimRange[]): TimelineEntry[] {
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

    const groupLen = j - i;

    if (secondKey !== null && groupLen >= 4) {
      let countA = 0;
      let countB = 0;
      for (let k = i; k < j; k++) {
        const key = claimCompareKey(ranges[k].claim);
        if (key === firstKey) countA++;
        else countB++;
      }

      if (countA >= 2 && countB >= 2) {
        const groupRanges = ranges.slice(i, j);
        const variants: { key: string; displayClaim: string }[] = [
          { key: firstKey, displayClaim: ranges[i].claim },
        ];
        for (const r of groupRanges) {
          if (claimCompareKey(r.claim) === secondKey) {
            variants.push({ key: secondKey, displayClaim: r.claim });
            break;
          }
        }

        entries.push({
          kind: "abtest",
          ranges: groupRanges,
          variants,
          from: groupRanges[0].from,
          to: groupRanges[groupRanges.length - 1].to,
        });
        i = j;
        continue;
      }
    }

    entries.push({ kind: "normal", range: ranges[i] });
    i++;
  }

  return entries;
}
