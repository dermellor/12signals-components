import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type TagProps = {
    children: React.ReactNode;
    onRemove?: () => void;
    removeAriaLabel?: string;
};
declare function Tag({ children, onRemove, removeAriaLabel }: TagProps): react_jsx_runtime.JSX.Element;
type TagListProps = {
    tags: string[];
    onRemove?: (tag: string, index: number) => void;
    emptyLabel?: React.ReactNode;
};
declare function TagList({ tags, onRemove, emptyLabel }: TagListProps): react_jsx_runtime.JSX.Element;
type TagFieldProps = {
    label: string;
    values: string[];
    onChange: (next: string[]) => void;
    description?: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    addOnBlur?: boolean;
    ariaLabel?: string;
};
declare function TagField({ label, values, onChange, description, error, placeholder, disabled, addOnBlur, ariaLabel, }: TagFieldProps): react_jsx_runtime.JSX.Element;

export { Tag, TagField, TagList };
