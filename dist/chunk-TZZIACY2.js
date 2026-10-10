// src/competitor/claim-utils.ts
var AB_TEST_COLORS = [
  { bg: "hsl(var(--primary) / 0.22)", border: "hsl(var(--primary) / 0.45)" },
  { bg: "hsl(var(--accent) / 0.22)", border: "hsl(var(--accent) / 0.45)" },
  { bg: "hsl(var(--warning) / 0.22)", border: "hsl(var(--warning) / 0.45)" }
];
var claimCompareKey = (txt) => txt.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
var DAY_MS = 864e5;
var AB_TEST_SETTLE_FACTOR = 3;
var AB_TEST_SETTLE_FLOOR_DAYS = 21;
var AB_TEST_SETTLE_CAP_DAYS = 120;
function isSettled(group, now) {
  const flipGaps = [];
  for (let k = 2; k < group.length; k++) {
    flipGaps.push(
      new Date(group[k].from).getTime() - new Date(group[k - 1].from).getTime()
    );
  }
  const longestGap = flipGaps.length ? Math.max(...flipGaps) : 0;
  const thresholdMs = Math.min(
    AB_TEST_SETTLE_FACTOR * longestGap + AB_TEST_SETTLE_FLOOR_DAYS * DAY_MS,
    AB_TEST_SETTLE_CAP_DAYS * DAY_MS
  );
  const last = group[group.length - 1];
  return now.getTime() - new Date(last.from).getTime() > thresholdMs;
}
function countVariants(group) {
  const firstKey = claimCompareKey(group[0].claim);
  let secondKey = null;
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
function variantsOf(group, firstKey, secondKey) {
  const variants = [
    { key: firstKey, displayClaim: group[0].claim }
  ];
  for (const r of group) {
    if (claimCompareKey(r.claim) === secondKey) {
      variants.push({ key: secondKey, displayClaim: r.claim });
      break;
    }
  }
  return variants;
}
function detectABTestGroups(ranges, now = /* @__PURE__ */ new Date()) {
  const entries = [];
  let i = 0;
  while (i < ranges.length) {
    const firstKey = claimCompareKey(ranges[i].claim);
    let secondKey = null;
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
      let settledWinner = null;
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
          to: groupRanges[groupRanges.length - 1].to
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

export {
  AB_TEST_COLORS,
  claimCompareKey,
  AB_TEST_SETTLE_FACTOR,
  AB_TEST_SETTLE_FLOOR_DAYS,
  AB_TEST_SETTLE_CAP_DAYS,
  detectABTestGroups
};
//# sourceMappingURL=chunk-TZZIACY2.js.map