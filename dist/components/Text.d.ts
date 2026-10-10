import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type TextProps<T extends keyof JSX.IntrinsicElements = 'p'> = {
    as?: T;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    weight?: "regular" | "medium" | "semibold" | "bold";
    tone?: "default" | "muted";
    children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'>;
declare function Text<T extends keyof JSX.IntrinsicElements = 'p'>({ as, size, weight, tone, children, className, ...rest }: TextProps<T>): react_jsx_runtime.JSX.Element;

export { Text };
