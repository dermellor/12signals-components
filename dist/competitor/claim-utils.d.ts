type ClaimRange = {
    claim: string;
    from: string;
    to: string | null;
};
type NormalClaimEntry = {
    kind: "normal";
    range: ClaimRange;
};
type ABTestGroup = {
    kind: "abtest";
    ranges: ClaimRange[];
    variants: {
        key: string;
        displayClaim: string;
    }[];
    from: string;
    to: string | null;
};
type TimelineEntry = NormalClaimEntry | ABTestGroup;
declare const AB_TEST_COLORS: {
    bg: string;
    border: string;
}[];
declare const claimCompareKey: (txt: string) => string;
/** Settle factor: threshold = factor × longest gap between flips. */
declare const AB_TEST_SETTLE_FACTOR = 3;
/** Minimum stability (days) before a test can count as settled. */
declare const AB_TEST_SETTLE_FLOOR_DAYS = 21;
/** Upper bound (days) for the settle threshold. */
declare const AB_TEST_SETTLE_CAP_DAYS = 120;
/**
 * Detect A/B test patterns: exactly 2 claims flipping back and forth rapidly
 * (>=4 ranges, both claims appearing >=2 times). Single reverts or slowly
 * iterating through different claims are NOT flagged as A/B tests.
 */
declare function detectABTestGroups(ranges: ClaimRange[], now?: Date): TimelineEntry[];

export { type ABTestGroup, AB_TEST_COLORS, AB_TEST_SETTLE_CAP_DAYS, AB_TEST_SETTLE_FACTOR, AB_TEST_SETTLE_FLOOR_DAYS, type ClaimRange, type NormalClaimEntry, type TimelineEntry, claimCompareKey, detectABTestGroups };
