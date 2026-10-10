declare const tokens: {
    readonly color: {
        readonly primary: {
            readonly bg: "var(--color-primary-bg)";
            readonly fg: "var(--color-primary-fg)";
        };
        readonly neutral: {
            readonly bg: "var(--color-neutral-bg)";
            readonly fg: "var(--color-neutral-fg)";
        };
        readonly danger: {
            readonly bg: "var(--color-danger-bg)";
            readonly fg: "var(--color-danger-fg)";
        };
        readonly success: {
            readonly bg: "var(--color-success-bg)";
            readonly fg: "var(--color-success-fg)";
        };
        readonly warning: {
            readonly bg: "var(--color-warning-bg)";
            readonly fg: "var(--color-warning-fg)";
        };
        readonly accent: {
            readonly bg: "var(--color-accent-bg)";
            readonly fg: "var(--color-accent-fg)";
        };
        readonly secondary: {
            readonly bg: "var(--color-secondary-bg)";
            readonly fg: "var(--color-secondary-fg)";
        };
        readonly border: {
            readonly default: "var(--color-border-default)";
        };
    };
    readonly space: {
        readonly xs: "var(--space-xs)";
        readonly sm: "var(--space-sm)";
        readonly md: "var(--space-md)";
        readonly lg: "var(--space-lg)";
        readonly xl: "var(--space-xl)";
    };
    readonly radius: {
        readonly sm: "var(--radius-sm)";
        readonly md: "var(--radius-md)";
        readonly lg: "var(--radius-lg)";
        readonly pill: "var(--radius-pill)";
    };
    readonly font: {
        readonly base: "var(--font-base)";
    };
    readonly shadow: {
        readonly sm: "var(--shadow-sm)";
        readonly md: "var(--shadow-md)";
    };
};

export { tokens };
