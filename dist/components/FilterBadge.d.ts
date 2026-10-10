import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type FilterBadgeProps = {
    label: React.ReactNode;
    active: boolean;
    removable?: boolean;
    onToggle: () => void;
    onEdit?: () => void;
    onRemove?: () => void;
    variant?: "default" | "add" | "subtle";
    size?: "sm" | "md";
    toggleAriaLabel?: string;
    editAriaLabel?: string;
    removeAriaLabel?: string;
    children?: React.ReactNode;
};
declare function FilterBadge({ label, active, removable, onToggle, onEdit, onRemove, variant, size, toggleAriaLabel, editAriaLabel, removeAriaLabel, children, }: FilterBadgeProps): react_jsx_runtime.JSX.Element;

export { FilterBadge };
