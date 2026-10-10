import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type BadgeProps<T extends keyof JSX.IntrinsicElements = "span"> = {
    as?: T;
    variant?: "solid" | "outline" | "success" | "warning" | "danger" | "accent" | "secondary" | "homepage" | "advertising" | "advertising-outline";
    tone?: "solid" | "subtle";
    size?: "sm" | "md";
} & React.ComponentPropsWithoutRef<T>;
declare function Badge<T extends keyof JSX.IntrinsicElements = "span">({ as, variant, tone, size, children, ...rest }: BadgeProps<T>): react_jsx_runtime.JSX.Element;

export { Badge };
