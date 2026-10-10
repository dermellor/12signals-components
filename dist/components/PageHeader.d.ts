import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type PageHeaderProps = {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    actions?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
declare function PageHeader({ title, subtitle, actions, ...rest }: PageHeaderProps): react_jsx_runtime.JSX.Element;

export { PageHeader };
