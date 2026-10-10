import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type TabNavItem = {
    value: string;
    label: string;
    description?: string;
    badge?: React.ReactNode;
};
type TabNavProps = {
    items: TabNavItem[];
    value: string;
    onValueChange?: (value: string) => void;
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
};
declare function TabNav({ items, value, onValueChange, ariaLabel, className, style }: TabNavProps): react_jsx_runtime.JSX.Element;

export { TabNav, type TabNavItem };
