import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

type TextFieldProps = {
    label: string;
    description?: string;
    error?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
declare function TextField({ label, description, error, inputProps, ...rest }: TextFieldProps): react_jsx_runtime.JSX.Element;

export { TextField };
