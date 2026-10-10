import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
    round?: boolean;
};
declare function Skeleton({ round, style, ...rest }: SkeletonProps): react_jsx_runtime.JSX.Element;

export { Skeleton };
