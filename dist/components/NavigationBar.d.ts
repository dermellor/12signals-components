import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type NavigationBarProps = {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    brand?: React.ReactNode;
    brandAccessory?: React.ReactNode;
    leading?: React.ReactNode;
    actions?: React.ReactNode;
    leadingPosition?: "left" | "right";
} & React.HTMLAttributes<HTMLElement>;
declare function NavigationBar({ title, subtitle, brand, brandAccessory, leading, actions, leadingPosition, className, ...rest }: NavigationBarProps): react_jsx_runtime.JSX.Element;

export { NavigationBar };
