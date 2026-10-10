import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type TooltipProps = {
    content: React.ReactNode;
    children: React.ReactElement;
    className?: string;
    style?: React.CSSProperties;
    multiline?: boolean;
};
declare function Tooltip({ content, children, className, style, multiline }: TooltipProps): react_jsx_runtime.JSX.Element;

export { Tooltip };
