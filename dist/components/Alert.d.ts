import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type AlertProps = {
    variant?: "info" | "success" | "warning" | "danger";
    title?: React.ReactNode;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
declare function Alert({ variant, title, children, ...rest }: AlertProps): react_jsx_runtime.JSX.Element;

export { Alert };
