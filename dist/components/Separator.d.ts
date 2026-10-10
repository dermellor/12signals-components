import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type SeparatorProps = {
    orientation?: "horizontal" | "vertical";
} & React.HTMLAttributes<HTMLDivElement>;
declare function Separator({ orientation, ...rest }: SeparatorProps): react_jsx_runtime.JSX.Element;

export { Separator };
