import * as React from 'react';

declare const DateTimeInput: React.ForwardRefExoticComponent<{
    size?: "sm" | "md" | "lg";
    invalid?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & React.RefAttributes<HTMLInputElement>>;

export { DateTimeInput };
