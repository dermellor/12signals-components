import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

declare const Select: React.ForwardRefExoticComponent<{
    size?: "sm" | "md" | "lg";
    variant?: "default" | "plain";
    children?: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement> & React.RefAttributes<HTMLSelectElement>>;
declare const SelectOption: (props: React.OptionHTMLAttributes<HTMLOptionElement> & {
    children?: React.ReactNode;
}) => react_jsx_runtime.JSX.Element;

export { Select, SelectOption };
