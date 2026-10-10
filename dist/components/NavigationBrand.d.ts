import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type NavigationBrandProps = {
    href?: string;
    logo?: React.ReactNode;
    label?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;
declare function NavigationBrand({ href, logo, label, className, ...rest }: NavigationBrandProps): react_jsx_runtime.JSX.Element;

export { NavigationBrand };
