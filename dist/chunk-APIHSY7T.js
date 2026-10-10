// src/competitor/claim-utils.ts
var AB_TEST_COLORS = [
  { bg: "hsl(var(--primary) / 0.22)", border: "hsl(var(--primary) / 0.45)" },
  { bg: "hsl(var(--accent) / 0.22)", border: "hsl(var(--accent) / 0.45)" },
  { bg: "hsl(var(--warning) / 0.22)", border: "hsl(var(--warning) / 0.45)" }
];
var claimCompareKey = (txt) => txt.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
function detectABTestGroups(ranges) {
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
        const variants = [
          { key: firstKey, displayClaim: ranges[i].claim }
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
          to: groupRanges[groupRanges.length - 1].to
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

export {
  AB_TEST_COLORS,
  claimCompareKey,
  detectABTestGroups
};
//# sourceMappingURL=chunk-APIHSY7T.js.map