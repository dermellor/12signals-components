import * as React from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  level?: HeadingLevel;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function Heading({ level = 2, className, children, ...rest }: HeadingProps) {
  const Comp = `h${level}` as keyof JSX.IntrinsicElements;
  const cn = ["ds-Heading", className].filter(Boolean).join(" ");
  return (
    <Comp className={cn} data-level={level} {...rest}>
      {children}
    </Comp>
  );
}
