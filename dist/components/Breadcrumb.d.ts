import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type BreadcrumbItem = {
    label: string;
    href?: string;
};
type BreadcrumbProps = {
    items: BreadcrumbItem[];
    renderLink?: (href: string, children: React.ReactNode) => React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};
declare function Breadcrumb({ items, renderLink, className, style }: BreadcrumbProps): react_jsx_runtime.JSX.Element;

export { Breadcrumb, type BreadcrumbItem };
