export const tokens = {
  color: {
    primary: { bg: "var(--color-primary-bg)", fg: "var(--color-primary-fg)" },
    neutral: { bg: "var(--color-neutral-bg)", fg: "var(--color-neutral-fg)" },
    danger:  { bg: "var(--color-danger-bg)",  fg: "var(--color-danger-fg)" },
    success: { bg: "var(--color-success-bg)", fg: "var(--color-success-fg)" },
    warning: { bg: "var(--color-warning-bg)", fg: "var(--color-warning-fg)" },
    accent:  { bg: "var(--color-accent-bg)",  fg: "var(--color-accent-fg)" },
    secondary: { bg: "var(--color-secondary-bg)", fg: "var(--color-secondary-fg)" },
    border:  { default: "var(--color-border-default)" }
  },
  space:{ xs:"var(--space-xs)", sm:"var(--space-sm)", md:"var(--space-md)", lg:"var(--space-lg)", xl:"var(--space-xl)" },
  radius:{ sm:"var(--radius-sm)", md:"var(--radius-md)", lg:"var(--radius-lg)", pill:"var(--radius-pill)" },
  font:{ base:"var(--font-base)" },
  shadow:{ sm:"var(--shadow-sm)", md:"var(--shadow-md)" }
} as const;
