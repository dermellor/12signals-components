import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingProps = {
    level?: HeadingLevel;
} & React.HTMLAttributes<HTMLHeadingElement>;
declare function Heading({ level, className, children, ...rest }: HeadingProps): react_jsx_runtime.JSX.Element;

export { Heading };
