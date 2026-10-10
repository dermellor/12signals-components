import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type CardRootProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "gradient";
    hover?: "none" | "glow";
};
declare function CardRoot({ children, variant, hover, className, ...rest }: CardRootProps): react_jsx_runtime.JSX.Element;
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "compact";
};
declare function CardHeader({ children, className, variant, ...rest }: CardHeaderProps): react_jsx_runtime.JSX.Element;
declare function CardContent({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
type CardTitleProps<T extends keyof JSX.IntrinsicElements = "h3"> = {
    as?: T;
} & React.ComponentPropsWithoutRef<T>;
declare function CardTitle<T extends keyof JSX.IntrinsicElements = "h3">({ as, children, className, ...rest }: CardTitleProps<T>): react_jsx_runtime.JSX.Element;
declare const Card: typeof CardRoot & {
    Header: typeof CardHeader;
    Content: typeof CardContent;
    Title: typeof CardTitle;
};

export { Card };
