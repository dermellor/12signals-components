import * as React from "react";

type TextProps<T extends keyof JSX.IntrinsicElements = 'p'> = {
  as?: T;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  weight?: "regular" | "medium" | "semibold" | "bold";
  tone?: "default" | "muted";
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'>;

export function Text<T extends keyof JSX.IntrinsicElements = 'p'>({
  as,
  size = 'sm',
  weight = 'regular',
  tone = 'default',
  children,
  className,
  ...rest
}: TextProps<T>) {
  const Comp = (as || 'p') as React.ElementType;
  const mergedClassName = ["ds-Text", className].filter(Boolean).join(" ");
  return (
    <Comp
      data-size={size}
      data-weight={weight}
      data-tone={tone}
      className={mergedClassName}
      {...rest}
    >
      {children}
    </Comp>
  );
}
