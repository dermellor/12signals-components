import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type RichTextProps = React.HTMLAttributes<HTMLDivElement> & {
    as?: keyof JSX.IntrinsicElements;
    children?: React.ReactNode;
};
declare function RichText({ as, children, ...rest }: RichTextProps): react_jsx_runtime.JSX.Element;

export { RichText };
