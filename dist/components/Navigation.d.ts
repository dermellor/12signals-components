import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type NavigationItem = {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    href?: string;
    disabled?: boolean;
    onSelect?: (value: string) => void;
};
type NavigationProps = {
    items: NavigationItem[];
    value?: string;
    onValueChange?: (value: string) => void;
    ariaLabel?: string;
    orientation?: "vertical" | "horizontal";
    className?: string;
    style?: React.CSSProperties;
};
declare function Navigation({ items, value, onValueChange, ariaLabel, orientation, className, style, }: NavigationProps): react_jsx_runtime.JSX.Element;

export { Navigation, type NavigationItem };
