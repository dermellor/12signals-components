import * as React from "react";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  round?: boolean;
};

export function Skeleton({ round, style, ...rest }: SkeletonProps) {
  return <div className="ds-Skeleton" style={{ borderRadius: round ? "var(--radius-pill)" : undefined, ...style }} {...rest} />;
}

