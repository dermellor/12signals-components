import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type SelectMenuOption = {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
};
type SelectMenuProps = {
    options: SelectMenuOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    ariaLabel?: string;
    align?: "left" | "right";
    label?: React.ReactNode;
    className?: string;
};
declare function SelectMenu({ options, value, onValueChange, ariaLabel, align, label, className, }: SelectMenuProps): react_jsx_runtime.JSX.Element;

export { SelectMenu, type SelectMenuOption };
