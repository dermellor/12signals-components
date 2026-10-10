import * as React from 'react';

declare const Input: React.ForwardRefExoticComponent<{
    size?: "sm" | "md" | "lg";
    invalid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;

export { Input };
